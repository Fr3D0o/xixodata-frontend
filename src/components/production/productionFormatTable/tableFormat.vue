<script setup>
import { ref } from 'vue'
import Header from '@/components/production/productionFormatTable/header.vue'

let props = defineProps({
    data: Array
})

const titles = ref(['Format', 'Quantitat', 'Mesura'])

const data = ref(props.data)

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

    let string = Object.keys(data.value[0])[i];

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
            data.value = [...data.value].sort(compare);
            sortCounter = 1
            break
        case 1:
            data.value = [...data.value].sort(reverse);
            sortCounter = 2
            break
        case 2:
            data.value = data.value
            sortCounter = 0
            break
    }
}

</script>

<template>
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
                <div class="table-main-cell">{{ row.format }}</div>
                <div class="table-main-cell">{{ Math.round(row.quantitat * 10) / 10 }}</div>
                <div class="table-main-cell">{{ row.mesura }}</div>

                <div class="settings">
                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                </div>
            </div>
        </div>

    </div>
</template>


<style scoped>
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
