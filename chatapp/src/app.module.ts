// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ChatGateway } from './chat/chat.gateway';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService, ChatGateway],
// })
// export class AppModule {}

// #####################################################################

// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ServeStaticModule} from '@nestjs/serve-static'; // New
// import { join } from 'path'; // New

// @Module({
//   imports: [
//     ServeStaticModule.forRoot({ // New
//       rootPath: join(__dirname, '..', 'client/dist'), // New
//     }), // New
//   ],
//  controllers: [AppController],
//  providers: [AppService],
// })
// export class AppModule {}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// app.module.ts

import { Module } from '@nestjs/common';
// import { ChatModule } from './chat/chat.module';
// import { ChatController } from './chat/chat.controller';
// import { AppGateway } from './app.gateway'; // Add this import
import { TestController } from './test.controller';

@Module({
  // imports: [ChatModule],
  imports: [],
  controllers: [TestController]
  // controllers: [ChatController],
  // providers: [AppGateway], // Add AppGateway to providers
})
export class AppModule {}
