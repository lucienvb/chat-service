<template>
    <div>
        <input v-model="typedQuery" placeholder="Chat name..." @keyup.enter="getChat"/>
        <button @click="getChat">Search</button>
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
            // posts: [],
        }
    },
    methods: {
        getChat() {
            const query = {
                content: this.typedQuery,
                recipient: this.recipient,
            }
            axios.get(`http://localhost:3000/api/test?chatName=${query.content}`)
            .then((response) => {
                console.log('response:', response)
                this.posts = response.data

            })
            .catch((error) => {
                console.log('Errorrrr:', error)
            })
        }
    }
}
</script>

<style scoped>

</style>