import { Controller, Get, Query } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Get('messages')
  getChatMessages(@Query('channel') channel: string): string[] {
    // Here you can implement logic to retrieve chat messages based on the provided channel
    // For example, you can query a database or fetch messages from memory
    const messages: string[] = []; // Replace this with actual logic to fetch messages
    return messages;
  }
}