<template>
    <div>
        <!-- block and deblock -->
        <input v-model="player" placeholder="Player's username...">
        <button @click="changeAccess(true)">Block</button>
        <button @click="changeAccess(false)">Deblock</button>
        <br/><br/>

        <!-- createChat -->
        <input v-model="typedNew" placeholder="Chat name..." @keyup.enter="createChat"/>
        <button @click="createChat">Create</button>
        <br/><br/>
        <!-- getChat -->
        <input v-model="typedQuery" placeholder="Chat name..." @keyup.enter="getChat"/>
        <button @click="getChat">Search</button>
        <br/><br/>
        <br/><br/><br/><br/>
        <div v-for="msg in messages" :key="msg.id">
            <strong> {{ msg }}</strong>
        </div>
		<input v-model="typedMessage" placeholder="Type your message..." @keyup.enter="sendMessage" /> 
		<button @click="sendMessage">Send</button>
    </div>
</template>

<script>

import axios from 'axios'
import io from 'socket.io-client'

export default {
    // name: 'PostList',
    data() {
        return {
			typedMessage: '',
            typedQuery: '',
            typedNew: '',
            messages: [],
			channel: '',
			user: 'lvan-bus', // user name of the current player (get from Intra information)
            player: ''
        }
    },
	mounted() {
      this.socket = io('http://localhost:8001');
  
      this.socket.on('connect', () => {
        console.log(`Connected with id: ${this.socket.id}`);
      });
  
      this.socket.on('newMessage', (message) => {
        this.messages.push(message);
      });
    },
    methods: {
        getChat() {
            const query = {
                content: this.typedQuery,
				user: this.user
            }
            this.typedQuery = '';
            axios.get(`http://localhost:3001/api/test?chatName=${query.content}&user=${query.user}`)
            .then((response) => {
				if (response.data == '1')
					this.messages.push(`Snap! Your blocked :(`);
				else {
					response.data.forEach((element) => {
						this.messages.push(element);
						this.channel = query.content;
					});
				}
            })
            .catch((error) => {
                this.messages.push('Chat not found');
                console.log('Chat not found:', error)
            })
        },

        createChat() {
            const newChat = {
                chatName: this.typedNew,
                changeAccess: false
            }
            this.typedNew = '';
            axios.post(`http://localhost:3001/api/test?info=${newChat.changeAccess}`,
                {
                    title: 'foo',
                    body: newChat.chatName,
                    userId: 42,
                })
            .then((response) => {
				if (response.data == '0')
                	this.messages.push(`Sweet, you have created a new chat named \"${newChat.chatName}\".`);
				else
					this.messages.push(`That sucks! \"${newChat.chatName}\" is already taken...`);
            })
            .catch((error) => {
                console.log(`Failed to create ${this.chatName}`, error)
                this.messages.push(`Failed to create ${this.chatName}`);
            })
        },

        changeAccess(isBlock) {
            const block = {
                chatName: this.channel,
                player: this.player,
                changeAccess: true
            }
            if (isBlock) {
                console.log(`block: ${isBlock}`);
                this.player = '';
                axios.post(`http://localhost:3001/api/test?info=${block.changeAccess}&block=${isBlock}&user=${block.player}`,
                {
                    title: 'foo',
                    body: block.chatName,
                    userId: 42
                })
            .then((response) => {
				if (response.data == '2')
                	this.messages.push(`\"${block.player}\" is now blocked from ${block.chatName}.`);
				else
					this.messages.push(`\"${block.player}\" is already blocked.`);
            })
            .catch((error) => {
                console.log(`Failed to block ${block.player}`, error)
                this.messages.push(`Failed to block ${block.player}`);
            })
            }
        },
        
		async sendMessage() {
			const message = {
			content: this.typedMessage,
			sender: this.socket.id,
			recipient: this.recipient,
			channel: this.channel,
			};
			
			this.messages = [];
			console.log(`this channel: ${this.channel}`)

			this.socket.emit('sendMessage', message);
			this.typedMessage = '';
		},
    }
}
</script>

<style scoped>

</style>