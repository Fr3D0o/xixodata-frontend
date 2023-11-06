<script setup>
import { ref, onMounted } from 'vue'
import ProductionWrapper from '@/components/production/productionWrapper.vue'
import ProductionStaticDropdown from '@/components/production/productionStaticDropdown.vue'
import AddButton from '@/components/production/productionAddFormatTable/addButton.vue'
import FormatAdd from '@/components/production/productionAddFormatTable/format.vue'
import Format from '@/components/production/productionFormatTable/format.vue'
import { getAllBySeasonAndName } from '@/api/format.js'

const temporades = [2023, 2024, 2025]
const torrons = ['Xixona', 'Alacant']

let currentTemporada = temporades[0]
let currentTorro = torrons[0]

const formats = ref(null)


const adding = ref(false)

function fetch(temporada, torro) {
    getAllBySeasonAndName(temporada, torro).then(function (value) {
        formats.value = value
    })
}

function selectTemporada(item) {
    currentTemporada = item
    fetch(currentTemporada, currentTorro)
}

function selectTorro(item) {
    currentTorro = item
    fetch(currentTemporada, currentTorro)
}

function addNewFormat() {
    adding.value = true
}

function cancelAdd() {
    adding.value = false
}

function saving() {
    adding.value = false
    getAllBySeasonAndName(currentTemporada, currentTorro).then(function (value) {
        formats.value = value
    })
}

function deleteFormat() {
    getAllBySeasonAndName(currentTemporada, currentTorro).then(function (value) {
        formats.value = value
    })
}
onMounted(() => fetch(currentTemporada, currentTorro))
</script>


<template>
    <ProductionWrapper>
        <div class="header">
            <div class="temporada-torro-wrapper">
                <ProductionStaticDropdown :data="temporades" @select="selectTemporada" />
                <ProductionStaticDropdown :data="torrons" @select="selectTorro" />
            </div>
            <AddButton :active="adding" @click="addNewFormat" />
        </div>
        <div class="warning" v-if="formats?.length == 0 && !adding">Aquest torro no cap format</div>
        <div class="body">
            <FormatAdd v-if="adding" @cancel-add="cancelAdd" @saving="saving" :temporada="currentTemporada" />

            <Format v-for="format in formats" :id="format.id" :title="format.nom" :data1="format.ingredients"
                @delete-format="deleteFormat" :barres="format.barres" :cuita="format.cuita" :data2="format.formats"
                :data3="format.packagings" />
        </div>
    </ProductionWrapper>
</template>


<style scoped>
.header {
    width: 100%;
    height: 40px;
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
}

.temporada-torro-wrapper {
    display: flex;
    gap: 10px;
}

.warning {
    display: flex;
    justify-content: center;
    padding: 20px;
    opacity: 0.4;
}

.table-wrapper {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
}

.subtable-wrapper {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.body {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>
