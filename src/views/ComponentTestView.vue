<script setup>
import { ref } from 'vue'
import ProductionWrapper from '@/components/production/productionWrapper.vue'
import sort from '@/helpers/sort.js'

let array = [
    { nom: "d", num: 1 },
    { nom: "c", num: 2 },
    { nom: "b", num: 3 },
    { nom: "a", num: 4 },
]

const sorted = ref(null)

function sortFun() {
    sorted.value = sort(array, false)
}

</script>

<template>
    <ProductionWrapper @click="sortFun">
        {{ sorted }}
    </ProductionWrapper>
</template>


<style scoped></style>
