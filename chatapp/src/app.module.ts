import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { ChatService } from './chat/chat.service';

@Module({
  providers: [ChatService],
  controllers: [TestController],
  exports: [ChatService],
})
export class AppModule {}
