<script setup>

</script>


<template>
    <div class="calculWrapper">
        <div class="header">
            <router-link class="link" to="/calcul">Torrons</router-link>
            <!-- <router-link class="link" to="/admin/ingredient">Ingredients</router-link> -->
            <!-- <router-link class="link" to="/admin/format">Formats</router-link> -->
            <!-- <router-link class="link" to="/admin/packaging">Packagings</router-link> -->
        </div>

        <router-view></router-view>
    </div>
</template>


<style scoped>
.calculWrapper {
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
