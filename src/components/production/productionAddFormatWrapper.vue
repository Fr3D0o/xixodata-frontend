<script setup>
import { ref, onMounted } from 'vue'

const input = ref({})

onMounted(() => input.value.focus())
</script>


<template>
    <div class="table-wrapper">
        <div class="table-wrapper-title">
            <input ref="input">
            <div class="icon-wrapper">
                <div class="icon-ok" @click="$emit('confirmAdd')">
                    <font-awesome-icon icon="fa-solid fa-check" />
                </div>
                <div class="icon-cancel" @click="$emit('cancelAdd')">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>


<style scoped>
.table-wrapper {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;

    padding: 20px;

    border-radius: 5px;
    background: white;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, .2);
}

.table-wrapper-title {
    font-size: 20px;
    margin-left: 5px;

    display: flex;
    gap: 5px;
    place-items: center;
    justify-content: space-between;
}

input {
    width: 200px;
    font-size: 20px;
    background: white;
    border: none;
    border-radius: 5px;
    padding: 8px;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, .2);
}

input:focus-visible {
    outline: none;
}

.icon-wrapper {
    display: flex;
    gap: 10px;
}

.icon-wrapper div {
    height: 40px;
    aspect-ratio: 1/1;

    display: flex;
    place-items: center;

    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s;
}

.icon-ok {
    background: #b0f2c7;
    color: #36dd28;
}

.icon-cancel {
    background: #ffaeae;
    color: #ff4040;
}

.icon-wrapper div svg {
    margin: auto;
    pointer-events: none;
}

.icon-wrapper div:hover {
    scale: 1.1;
    filter: brightness(106%);
    transition: 0.1s;
}
</style>

