import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from "./chat.service";

// {cors: '*'} makes sure it's accepts every front end connection
@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	public	connectedClients = new Set<string>();

	constructor(private object: ChatService) {}

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
		this.connectedClients.add(client.id);
		this.sendConnectedClients();

	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
		this.connectedClients.delete(client.id);
    	this.sendConnectedClients();
	}

	sendConnectedClients() {
		this.server.emit('connectedClients', Array.from(this.connectedClients));
	}

	@SubscribeMessage('sendMessage')
	handleMessage(client: Socket, message: { content: string, recipient: string, channel: string }): void {
		console.log(`${message.content}`);
		console.log(`${message.channel}`);
		this.object.addMessage(message.channel, message.content);
		let	chatHistory = this.object.channelMap[message.channel].Messages;
		chatHistory.forEach((element) => {
			this.server.to(client.id).to(message.recipient).emit('newMessage', element);	
		})
	}
}

