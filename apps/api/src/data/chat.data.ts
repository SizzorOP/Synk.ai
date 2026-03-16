export type ChatThreadType =
  | "DIRECT"
  | "JOB_ROOM"
  | "CONTRACT_ROOM"
  | "SUPPORT";

export type ChatMessageKind = "TEXT" | "FILE" | "SYSTEM" | "TASK";

export type ChatThreadRecord = {
  id: string;
  type: ChatThreadType;
  title: string;
  participantIds: string[];
  participantNames: string[];
  lastMessagePreview: string;
  lastMessageAt: string;
  jobId: string | null;
  contractId: string | null;
};

export type ChatMessageRecord = {
  id: string;
  threadId: string;
  senderUserId: string | null;
  senderName: string;
  messageKind: ChatMessageKind;
  body: string;
  createdAt: string;
  replyToMessageId: string | null;
};

export const chatThreadSeed: ChatThreadRecord[] = [
  {
    id: "thread-1",
    type: "JOB_ROOM",
    title: "Prooflane MVP delivery room",
    participantIds: [
      "44444444-4444-4444-4444-444444444444",
      "22222222-2222-2222-2222-222222222222",
    ],
    participantNames: ["Prooflane Recruiter", "Ravi Kulkarni"],
    lastMessagePreview: "I can have the dashboard and matching flow ready by Friday.",
    lastMessageAt: "2026-03-16T13:45:00.000Z",
    jobId: "job-2",
    contractId: null,
  },
  {
    id: "thread-2",
    type: "SUPPORT",
    title: "Verification support desk",
    participantIds: [
      "33333333-3333-3333-3333-333333333333",
      "55555555-5555-5555-5555-555555555555",
    ],
    participantNames: ["Sana Arora", "Prooflane Admin"],
    lastMessagePreview: "Please upload the revised portfolio proof links when ready.",
    lastMessageAt: "2026-03-16T12:30:00.000Z",
    jobId: null,
    contractId: null,
  },
];

export const chatMessageSeed: ChatMessageRecord[] = [
  {
    id: "message-1",
    threadId: "thread-1",
    senderUserId: "44444444-4444-4444-4444-444444444444",
    senderName: "Prooflane Recruiter",
    messageKind: "TEXT",
    body: "Can you confirm the first delivery milestone for the marketplace MVP?",
    createdAt: "2026-03-16T13:33:00.000Z",
    replyToMessageId: null,
  },
  {
    id: "message-2",
    threadId: "thread-1",
    senderUserId: "22222222-2222-2222-2222-222222222222",
    senderName: "Ravi Kulkarni",
    messageKind: "TEXT",
    body: "I can have the dashboard and matching flow ready by Friday.",
    createdAt: "2026-03-16T13:45:00.000Z",
    replyToMessageId: "message-1",
  },
  {
    id: "message-3",
    threadId: "thread-2",
    senderUserId: "55555555-5555-5555-5555-555555555555",
    senderName: "Prooflane Admin",
    messageKind: "TEXT",
    body: "Please upload the revised portfolio proof links when ready.",
    createdAt: "2026-03-16T12:30:00.000Z",
    replyToMessageId: null,
  },
];
