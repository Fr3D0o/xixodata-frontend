<script setup>
import { ref } from 'vue'
import Wrapper from '@/components/production/productionFormatTable/wrapper.vue'
import Table from '@/components/production/productionFormatTable/table.vue'
import TableFormat from '@/components/production/productionFormatTable/tableFormat.vue'
import TablePackaging from '@/components/production/productionFormatTable/tablePackaging.vue'

let props = defineProps({
    title: String,
    data1: Array,
    data2: Array,
    data3: Array,
})

</script>

<template>
    <Wrapper :title="title">
        <div class="tables-wrapper">
            <Table :data="data1" />
            <div class="tables-sub-wrapper">
                <div class="table-sub-left">
                    <TableFormat :data="data2" />
                </div>
                <div class="table-sub-right">
                    <TablePackaging :data="data3" />
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
    background: #CCCCCC;

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

    background: white;

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

.table-sub-left {}

.table-sub-right {}
</style>
