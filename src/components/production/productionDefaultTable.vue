<script setup>
import { ref } from 'vue'

let props = defineProps({
    titles: Array,
    data: Array
})

const titles = ref(props.titles)
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
        sorters.value[y].children[0].classList.remove('sorted')
        sorters.value[y].children[1].classList.remove('sorted')
    }

    let string = Object.keys(props.data[0])[i];

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
            data.value = [...props.data].sort(compare);
            sorters.value[i].children[0].classList.add('sorted')
            sortCounter = 1
            break
        case 1:
            data.value = [...props.data].sort(reverse);
            sorters.value[i].children[1].classList.add('sorted')
            sortCounter = 2
            break
        case 2:
            data.value = props.data
            sortCounter = 0
            break
    }
}

</script>

<template>
    <div class="table">
        <div v-for="(title, i) in titles" class="header" @click="sort(i)">
            <div>{{ title }}</div>
            <div class="sorter-wrapper" ref="sorters">
                <font-awesome-icon icon="fa-solid fa-caret-down" />
                <font-awesome-icon icon="fa-solid fa-caret-down" />
            </div>
        </div>
        <template v-for="(item, i) in data">
            <div v-for="subitem in item" class="cell" :class="{ 'odd': !(i & 1) }">{{ subitem }}</div>
        </template>
    </div>
</template>


<style scoped>
.table {
    width: 100%;
    border-radius: 5px;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 50px;

    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.table div.header:first-child {
    border-top-left-radius: 5px;
}

.table div.header:nth-child(6) {
    border-top-right-radius: 5px;
}

.table div.cell:nth-last-child(-n+6) {
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
    cursor: pointer;
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
    padding-inline: 20px;

    display: flex;
    place-items: center;

    border-bottom: 1px solid #CCCCCC;
    background: white;
}

.cell:nth-last-child(-n +1),
.cell:nth-last-child(-n +2),
.cell:nth-last-child(-n +3),
.cell:nth-last-child(-n +4),
.cell:nth-last-child(-n +5),
.cell:nth-last-child(-n +6) {
    border: none;
}

.odd {
    background: #cccccc2e;
}

.sorted {
    color: #BCAB4E;
}
</style>
