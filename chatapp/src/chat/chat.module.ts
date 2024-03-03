import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from '../app.gateway'; // Import WebSocket gateway if needed

@Module({
  controllers: [ChatController],
  providers: [ChatService, AppGateway], // Include WebSocket gateway if needed
})
export class ChatModule {}
