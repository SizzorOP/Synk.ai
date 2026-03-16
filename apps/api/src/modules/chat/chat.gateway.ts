import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import type { Server, Socket } from "socket.io";

import { AuthService } from "../auth/auth.service";
import type { AuthUser } from "../auth/auth.types";
import { ChatService } from "./chat.service";

type AuthenticatedSocket = Socket & {
  data: {
    user?: AuthUser;
  };
};

@WebSocketGateway({
  namespace: "/collaboration",
  cors: {
    origin: true,
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(socket: AuthenticatedSocket) {
    const token = this.extractToken(socket);
    if (!token) {
      socket.disconnect(true);
      return;
    }

    try {
      const user = await this.authService.getCurrentUser(token);
      socket.data.user = user;

      const threads = await this.chatService.getThreadsForUser(user);
      for (const thread of threads) {
        await socket.join(this.threadRoom(thread.id));
      }

      socket.emit("session:ready", {
        user,
        threadIds: threads.map((thread) => thread.id),
      });
    } catch {
      socket.disconnect(true);
    }
  }

  @SubscribeMessage("thread:join")
  async joinThread(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() body: { threadId?: string },
  ) {
    const user = this.getSocketUser(socket);
    const threadId = body.threadId?.trim();
    if (!threadId) {
      throw new WsException("threadId is required.");
    }

    await this.chatService.assertThreadAccess(threadId, user.id);
    await socket.join(this.threadRoom(threadId));

    return {
      status: "ok",
      threadId,
    };
  }

  @SubscribeMessage("message:send")
  async sendMessage(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody()
    body: {
      threadId?: string;
      body?: string;
      messageKind?: "TEXT" | "FILE" | "SYSTEM" | "TASK";
      replyToMessageId?: string;
    },
  ) {
    const user = this.getSocketUser(socket);
    const threadId = body.threadId?.trim();
    if (!threadId) {
      throw new WsException("threadId is required.");
    }

    const message = await this.chatService.createMessage(
      threadId,
      {
        body: body.body ?? "",
        messageKind: body.messageKind,
        replyToMessageId: body.replyToMessageId,
      },
      user,
    );

    this.server.to(this.threadRoom(threadId)).emit("message:created", message);
    return {
      status: "ok",
      messageId: message.id,
    };
  }

  private getSocketUser(socket: AuthenticatedSocket) {
    const user = socket.data.user;
    if (!user) {
      throw new WsException("Socket session is not authenticated.");
    }

    return user;
  }

  private extractToken(socket: Socket) {
    const authToken = socket.handshake.auth?.token;
    if (typeof authToken === "string" && authToken.trim()) {
      return authToken.trim();
    }

    const authorizationHeader = socket.handshake.headers.authorization;
    const headerValue = Array.isArray(authorizationHeader)
      ? authorizationHeader[0]
      : authorizationHeader;
    if (typeof headerValue === "string" && headerValue.startsWith("Bearer ")) {
      return headerValue.slice("Bearer ".length).trim();
    }

    return null;
  }

  private threadRoom(threadId: string) {
    return `thread:${threadId}`;
  }
}
