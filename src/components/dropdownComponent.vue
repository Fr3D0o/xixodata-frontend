<script setup>
import { ref } from 'vue'

let props = defineProps({
    data: Array,
    title: String,
    lock: Boolean
})

const isToggled = ref(false)

const dropdown = ref({})

function toggleDropdown() {
    if (!props.lock) {
        isToggled.value = !isToggled.value
        document.addEventListener('click', hideDropdown)
    }
}

function hideDropdown(e) {
    if (dropdown.value == e.target || dropdown.value.contains(e.target)) {
    } else {
        isToggled.value = false
        document.removeEventListener('click', hideDropdown)
    }
}

</script>

<template>
    <div class="dropdownWrapper">
        <div class="dropdown" @click="toggleDropdown()" ref="dropdown" v-if="data != null">
            {{ title }}
            <font-awesome-icon class="dropdown-icon" :class="{ 'clicked': !isToggled }" icon="fa-solid fa-caret-down" />
        </div>
        <div class="dropdown" @click="toggleDropdown()" ref="dropdown" v-if="data == null">
            NAN
            <font-awesome-icon class="dropdown-icon" :class="{ 'clicked': !isToggled }" icon="fa-solid fa-caret-down" />
        </div>
        <div class="dropdownOptions" :class="{ 'hidden': !isToggled }">
            <div v-for="(i, j) of data" @click="$emit('setCurrent', j)">{{ i?.any || i }}</div>
        </div>
    </div>
</template>

<style scoped>
.dropdownWrapper {
    width: 80px;
    height: fit-content;
}

.dropdown {
    width: fit-content;
    height: fit-content;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    display: flex;
}

.dropdown-icon {
    margin-left: 5px;
    transform: rotate(-90deg);
    transition: 0.2s;
}

.dropdownOptions {
    margin-top: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);

    position: absolute;
    background: white;
    width: inherit;
    z-index: 1;
}

.dropdownOptions div {
    width: 100%;
    padding-block: 10px;
    text-align: center;
    border-bottom: 1px solid #CCCCCC5C;
}

.dropdownOptions div:nth-last-child(-n+1) {
    border: none;
}

.dropdownOptions div:hover {
    background: #BCAB4E42;
}

.hidden {
    display: none;
}

.clicked {
    transform: rotate(0deg);
    transition: 0.2s;
}
</style>

