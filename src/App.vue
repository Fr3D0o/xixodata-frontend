<script setup>
import { ref } from 'vue'
import fetchJokes from '@/api/users.js'

const res = ref("")

async function fetch() {
    res.value = await fetchJokes()
}
</script>

<template>
    <button @click="fetch()">DOIT</button>
    <p>{{ res }}</p>
</template>

<style scoped></style>
