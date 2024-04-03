import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { Channel } from './chat/chat-channel.interface'
import { ChatService } from './chat/chat.service'

@Controller('test')
export class TestController {
	
	constructor(private object: ChatService) {
		
		this.object.addChannel('sbos', ['message of sbos']);
		this.object.addChannel('lvan-bus', ['message of lvan-bus']);
		// this.object.printChannel('f');
	}
	
	@Get()
    findAll(@Req() request: Request): string {
        const   queryParam = request.query;
        const   param = request.query['chatName'] as string;

        console.log("All query params:", queryParam);
        console.log("value of param:", param);

		if (this.object.channelMap[param]) {
			console.log("query matches");
        	return JSON.stringify(this.object.channelMap[param].Messages);
		}
		else
			console.log("query does not match");
		return 'Query not found'
    }

}