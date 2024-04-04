import { Controller, Get, Req, Post, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ChatService } from './chat.service'

@Controller('test')
export class ChatController {
	
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

	@Post()
	createChat(@Req() request: Request, @Res() response: Response): string {
		const	chatName = request.body.body;
		if (!this.object.addChannel(chatName, [`${chatName} IS LIVE\t(*_*)\tSTART TEXTING NOW!`])) {
			console.log(`test`);
			response.status(200).send('1');
			return ;
		}
		response.status(200).send('0');
	}

}