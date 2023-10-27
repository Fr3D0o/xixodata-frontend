<script setup>
</script>

<template>
    <div class="adminWrapper">
        <div class="header">
            <router-link class="link" to="/admin">Torrons</router-link>
            <router-link class="link" to="/admin/temporada">Temporades</router-link>
            <router-link class="link" to="/admin/item">Items</router-link>
            <router-link class="link" to="/admin/ingredient">Ingredients</router-link>
            <router-link class="link" to="/admin/format">Formats</router-link>
            <router-link class="link" to="/admin/packaging">Packagings</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<style scoped>
.adminWrapper {
    height: 100%;
    width: 100%;
}

.header {
    height: 60px;
    display: flex;
    place-items: center;
    position: absolute;
}

.link {
    border: 1px solid black;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
}
</style>
