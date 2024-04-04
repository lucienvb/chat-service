<template>
    <div>
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
		<div v-for="msg in messages" :key="msg.id">
      		<strong>{{ msg.sender }}</strong> {{ msg.content }}
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
			channel: ''
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
            }
            this.typedQuery = '';
            axios.get(`http://localhost:3001/api/test?chatName=${query.content}`)
            .then((response) => {
                response.data.forEach((element) => {
                    this.messages.push(element);
					this.channel = query.content;
                });
            })
            .catch((error) => {
                this.messages.push('Chat not found');
                console.log('Chat not found:', error)
            })
        },
        createChat() {
            const newChat = {
                chatName: this.typedNew,
            }
            this.typedNew = '';
            axios.post(`http://localhost:3001/api/test`,
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