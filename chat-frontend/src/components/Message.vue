<template>
  <div>
    <div v-for="msg in messages" :key="msg.id">
      <strong>{{ msg.sender }}:</strong> {{ msg.content }}
    </div>
    <input v-model="typedMessage" placeholder="Type your message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';
  
  export default {
    data() {
      return {
        typedMessage: '',
        messages: [],
        socket: null,
        recipient: 'other-client-id', // Replace with the recipient's client id
      };
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
      async sendMessage() {
        const message = {
          content: this.typedMessage,
          sender: this.socket.id,
          recipient: this.recipient,
        };
        
        this.messages = [];

        this.socket.emit('sendMessage', message);
        this.typedMessage = '';

        try {
          const response = await axios.get(`http://localhost:3001/chat/messages?channel=general`);
          return response.data;
        } catch (error) {
            console.error('Error fetching chat messages:', error);
            return { error: 'Error fetching chat messages' };
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
