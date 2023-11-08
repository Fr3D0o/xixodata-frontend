<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/production/productionFormatTable/header.vue'
import { getAllBySeason } from '@/api/format.js'

const temporades = ref([2023, 2024, 2025])
const currentTemporada = ref(temporades.value[0])

const formats = ref(null)
const data = ref(null)

const titles = ref(['Nom', 'Barres', 'Cuites', 'Caixons'])

function fetch() {
    getAllBySeason(currentTemporada.value).then(function (value) {
        formats.value = value
        data.value = value
    })
}

const sorters = ref({})

let sortCounter = 0
let lastSort = 0
function sort(i) {
    if (lastSort != i) {
        sortCounter = 0
        lastSort = i
    }

    for (let y = 0; y < sorters.value.length; y++) {
        sorters.value[y].reset()
    }

    sorters.value[i].sort()

    let string = Object.keys(formats.value[0])[i];

    function compare(a, b) {
        if (a[string] < b[string]) {
            return -1;
        }
        if (a[string] > b[string]) {
            return 1;
        }
        return 0;
    }

    function reverse(a, b) {
        if (a[string] < b[string]) {
            return 1;
        }
        if (a[string] > b[string]) {
            return -1;
        }
        return 0;
    }

    switch (sortCounter) {
        case 0:
            data.value = [...formats.value].sort(compare);
            sortCounter = 1
            break
        case 1:
            data.value = [...formats.value].sort(reverse);
            sortCounter = 2
            break
        case 2:
            data.value = formats.value
            sortCounter = 0
            break
    }
}

onMounted(() => fetch())
</script>

<template>
    <div class="production-season-wrapper">
        <div class="table-main">

            <div class="table-main-header">

                <Header v-for="(title, i) in titles" @click="sort(i)" ref="sorters">
                    {{ title }}
                </Header>
                <div class="settings">
                    <font-awesome-icon icon="fa-solid fa-gear" />
                </div>

            </div>

            <div class="table-main-body">
                <div class="table-main-row" v-for="row in data">
                    <div class="table-main-cell">{{ row.nom }}</div>
                    <div class="table-main-cell">{{ row.barres }}</div>
                    <div class="table-main-cell">{{ Math.round((row.barres / row.cuita) * 10) / 10 }}</div>
                    <div class="table-main-cell">{{ row.barresXcaixo }}</div>

                    <div class="settings">
                        <font-awesome-icon icon="fa-solid fa-ellipsis" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.production-season-wrapper {
    height: 100%;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    overflow: auto;
}

.table-main {
    height: fit-content;
    width: 100%;

    background: #CCCCCC;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.table-main-header {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: bold;
}

.table-main-header .settings {
    display: flex;
    justify-content: center;
    flex: 0.4;
}

.table-main-body {
    display: flex;
    flex-direction: column;
    background: white;

    border-radius: 0px 0px 5px 5px;
}

.table-main-row {
    display: flex;
    justify-content: space-between;
    height: 50px;
    user-select: none;

    border-bottom: 1px solid #CCCCCC;
}

.table-main-row:nth-child(even) {
    background: #cccccc2e;
}


.table-main-row .settings {
    display: flex;
    justify-content: center;
    place-items: center;
    flex: 0.4;
}

.table-main-row .settings svg {
    opacity: 0;
    scale: 1.3;
    cursor: pointer;
}

.table-main-row:hover>.settings svg {
    opacity: 1;
}

.table-main-cell {
    flex: 1;

    display: flex;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
}

.table-main-row:last-child {
    border: none;
}
</style>
