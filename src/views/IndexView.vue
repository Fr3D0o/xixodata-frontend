<script setup>
import { useSidebarStore } from '@/stores/sidebar'

const linksStore = useSidebarStore()
</script>

<template>
    <div class="indexWrapper">
        <div class="sidebar">
            <div class="logoWrapper">
                <img class="logo" src="@/assets/logo.svg" />
                <div>xixodata</div>
            </div>
            <div class="linksWrapper">
                <router-link class="link" :class="{ 'clicked': link.isClicked }" :to="link.to"
                    @click="linksStore.setLink(i)" v-for="(link, i) in linksStore.links">
                    <div class="linkBar"></div>
                    <font-awesome-icon class="linkIcon" :icon="link.icon" />
                    <div class="linkLink">{{ link.name }}</div>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>


<style scoped>
.indexWrapper {
    height: 100vh;
    width: 100vw;
    background: white;
    display: flex;
    flex-direction: row;
}

.sidebar {
    height: 100vh;
    width: 100px;
    background: white;
    transition: 0.4s;
    color: black;
    overflow: hidden;
    /* box-shadow-lg */
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    z-index: 1;
}

.sidebar:hover {
    width: 300px;
}

.sidebar:hover .logoWrapper {
    transition: 0.5s;
    gap: 10px;
}

.logoWrapper {
    height: 100px;
    padding-left: 18px;

    display: flex;
    align-items: center;
    gap: 20px;
    transition: 0.5s;
}

.logoWrapper div {
    font-size: 35px;
    margin-top: -5px;
}

.logoWrapper .logo {
    height: 60px;
    width: 60px;
}

.linksWrapper {
    display: flex;
    flex-direction: column;
}

.link {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 25px;
    color: black;
    text-decoration: none;
    min-width: fit-content;
}

.linkBar {
    width: 4px;
    background: #BCAB4E;
    height: inherit;
    opacity: 0;
}

.linkIcon {
    height: 35px;
    width: 35px;
    margin-right: 10px;
    transition: margin 0.4s;
}

.link:hover {
    background: #BCAB4E42;
}

.link:hover>font-awesome-icon {
    color: #BCAB4E
}

.linkLink {
    font-size: 20px;
}

.clicked>.linkBar {
    opacity: 1
}

.clicked {
    color: #BCAB4E
}

.sidebar:hover .linkIcon {
    margin-right: -5px;
    transition: margin 0.4s;
}
</style>
