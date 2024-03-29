import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

export class channel {
	Name: string;
	Messages: string[];

	constructor(name: string, messages: string[]) {
		this.Name = name;
		this.Messages = messages;
	}
}

@Controller('test')
export class TestController {
	
	private channelMap: { [key: string]: channel } = {};
	
	constructor() {
		this.channelMap['lvan-bus'] = new channel('lvan-bus', ['message1', 'message2']);
		this.channelMap['sbos'] = new channel('sbos', ['message3']);
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