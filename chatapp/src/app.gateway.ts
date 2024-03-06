import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

class Message {
	private messages: { content: string; recipient: string }[] = [];

	addMessage(content: string, recipient: string): void {
		const newMessage = {content, recipient};
		this.messages.push(newMessage);
	}

	emitMessages(server: Server, client: Socket, connectedClients: Set<string>): void {
		this.messages.forEach((message) => {
			connectedClients.forEach((clienttt) => {
				server.to(clienttt).to(message.recipient).emit('newMessage', message);
			});
		//   console.log(`Recipient: ${message.recipient}, Content: ${message.content}`);
		});
	  }

	printMessages(): void {
		this.messages.forEach((message) => {
		  console.log(`Recipient: ${message.recipient}, Content: ${message.content}`);
		});
	  }
  }

@WebSocketGateway(8002, { cors: '*' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	public	connectedClients = new Set<string>();
	public	messages = new Message();

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
	handleMessage(client: Socket, message: { content: string, recipient: string }): void {
		console.log(client.id, message.content);

		// this.server.to(client.id).to(message.recipient).emit('newMessage', message); // Broadcast the message to sender and recipient
		this.messages.addMessage(message.content, message.recipient);
		// this.messages.printMessages();
		this.messages.emitMessages(this.server, client, this.connectedClients);
		
	}
}
