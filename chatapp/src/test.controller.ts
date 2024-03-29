import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { Channel } from './chat/chat-channel.interface'
import { ChatService } from './chat/chat.service'

@Controller('test')
export class TestController {
	
	constructor(private channelMap: ChatService) {
		// this.channelMap['f'] = new Channel('lvan-bus', ['message1', 'message2']);
		this.channelMap.addChannel('f', ['message']);
		this.channelMap['s'] = new Channel('sbos', ['message3']);
		
		// console.log(`${this.channelMap['f'].Name}`);
		// console.log(`${this.channelMap['s'].Name}`);
	}
	
	@Get()
    findAll(@Req() request: Request): string {
        const   queryParam = request.query;
        const   param = request.query['chatName'] as string;

        console.log("All query params:", queryParam);
        console.log("value of param:", param);

		if (this.channelMap[param]) {
			console.log("query matches");
        	return JSON.stringify(this.channelMap[param].Messages);
		}
		else
			console.log("query does not match");
		return 'Query not found'
    }

}