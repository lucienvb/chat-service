<!-- ChatComponent.vue -->

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
      sendMessage() {
        const message = {
          content: this.typedMessage,
          sender: this.socket.id,
          recipient: this.recipient,
        };
        
        this.messages = [];

        this.socket.emit('sendMessage', message);
        this.typedMessage = '';
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  

<!-- <template>
    <div>
      <input
        type="text"
        id="messageInput"
        v-model="typedMessage"
        @input="handleInputChange"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        typedMessage: '',
        isInputFocused: false,
        socket: null,
      };
    },
    mounted() {

      if (!this.socket) {
        this.socket = io('http://localhost:8001');
        this.socket.on('newMessage', (message) => {
            console.log('Received new message:', message);

      });}
    },
    methods: {
      handleInputChange() {

      },
      sendMessage() {

        this.socket.emit('sendMessage', { content: this.typedMessage });
        this.typedMessage = '';
      }
    },
    beforeDestroy() {

      if (this.socket) {
        this.socket.disconnect();
      }
    }
  };
  </script>
  
  <style>

  </style> -->

<!-- ££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££ -->
  
<!-- <template>
    <div>
      <input
        type="text"
        id="messageInput"
        v-model="typedMessage"
        @input="handleInputChange"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
      <button @click="logMessage">Send</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        typedMessage: '',
        isInputFocused: false
      };
    },
    methods: {
      handleInputChange() {

      },
      logMessage() {
        console.log('Typed Message:', this.typedMessage);
        this.typedMessage = ''; // Clear the text field
      }
    }
  };
  </script>
  
  <style>

  </style>
   -->