<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/production/productionEditFormatTable/table.vue'
import TableFormat from '@/components/production/productionEditFormatTable/tableFormat.vue'
import TablePackaging from '@/components/production/productionAddFormatTable/tablePackaging.vue'

let props = defineProps({
    format: Object,
})

const newFormat = ref(props.format)

const input = ref({})

onMounted(() => input.value.focus())
</script>

<template>
    <div class="tableWrapper">
        <div class="tableWrapperTitle">
            <div class="input-wrapper">
                <input ref="input" v-model="newFormat.nom">
                <input v-model="newFormat.barres" placeholder="Barres" type="number" min="2" step="1">
                <input v-model="newFormat.cuita" placeholder="Cuita" type="number" step="0.01" min="0.01">
            </div>
            <div class="settings">
                <font-awesome-icon class="ok" icon="fa-solid fa-check" @click="editForm, $emit('saving', newFormat)" />
                <font-awesome-icon class="cancel" icon="fa-solid fa-xmark" @click="$emit('cancelAdd')" />
            </div>
        </div>
        <div class="tables-wrapper">
            <div class="table-wrapper">
                <Table :data="newFormat.ingredients" @update:data="newValue => newFormat.ingredients = newValue" />
            </div>
            <div class="tables-sub-wrapper">
                <div class="table-sub-left">
                    <TableFormat :data="newFormat.formats" @update:data="newValue => newFormat.formats = newValue" />
                </div>
                <div class="table-sub-right">
                    <div class="table-wrapper">
                        <TablePackaging :data="newFormat.packagings"
                            @update:data="newValue => newFormat.packagings = newValue" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.tables-wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;
}

.table-main {
    height: 100%;
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

.tables-sub-wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    gap: 20px;
}

.tables-sub-wrapper div {
    height: 100%;
    width: 100%;
}

.table-wrapper {
    display: flex;
    flex-direction: column;
}

.tableWrapper {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;

    padding: 20px;

    border-radius: 5px;
    background: white;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.tableWrapperTitle {
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 5px;

    display: flex;
    place-items: center;
    justify-content: space-between;
    user-select: none;
}

.input-wrapper {
    display: flex;
    gap: 10px;
}

.settings {
    display: flex;
    gap: 10px;
}

.settings svg {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s;
}

.settings svg * {
    pointer-events: none;
}

.settings svg:active {
    scale: 1.3;
    transition: 0.01s;
    filter: brightness(1.10);
}

.ok {
    background: #BFF5CA;
    color: #16db3d;
}

.cancel {
    background: #FFB9B9;
    color: #FF0000;
}

input {
    height: 40px;
    width: 200px;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    box-shadow: inset 0px 0px 7px 0px rgba(0, 0, 0, .2);
    transition: 1s;
    box-sizing: border-box;
}

input:focus-visible {
    outline: none;
}

input:active {
    box-shadow: inset 0px 0px 3px 3px rgba(0, 0, 0, .2);
    transition: 0.01s;
}
</style>
