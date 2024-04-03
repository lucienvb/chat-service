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
        <!-- <br/><br/><br/><br/> -->
        <div v-for="msg in messages" :key="msg.id">
            <strong> {{ msg }}</strong>
        </div>

        <!-- <div v-for="post in posts" :key="post.id">
            <h3>{{ post.id }}. {{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <hr />
        </div> -->

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostList',
    data() {
        return {
            typedQuery: '',
            typedNew: '',
            messages: [],
        }
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
                this.messages.push(`Sweet, you have created a new chat named \"${newChat.chatName}\".`);
            })
            .catch((error) => {
                console.log(`Failed to create ${this.chatName}`, error)
                this.messages.push(`Failed to create ${this.chatName}`);
            })
        }
    }
}
</script>

<style scoped>

</style>