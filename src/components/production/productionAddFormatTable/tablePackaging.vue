<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/production/productionAddFormatTable/header.vue'
import DropdownInput from '@/components/production/productionAddFormatTable/dropdownInput.vue'
import { getAll } from '@/api/packaging.js'

const packagingsData = ref([])

function fetch() {
    getAll().then(function (value) {
        value.forEach((item) => {
            packagingsData.value.push(item.nom)
        });
    })
}

const titles = ref(['Nom', 'Mida', 'Quantitat'])
const emit = defineEmits(['update:data'])

const data = ref([
    { "nom": null, "mida": null, "quantitat": null }
])

const row = { "nom": null, "mida": null, "quantitat": null }


function newRow() {
    let b = Object.assign({}, row);
    data.value.push(b)
}

function removeRow(i) {
    data.value.splice(i, 1)
}

function updateNom(i, newValue) {
    data.value[i].nom = newValue
    emit('update:data', data.value)
}

onMounted(() => fetch())
</script>

<template>
    <div class="table-main">

        <div class="table-main-header">

            <Header v-for="title in titles">
                {{ title }}
            </Header>
            <div class="settings">
                <font-awesome-icon icon="fa-solid fa-gear" />
            </div>

        </div>

        <div class="table-main-body">
            <div class="table-main-row" v-for="(item, i) in data">
                <div class="table-main-cell dropdown-cell">
                    <DropdownInput :data="packagingsData" @select="newValue => updateNom(i, newValue)" />
                </div>

                <div class="table-main-cell"></div>
                <div class="table-main-cell"></div>

                <div class="settings">
                    <font-awesome-icon class="cancel" icon="fa-solid fa-trash" @click="removeRow" />
                </div>
            </div>

        </div>
    </div>
    <font-awesome-icon class="add-row" icon="fa-solid fa-plus" @click="newRow" />
</template>


<style scoped>
.table-main {
    height: fit-content;
    width: 100%;

    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.table-main-header {
    height: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: bold;
    background: #CCCCCC;
    border-radius: 5px 5px 0px 0px;
}

.table-main-header .settings {
    display: flex;
    justify-content: center;
    flex: 0.4;
}

.table-main-body {
    display: flex;
    flex-direction: column;
    border-radius: 0px 0px 5px 5px;
}

.table-main-row {
    display: flex;
    justify-content: space-between;
    height: 50px;
    user-select: none;


    background: white;
    border-bottom: 1px solid #CCCCCC;
}

.table-main-row:last-child {
    border-radius: 0px 0px 5px 5px;
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
    scale: 1;
    cursor: pointer;
}

.table-main-row:hover>.settings svg {
    opacity: 1;
}

.table-main-row .settings svg {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: scale 0.5s;
}

.table-main-row .settings svg * {
    pointer-events: none;
}

.table-main-row .settings svg:active {
    scale: 1.3;
    transition: scale 0.01s;
    filter: brightness(1.10);
}

.cancel {
    background: #FFB9B9;
    color: #FF0000;
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


.add-row {
    width: fit-content;
    aspect-ratio: 1/1;
    margin-top: 10px;
    margin-left: 5px;
    padding: 7px;
    border-radius: 5px;
    background: #D1D1FF;
    cursor: pointer;
    scale: 1.2;
    color: blue;
}

.dropdown-cell {
    align-items: unset;
}

.dropdown-cell div {
    margin-left: -10px;
}

.input {
    padding-left: 20px !important;
}

.input input {
    width: 100%;
    margin-left: -10px;
    margin-right: 10px;
    border: none;
    padding: 5px;
    box-shadow: inset 0px 0px 8px 0px rgba(0, 0, 0, .2);
    border-radius: 5px;
    font-size: 17px;
    transition: 0.5s
}

.input input:active {
    box-shadow: inset 0px 0px 10px 3px rgba(0, 0, 0, .2);
    transition: 0.01s
}

.input input:focus-visible {
    outline: none;
}
</style>
