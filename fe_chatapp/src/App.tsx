import { useEffect, useState } from 'react'
import logo from './logo.svg'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import io, { Socket } from "socket.io-client"
import MessageInput from './MessageInput'
import Messages from "./Messages"

function App() {
  const [socket, setSocket] = useState<Socket>()
  const[messages, setMessages]=useState<string[]>([])

  const send = (value: string) => {
    socket?.emit("message", value)
  }
  useEffect(() => {
    const newSocket=io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: string) => { // listen to incoming messages
    setMessages([...messages, message]) // add message to messages
  }
  useEffect(() => {
    socket?.on("message", messageListener) // if we have an event and it is a socket run messageListener
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])
  return (
    <>
      {" "}
      <MessageInput send={send} />
      <Messages messages={messages} />
    </>
  )
}

export default App
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
		// this.server.to(client.id).to(message.recipient).emit('newMessage', message); // Broadcast the message to sender and recipient
		this.messages.addMessage(message.content, message.recipient);
		// this.messages.printMessages();
		this.messages.emitMessages(this.server, client, this.connectedClients);
		
	}

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
