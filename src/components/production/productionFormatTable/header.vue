<script setup>
import { ref } from 'vue'

const sorters = ref({})

let sortCounter = 0
function sort() {
    switch (sortCounter) {
        case 0:
            sorters.value.children[0].classList.add('sorted')
            sorters.value.children[1].classList.remove('sorted')
            sortCounter = 1
            break
        case 1:
            sorters.value.children[0].classList.remove('sorted')
            sorters.value.children[1].classList.add('sorted')
            sortCounter = 2
            break
        case 2:
            reset()
            sortCounter = 0
            break
    }
}

function reset() {
    sorters.value.children[0].classList.remove('sorted')
    sorters.value.children[1].classList.remove('sorted')
}

defineExpose({
    sort,
    reset
})
</script>


<template>
    <div class="table-title-wrapper">
        <div class="table-title">
            <slot />
        </div>
        <div class="sorter-wrapper" ref="sorters">
            <font-awesome-icon icon="fa-solid fa-caret-down" />
            <font-awesome-icon icon="fa-solid fa-caret-down" />
        </div>
    </div>
</template>


<style scoped>
.table-title-wrapper {
    display: flex;
    flex: 1;
    gap: 10px;

    padding-left: 20px;
    cursor: pointer;
}

.table-title-wrapper * {
    pointer-events: none;
    user-select: none;
}

.table-title {
    align-self: center;
}

.sorter-wrapper {
    display: flex;
    flex-direction: column;
}

.sorter-wrapper svg:first-child {
    transform: rotate(180deg) translate(0px, -4px);
}

.sorter-wrapper svg:last-child {
    transform: translate(0px, -3px);
}

.sorted {
    color: #BCAB4E;
}
</style>
