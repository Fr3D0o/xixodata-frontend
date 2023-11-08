<script setup>
import { ref, onMounted } from 'vue'
import ProductionWrapper from '@/components/production/productionWrapper.vue'
import ProductionStaticDropdown from '@/components/production/productionStaticDropdown.vue'
import AddButton from '@/components/production/productionAddFormatTable/addButton.vue'
import FormatAdd from '@/components/production/productionAddFormatTable/format.vue'
import Format from '@/components/production/productionFormatTable/format.vue'
import FormatEdit from '@/components/production/productionEditFormatTable/format.vue'
import { clean, edit, getAllBySeasonAndName, remove } from '@/api/format.js'

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
    formats.value = []
    getAllBySeasonAndName(currentTemporada, currentTorro).then(function (value) {
        formats.value = value
    })
}

function savingEdit(formatTemplate) {
    clean(formatTemplate.id).then(function () {
        edit(formatTemplate.id, formatTemplate.nom, formatTemplate.barres, formatTemplate.cuita, formatTemplate.ingredients, formatTemplate.formats, formatTemplate.packagings, currentTemporada).then(function () {
            getAllBySeasonAndName(currentTemporada, currentTorro).then(function (value) {
                formats.value = value
            })
        })
    })
}

function deleteFormat(id) {
    remove(id).then(function () {
        getAllBySeasonAndName(currentTemporada, currentTorro).then(function (value) {
            formats.value = value
        })
    })
}

const edditing = ref(false)
const editRow = ref(null)
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

            <div v-for="(format, i) in  formats ">
                <Format :format="format" @delete-format="deleteFormat(format.id)" v-if="editRow != i"
                    @edit-format="edditing = true, editRow = i" />
                <FormatEdit v-if="editRow == i" :format="format" @cancel-add="editRow = null" @saving="savingEdit" />
            </div>
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
