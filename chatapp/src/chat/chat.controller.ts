import { Controller, Get, Req, Post, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ChatService } from './chat.service'

@Controller('test')
export class ChatController {
	
	constructor(private object: ChatService) {
		
		this.object.addChannel('sbos', ['message of sbos']);
		this.object.addChannel('lvan-bus', ['message of lvan-bus']);
		this.object.addMessage('lvan-bus', 'excuse me, come again');
	}
	
	@Get()
    findAll(@Req() request: Request): string {
        const   chatName = request.query['chatName'] as string;
        const   user = request.query['user'] as string;

		console.log(`${chatName} and ${user}`);

		if (this.object.channelMap[chatName]) {
			if (this.object.isBlocked(chatName, user)) {
				return JSON.stringify('1');
			}
			console.log('query matches');
        	return JSON.stringify(this.object.channelMap[chatName].Messages);
		}
		return 'query failed';
    }

	@Post()
	createChat(@Req() request: Request, @Res() response: Response): string {
		const	chatName = request.body.body;
		const	changeAccess = request.query['info'] as string;
		let		block = '';
		if (request.query['block'])
			block = request.query['block'] as string;
		let		user = '';
		if (request.query['user'])
			user = request.query['user'] as string;

		console.log(`changeAccess: ${changeAccess}`);
		console.log(`block: ${block}`);
		console.log(`user: ${user}`);

		if (changeAccess == 'false') {
			if (!this.object.addChannel(chatName, [`${chatName} IS LIVE\t(*_*)\tSTART TEXTING NOW!`])) {
				console.log(`test`);
				response.status(200).send('1');
				return ;
			}
			response.status(200).send('0');
		}
		else if (changeAccess == 'true' && block == 'true') {
			console.log("checker");
			let blocker = 'lvan-bus';
			if (this.object.block(chatName, user, blocker))
				response.status(200).send('2');
			// else
			// 	return ;
		// 	response.status(200).send('3');
		}
	}
}