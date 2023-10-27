<script setup>
import { ref, onMounted } from 'vue'

defineEmits(['update:title'], ['create'])

const input = ref({})

onMounted(() => input.value.focus())
</script>


<template>
    <div class="tableWrapper">
        <div class="tableWrapperTitle">
            <input ref="input" @input="$emit('update:title', $event.target.value)">
            <div class="settings">
                <font-awesome-icon class="ok" icon="fa-solid fa-floppy-disk" @click="$emit('create'), $emit('saving')" />
                <font-awesome-icon class="cancel" icon="fa-solid fa-trash" @click="$emit('cancel-add')" />
            </div>
        </div>
        <slot />
    </div>
</template>


<style scoped>
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
