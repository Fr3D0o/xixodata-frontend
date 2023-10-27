<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import { useProductionStore } from '@/stores/production'

const productionStore = useProductionStore()

function setLink(i) {
    productionStore.setLink(i)
}
</script>


<template>
    <div class="producionWrapper">
        <HeaderComponent :links="productionStore.links" @set-link="setLink" />
        <router-view></router-view>
    </div>
</template>


<style scoped>
.producionWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
