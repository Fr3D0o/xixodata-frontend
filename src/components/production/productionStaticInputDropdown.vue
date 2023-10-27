<script setup>
import { ref } from 'vue'

let props = defineProps({
    data: Array,
})

const title = ref(props.data[0])

const torroDropdown = ref(false)

const torroDropdownElem = ref({})

function closeTorroDropdown() {
    torroDropdown.value = false
    document.removeEventListener('click', handleOutsideClick)
}

function toggleTorroDropdown() {
    if (torroDropdown.value) {
        torroDropdown.value = false
        document.removeEventListener('click', handleOutsideClick)
    } else {
        torroDropdown.value = true
        document.addEventListener('click', handleOutsideClick)
    }
}

function handleOutsideClick(e) {
    if (e.target != torroDropdownElem.value) {
        torroDropdown.value = false
        document.removeEventListener('click', handleOutsideClick)
    }
}

function select(item) {
    title.value = item
}
</script>


<template>
    <div class="torro-dropdown-wrapper">


        <div class="torro-dropdown" @click="toggleTorroDropdown" ref="torroDropdownElem">
            <div>{{ title }}</div>
            <font-awesome-icon class="dropdown-icon" :class="{ 'toggled': torroDropdown }" icon="fa-solid fa-caret-down" />
        </div>

        <div class="torro-dropdown-options-wrapper" :class="{ 'hidden': !torroDropdown }">
            <div v-for="item in data" @click="closeTorroDropdown, $emit('select', item), select(item)">{{ item }}</div>
        </div>
    </div>
</template>


<style scoped>
.torro-dropdown-wrapper {
    min-width: 80px;
    width: fit-content;
    height: inherit;
    user-select: none;
    z-index: 1;
}

.torro-dropdown {
    min-width: inherit;
    width: inherit;
    height: fit-content;
    background: white;
    padding-block: 10px;

    position: relative;
    display: flex;
    place-items: center;
    justify-content: space-between;

    border-radius: 5px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    cursor: pointer;
}

.torro-dropdown div {
    padding-inline: 10px;
    pointer-events: none;
}

.torro-dropdown svg {
    transform: rotate(0deg);
    padding-inline: 15px;
    transition: 0.2s;
    pointer-events: none;
}

.torro-dropdown-options-wrapper {
    background: white;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    margin-top: -10px;
    padding-top: 10px;
    border-radius: 5px;
    padding-bottom: 1px;

    position: relative;
    z-index: 1;
}

.torro-dropdown-options-wrapper div {
    padding: 7px;
    margin: 4px;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    cursor: pointer;
}

.hidden {
    display: none;
    z-index: unset;
}

.toggled {
    transform: rotate(-90deg) !important;
    transition: 0.2s;
}
</style>
