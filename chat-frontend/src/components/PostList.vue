<template>
    <div>
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
            messages: [],
        }
    },
    methods: {
        getChat() {
            this.messages = [];
            const query = {
                content: this.typedQuery,
                recipient: this.recipient,
            }
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
        }
    }
}
</script>

<style scoped>

</style>