<template>
    <div>
        <button @click="getPosts">Load posts</button>
        <div v-for="post in posts" :key="post.id">
            <h3>{{ post.id }}. {{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <hr />
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'PostList',
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        getPosts() {
            // axios.get('https://jsonplaceholder.typicode.com/posts')
            axios.get('http://localhost:3000/test')
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