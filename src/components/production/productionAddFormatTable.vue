<script setup>
import { ref } from 'vue'
import ProductionStaticInputDropdown from '@/components/production/productionStaticInputDropdown.vue'

let props = defineProps({
    titles: Array,
    dropdown1data: Array
})

const titles = ref(props.titles)
const data = ref([
    { nom: props.dropdown1data[0], quantitat: 0, merme: 0, pesReal: null, pesTotal: null, mermeReal: null, pesRealReal: null },
])

function NumbersOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
    } else {
        return true;
    }
}

function removeRow(i) {
    data.value.splice(i, 1)
}

function addRow() {
    data.value.push({ nom: props.dropdown1data[0], quantitat: 0, merme: 0, pesReal: null, pesTotal: null, mermeReal: null, pesRealReal: null })
}

</script>

<template>
    <div class="table">
        <div v-for="title in titles" class="header">
            <div>{{ title }}</div>
            <div class="sorter-wrapper">
                <font-awesome-icon icon="fa-solid fa-caret-down" />
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </div>
        </div>
        <div class="header"></div>
        <template v-for="(item, i) in data">

            <!-- <div v-for="subitem in item" class="cell" :class="{ 'odd': !(i & 1) }"> -->
            <div class="dropdown">
                <ProductionStaticInputDropdown :data="dropdown1data" @select="(nom) => item.nom = nom" />
            </div>
            <div class="cell">
                <input v-model="item.quantitat" type="number" v-on:keypress="NumbersOnly">
            </div>
            <div class="cell">
                <input v-model="item.merme" type="number" v-on:keypress="NumbersOnly">
            </div>
            <!-- </div> -->
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>

            <div class="cell">
                <div class="icon-remove" @click="removeRow(i)">
                    <font-awesome-icon icon="fa-solid fa-trash" @click="deleteMode(i)" />
                </div>
            </div>
        </template>
    </div>
    <div class="icon-row" @click="addRow">
        <font-awesome-icon icon="fa-solid fa-plus" />
    </div>
</template>


<style scoped>
.table {
    width: 100%;
    border-radius: 5px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 100px;
    grid-auto-rows: 50px;

    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.table div.header:first-child {
    border-top-left-radius: 5px;
}

.table div.header:nth-child(8) {
    border-top-right-radius: 5px;
}

.table div.cell:nth-last-child(-n+8) {
    border-bottom-left-radius: 5px;
}

.table div.cell:last-child {
    border-bottom-right-radius: 5px;
}

.header {
    padding-inline: 20px;

    display: flex;
    place-items: center;
    gap: 10px;

    background: #CCCCCC;
    user-select: none;
}

.header div {
    pointer-events: none;
}

.header .sorter-wrapper {
    display: flex;
    flex-direction: column;
}

.sorter-wrapper svg:first-child {
    transform: rotate(180deg) translate(0px, -4px);
}

.sorter-wrapper svg:last-child {
    transform: translate(0px, -3px);
}

.cell {
    padding-inline: 5px;

    display: flex;
    place-items: center;

    border-bottom: 1px solid #CCCCCC;
    background: white;
}

.dropdown {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
}

.dropdown div {
    width: 100%;
}

input {
    width: 100%;
    font-size: 15px;
    background: white;
    border: none;
    border-radius: 5px;
    padding: 8px;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, .2);
}

input:focus-visible {
    outline: none;
}

.cell:nth-last-child(-n +1),
.cell:nth-last-child(-n +2),
.cell:nth-last-child(-n +3),
.cell:nth-last-child(-n +4),
.cell:nth-last-child(-n +5),
.cell:nth-last-child(-n +6),
.cell:nth-last-child(-n +7),
.cell:nth-last-child(-n +8) {
    border: none;
}

.odd {
    background: #cccccc2e;
}

.icon-row {
    height: 40px;
    aspect-ratio: 1/1;

    display: flex;
    place-items: center;
    position: relative;
    margin-top: -10px;

    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;

    background: #babaff;
    color: #5050ff;
    transition: 0.1s;
}

.icon-remove {
    height: 40px;
    aspect-ratio: 1/1;

    display: flex;
    place-items: center;

    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;

    background: #ffaeae;
    color: #ff4040;
    transition: 0.1s;

}

.icon-row svg,
.icon-remove svg {
    margin: auto;
    pointer-events: none;
    scale: 1.2;
}

.icon-row:hover,
.icon-remove:hover {
    scale: 1.1;
    filter: brightness(106%);
    transition: 0.1s;
}
</style>
