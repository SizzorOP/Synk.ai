import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  chatMessageSeed,
  chatThreadSeed,
  type ChatMessageKind,
  type ChatMessageRecord,
  type ChatThreadRecord,
  type ChatThreadType,
} from "../../data/chat.data";
import { devPersonaSeed } from "../../data/auth.data";
import type { AuthUser } from "../auth/auth.types";
import { DatabaseService } from "../database/database.service";

type CreateThreadInput = {
  type: "DIRECT" | "SUPPORT";
  participantIds: string[];
  title?: string;
};

type CreateWorkflowThreadInput = {
  type: "JOB_ROOM" | "CONTRACT_ROOM";
  participantIds: string[];
  title: string;
  createdByUserId: string;
  jobId?: string;
  contractId?: string;
  initialSystemMessage?: string;
};

type CreateMessageInput = {
  body: string;
  messageKind?: ChatMessageKind;
  replyToMessageId?: string;
};

type ThreadRow = {
  id: string;
  type: ChatThreadType;
  title: string;
  participantIds: string[];
  participantNames: string[];
  lastMessagePreview: string;
  lastMessageAt: string | null;
  jobId: string | null;
  contractId: string | null;
};

type MessageRow = {
  id: string;
  threadId: string;
  senderUserId: string | null;
  senderName: string;
  messageKind: ChatMessageKind;
  body: string;
  createdAt: string;
  replyToMessageId: string | null;
};

@Injectable()
export class ChatService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getThreadsForUser(currentUser: AuthUser) {
    try {
      const rows = await this.databaseService.query<ThreadRow>(
        `
          SELECT
            ct.id::text AS id,
            ct.thread_type::text AS type,
            COALESCE(
              ct.metadata ->> 'title',
              CASE
                WHEN ct.thread_type = 'JOB_ROOM' THEN 'Job room'
                WHEN ct.thread_type = 'CONTRACT_ROOM' THEN 'Contract room'
                WHEN ct.thread_type = 'SUPPORT' THEN 'Support room'
                ELSE 'Direct thread'
              END
            ) AS title,
            COALESCE(
              ARRAY_AGG(DISTINCT cp_all.user_id::text ORDER BY cp_all.user_id::text),
              ARRAY[]::text[]
            ) AS "participantIds",
            COALESCE(
              ARRAY_AGG(DISTINCT u_all.display_name ORDER BY u_all.display_name),
              ARRAY[]::text[]
            ) AS "participantNames",
            COALESCE(
              (
                SELECT cm.body
                FROM marketplace.chat_messages cm
                WHERE cm.thread_id = ct.id
                  AND cm.deleted_at IS NULL
                ORDER BY cm.created_at DESC
                LIMIT 1
              ),
              'No messages yet.'
            ) AS "lastMessagePreview",
            ct.last_message_at::text AS "lastMessageAt",
            ct.job_id::text AS "jobId",
            ct.contract_id::text AS "contractId"
          FROM marketplace.chat_threads ct
          JOIN marketplace.chat_participants cp_self
            ON cp_self.thread_id = ct.id
          LEFT JOIN marketplace.chat_participants cp_all
            ON cp_all.thread_id = ct.id
          LEFT JOIN marketplace.users u_all
            ON u_all.id = cp_all.user_id
          WHERE cp_self.user_id = $1::uuid
          GROUP BY ct.id
          ORDER BY ct.last_message_at DESC NULLS LAST, ct.created_at DESC
        `,
        [currentUser.id],
      );

      if (rows.length > 0) {
        return rows.map((row) => this.normalizeThreadRow(row));
      }
    } catch {
      // Fall back to in-memory seed data.
    }

    return this.getFallbackThreadsForUser(currentUser.id);
  }

  async getMessagesForThread(threadId: string, currentUser: AuthUser) {
    await this.assertThreadAccess(threadId, currentUser.id);

    try {
      const rows = await this.databaseService.query<MessageRow>(
        `
          SELECT
            cm.id::text AS id,
            cm.thread_id::text AS "threadId",
            cm.sender_user_id::text AS "senderUserId",
            COALESCE(u.display_name, 'System') AS "senderName",
            cm.message_kind::text AS "messageKind",
            COALESCE(cm.body, '') AS body,
            cm.created_at::text AS "createdAt",
            cm.reply_to_message_id::text AS "replyToMessageId"
          FROM marketplace.chat_messages cm
          LEFT JOIN marketplace.users u
            ON u.id = cm.sender_user_id
          WHERE cm.thread_id = $1::uuid
            AND cm.deleted_at IS NULL
          ORDER BY cm.created_at ASC
        `,
        [threadId],
      );

      return rows.map((row) => this.normalizeMessageRow(row));
    } catch {
      return chatMessageSeed
        .filter((message) => message.threadId === threadId)
        .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    }
  }

  async createThread(input: CreateThreadInput, currentUser: AuthUser) {
    const participantIds = [...new Set([currentUser.id, ...input.participantIds])];
    if (participantIds.length < 2) {
      throw new BadRequestException("A thread needs at least two participants.");
    }

    const participantNames = await this.resolveParticipantNames(participantIds);
    const threadId = randomUUID();
    const title = input.title?.trim() || this.defaultTitle(input.type, participantNames);
    const createdAt = new Date().toISOString();

    try {
      await this.databaseService.query(
        `
          INSERT INTO marketplace.chat_threads (
            id,
            thread_type,
            created_by_user_id,
            metadata
          )
          VALUES ($1::uuid, $2::chat_thread_type, $3::uuid, $4::jsonb)
        `,
        [threadId, input.type, currentUser.id, JSON.stringify({ title })],
      );

      for (const participantId of participantIds) {
        await this.databaseService.query(
          `
            INSERT INTO marketplace.chat_participants (thread_id, user_id)
            VALUES ($1::uuid, $2::uuid)
            ON CONFLICT (thread_id, user_id) DO NOTHING
          `,
          [threadId, participantId],
        );
      }

      const created = (await this.getThreadsForUser(currentUser)).find(
        (thread) => thread.id === threadId,
      );
      if (created) {
        return created;
      }
    } catch {
      // Fall back to in-memory seed data.
    }

    const fallbackThread: ChatThreadRecord = {
      id: threadId,
      type: input.type,
      title,
      participantIds,
      participantNames,
      lastMessagePreview: "Conversation created.",
      lastMessageAt: createdAt,
      jobId: null,
      contractId: null,
    };
    chatThreadSeed.unshift(fallbackThread);
    return fallbackThread;
  }

  async createWorkflowThread(input: CreateWorkflowThreadInput) {
    const participantIds = [...new Set([input.createdByUserId, ...input.participantIds])];
    if (participantIds.length < 2) {
      throw new BadRequestException("A workflow thread needs at least two participants.");
    }

    const participantNames = await this.resolveParticipantNames(participantIds);
    const threadId = randomUUID();
    const createdAt = new Date().toISOString();
    const lastMessagePreview = input.initialSystemMessage?.trim() || "Conversation created.";

    try {
      await this.databaseService.withTransaction(async (client) => {
        await client.query(
          `
            INSERT INTO marketplace.chat_threads (
              id,
              thread_type,
              job_id,
              contract_id,
              created_by_user_id,
              last_message_at,
              metadata
            )
            VALUES (
              $1::uuid,
              $2::chat_thread_type,
              $3::uuid,
              $4::uuid,
              $5::uuid,
              $6::timestamptz,
              $7::jsonb
            )
          `,
          [
            threadId,
            input.type,
            input.jobId ?? null,
            input.contractId ?? null,
            input.createdByUserId,
            input.initialSystemMessage ? createdAt : null,
            JSON.stringify({ title: input.title }),
          ],
        );

        for (const participantId of participantIds) {
          await client.query(
            `
              INSERT INTO marketplace.chat_participants (thread_id, user_id)
              VALUES ($1::uuid, $2::uuid)
              ON CONFLICT (thread_id, user_id) DO NOTHING
            `,
            [threadId, participantId],
          );
        }

        if (input.initialSystemMessage) {
          await client.query(
            `
              INSERT INTO marketplace.chat_messages (
                id,
                thread_id,
                sender_user_id,
                message_kind,
                body,
                metadata
              )
              VALUES ($1::uuid, $2::uuid, NULL, 'SYSTEM', $3, $4::jsonb)
            `,
            [
              randomUUID(),
              threadId,
              input.initialSystemMessage.trim(),
              JSON.stringify({ source: "workflow-bootstrap" }),
            ],
          );
        }
      });

      const created = (await this.getThreadsForUser({
        id: input.createdByUserId,
        email: "",
        displayName: "",
        roles: [],
      })).find((thread) => thread.id === threadId);

      if (created) {
        return created;
      }
    } catch {
      // Fall back to in-memory seed data below.
    }

    const fallbackThread: ChatThreadRecord = {
      id: threadId,
      type: input.type,
      title: input.title,
      participantIds,
      participantNames,
      lastMessagePreview,
      lastMessageAt: createdAt,
      jobId: input.jobId ?? null,
      contractId: input.contractId ?? null,
    };
    chatThreadSeed.unshift(fallbackThread);

    if (input.initialSystemMessage) {
      chatMessageSeed.push({
        id: randomUUID(),
        threadId,
        senderUserId: null,
        senderName: "System",
        messageKind: "SYSTEM",
        body: input.initialSystemMessage.trim(),
        createdAt,
        replyToMessageId: null,
      });
    }

    return fallbackThread;
  }

  async createMessage(
    threadId: string,
    input: CreateMessageInput,
    currentUser: AuthUser,
  ) {
    const body = input.body.trim();
    if (!body) {
      throw new BadRequestException("Message body cannot be empty.");
    }

    const thread = await this.assertThreadAccess(threadId, currentUser.id);
    const createdAt = new Date().toISOString();
    const messageId = randomUUID();
    const messageKind = input.messageKind ?? "TEXT";

    try {
      await this.databaseService.query(
        `
          INSERT INTO marketplace.chat_messages (
            id,
            thread_id,
            sender_user_id,
            message_kind,
            body,
            reply_to_message_id
          )
          VALUES ($1::uuid, $2::uuid, $3::uuid, $4::message_type, $5, $6::uuid)
        `,
        [
          messageId,
          threadId,
          currentUser.id,
          messageKind,
          body,
          input.replyToMessageId ?? null,
        ],
      );
      await this.databaseService.query(
        `
          UPDATE marketplace.chat_threads
          SET last_message_at = NOW()
          WHERE id = $1::uuid
        `,
        [threadId],
      );
    } catch {
      // Fall back to in-memory seed data below.
    }

    const createdMessage: ChatMessageRecord = {
      id: messageId,
      threadId,
      senderUserId: currentUser.id,
      senderName: currentUser.displayName,
      messageKind,
      body,
      createdAt,
      replyToMessageId: input.replyToMessageId ?? null,
    };

    const fallbackThread = chatThreadSeed.find((entry) => entry.id === threadId);
    if (fallbackThread) {
      fallbackThread.lastMessageAt = createdAt;
      fallbackThread.lastMessagePreview = body;
    }

    if (
      !thread ||
      chatMessageSeed.every((message) => message.id !== createdMessage.id)
    ) {
      chatMessageSeed.push(createdMessage);
    }

    return createdMessage;
  }

  async assertThreadAccess(threadId: string, userId: string) {
    try {
      const rows = await this.databaseService.query<{ threadId: string }>(
        `
          SELECT thread_id::text AS "threadId"
          FROM marketplace.chat_participants
          WHERE thread_id = $1::uuid
            AND user_id = $2::uuid
          LIMIT 1
        `,
        [threadId, userId],
      );

      if (rows[0]?.threadId) {
        const threadRows = await this.databaseService.query<ThreadRow>(
          `
            SELECT
              ct.id::text AS id,
              ct.thread_type::text AS type,
              COALESCE(
                ct.metadata ->> 'title',
                CASE
                  WHEN ct.thread_type = 'JOB_ROOM' THEN 'Job room'
                  WHEN ct.thread_type = 'CONTRACT_ROOM' THEN 'Contract room'
                  WHEN ct.thread_type = 'SUPPORT' THEN 'Support room'
                  ELSE 'Direct thread'
                END
              ) AS title,
              COALESCE(
                ARRAY_AGG(DISTINCT cp_all.user_id::text ORDER BY cp_all.user_id::text),
                ARRAY[]::text[]
              ) AS "participantIds",
              COALESCE(
                ARRAY_AGG(DISTINCT u_all.display_name ORDER BY u_all.display_name),
                ARRAY[]::text[]
              ) AS "participantNames",
              COALESCE(
                (
                  SELECT cm.body
                  FROM marketplace.chat_messages cm
                  WHERE cm.thread_id = ct.id
                    AND cm.deleted_at IS NULL
                  ORDER BY cm.created_at DESC
                  LIMIT 1
                ),
                'No messages yet.'
              ) AS "lastMessagePreview",
              ct.last_message_at::text AS "lastMessageAt",
              ct.job_id::text AS "jobId",
              ct.contract_id::text AS "contractId"
            FROM marketplace.chat_threads ct
            LEFT JOIN marketplace.chat_participants cp_all
              ON cp_all.thread_id = ct.id
            LEFT JOIN marketplace.users u_all
              ON u_all.id = cp_all.user_id
            WHERE ct.id = $1::uuid
            GROUP BY ct.id
          `,
          [threadId],
        );

        const thread = threadRows[0];
        if (thread) {
          return this.normalizeThreadRow(thread);
        }
      }
    } catch {
      // Fall back to seed data.
    }

    const thread = chatThreadSeed.find((entry) => entry.id === threadId);
    if (!thread) {
      throw new NotFoundException(`Chat thread '${threadId}' was not found.`);
    }

    if (!thread.participantIds.includes(userId)) {
      throw new ForbiddenException("You do not have access to this chat thread.");
    }

    return thread;
  }

  private getFallbackThreadsForUser(userId: string) {
    return chatThreadSeed
      .filter((thread) => thread.participantIds.includes(userId))
      .sort((left, right) => right.lastMessageAt.localeCompare(left.lastMessageAt));
  }

  private normalizeThreadRow(row: ThreadRow): ChatThreadRecord {
    return {
      id: row.id,
      type: row.type,
      title: row.title,
      participantIds: row.participantIds ?? [],
      participantNames: row.participantNames ?? [],
      lastMessagePreview: row.lastMessagePreview,
      lastMessageAt: row.lastMessageAt ?? new Date(0).toISOString(),
      jobId: row.jobId ?? null,
      contractId: row.contractId ?? null,
    };
  }

  private normalizeMessageRow(row: MessageRow): ChatMessageRecord {
    return {
      id: row.id,
      threadId: row.threadId,
      senderUserId: row.senderUserId ?? null,
      senderName: row.senderName,
      messageKind: row.messageKind,
      body: row.body,
      createdAt: row.createdAt,
      replyToMessageId: row.replyToMessageId ?? null,
    };
  }

  private async resolveParticipantNames(userIds: string[]) {
    try {
      const rows = await this.databaseService.query<{
        id: string;
        displayName: string;
      }>(
        `
          SELECT id::text AS id, display_name AS "displayName"
          FROM marketplace.users
          WHERE id = ANY($1::uuid[])
        `,
        [userIds],
      );

      const byId = new Map(rows.map((row) => [row.id, row.displayName]));
      return userIds.map(
        (userId) =>
          byId.get(userId) ??
          devPersonaSeed.find((persona) => persona.id === userId)?.displayName ??
          "Unknown user",
      );
    } catch {
      return userIds.map(
        (userId) =>
          devPersonaSeed.find((persona) => persona.id === userId)?.displayName ??
          "Unknown user",
      );
    }
  }

  private defaultTitle(type: "DIRECT" | "SUPPORT", participantNames: string[]) {
    if (type === "SUPPORT") {
      return "Support room";
    }

    return participantNames.join(" / ");
  }
}
