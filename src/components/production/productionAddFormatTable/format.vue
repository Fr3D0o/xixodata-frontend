<script setup>
import { ref } from 'vue'
import Wrapper from '@/components/production/productionAddFormatTable/wrapper.vue'
import Table from '@/components/production/productionAddFormatTable/table.vue'
import TableFormat from '@/components/production/productionAddFormatTable/tableFormat.vue'
import TablePackaging from '@/components/production/productionAddFormatTable/tablePackaging.vue'
import { add } from '@/api/format.js'

let props = defineProps({
    temporada: Number
})

let formatTemplate = {
    nom: "",
    barres: 0,
    cuita: 0,
    ingredients: [{ nom: "", merme: 0, quantitat: 0 }],
    formats: [{ "format": "Encaixat a", "quantitat": 0, "mesura": "gr/caixo" }, { "format": "Tallat a", "quantitat": 0, "mesura": "barres/caixo" }, { "format": "Envasat a", "quantitat": 0, "mesura": "barres/caixa" }],
    packagings: []
}

function create() {
    add(formatTemplate.nom, formatTemplate.barres, formatTemplate.cuita, formatTemplate.ingredients, formatTemplate.formats, formatTemplate.packagings, props.temporada)
}

</script>

<template>
    <Wrapper :title="formatTemplate.nom" @cancel-add="$emit('cancel-add')" @save="$emit('saving')"
        @update:title="newValue => formatTemplate.nom = newValue" @create="create"
        @update:barres="newValue => formatTemplate.barres = newValue"
        @update:cuita="newValue => formatTemplate.cuita = newValue">
        <div class="tables-wrapper">
            <div class="table-wrapper">
                <Table @update:data="newValue => formatTemplate.ingredients = newValue" />
            </div>
            <div class="tables-sub-wrapper">
                <div class="table-sub-left">
                    <TableFormat @update:data="newValue => formatTemplate.formats = newValue" />
                </div>
                <div class="table-sub-right">
                    <div class="table-wrapper">
                        <TablePackaging @update:data="newValue => formatTemplate.packagings = newValue" />
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
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
</style>
