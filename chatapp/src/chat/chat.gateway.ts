import { 
	MessageBody, 
	SubscribeMessage, 
	WebSocketGateway, 
	WebSocketServer 
} from '@nestjs/websockets';

// port 8001 is the port the back end is serving on
// {cors: '*'} makes sure it's accepts every front end connection
@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server; // this creates an instance of a server
	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void { // @MessageBody to extract the data
		console.log(message); // log the message
		this.server.emit('message', message);	// emit an event with the message as argument
												// so all clients will receive the message
	}
}
