import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import type { AuthUser } from "../auth/auth.types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { CreateChatMessageDto } from "./dto/create-chat-message.dto";
import { CreateChatThreadDto } from "./dto/create-chat-thread.dto";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("threads")
  getThreads(@CurrentUser() currentUser: AuthUser) {
    return this.chatService.getThreadsForUser(currentUser);
  }

  @Post("threads")
  createThread(
    @Body() input: CreateChatThreadDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.chatService.createThread(input, currentUser);
  }

  @Get("threads/:threadId/messages")
  getMessages(
    @Param("threadId") threadId: string,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.chatService.getMessagesForThread(threadId, currentUser);
  }

  @Post("threads/:threadId/messages")
  createMessage(
    @Param("threadId") threadId: string,
    @Body() input: CreateChatMessageDto,
    @CurrentUser() currentUser: AuthUser,
  ) {
    return this.chatService.createMessage(threadId, input, currentUser);
  }
}
