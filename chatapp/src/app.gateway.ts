import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8002, { cors: '*' })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private connectedClients = new Set<string>();

	handleConnection(client: Socket) {
		// if (!this.connectedClients.has(client.id)) {
			// this.connectedClients.forEach((client: string) => {
			// 	console.log(client);
			//   });
			console.log(`Client connected: ${client.id}`);
			this.connectedClients.add(client.id);
			this.sendConnectedClients();
		// }
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
		this.server.to(client.id).to(message.recipient).emit('newMessage', message); // Broadcast the message to sender and recipient
	}
}
