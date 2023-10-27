<script setup>
defineProps({
    links: Array
})

</script>


<template>
    <div class="headerWrapper">
        <router-link class="link" :class="{ 'clicked': link.isClicked }" :to="link.to" v-for="(link, i) in links"
            @click="$emit('setLink', i)">
            <div class="linkLink">{{ link.name }}</div>
            <div class="linkBar"></div>
        </router-link>
    </div>
</template>


<style scoped>
.headerWrapper {
    height: 100px;
    width: 100%;
    background: white;
    /* box-shadow-lg */
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    display: flex;
    justify-content: left;
    align-items: end;
    padding-left: 30px;
    gap: 20px;
}

.link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: black;
}

.linkBar {
    height: 5px;
    width: 100%;
    background: white;
}

.clicked .linkLink {
    color: #BCAB4E;
}

.clicked .linkBar {
    background: #BCAB4E;
}

.linkLink {
    margin: 10px;
}
</style>
