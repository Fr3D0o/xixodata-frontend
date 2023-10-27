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

const title = ref(null)
const data = ref(null)
const data1 = ref(null)
const data2 = ref(null)

const on = ref(true)

function create() {
    add(title.value, data.value, data1.value, data2.value, props.temporada)

    on.value = false
}

</script>

<template>
    <Wrapper :title="title" @update:title="newValue => title = newValue" @create="create" @cancel-add="$emit('cancel-add')"
        @save="$emit('saving')">
        <div class="tables-wrapper">
            <div class="table-wrapper">
                <Table @update:data="newValue => data = newValue" />
            </div>
            <div class="tables-sub-wrapper">
                <div class="table-sub-left">
                    <TableFormat @update:data="newValue => data1 = newValue" />
                </div>
                <div class="table-sub-right">
                    <div class="table-wrapper">
                        <TablePackaging @update:data="newValue => data2 = newValue" />
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
