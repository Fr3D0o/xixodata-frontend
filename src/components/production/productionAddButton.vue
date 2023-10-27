<script setup>
defineProps({
    active: Boolean,
})

</script>


<template>
    <div class="addButton" :class="{ 'disabled': active }">
        <font-awesome-icon icon="fa-solid fa-plus" />
    </div>
</template>


<style scoped>
.addButton {
    height: 32px;
    width: 50px;

    display: flex;

    background: #BCAB4E42;
    border: 4px solid #BCAB4E;
    border-radius: 5px;
    transition: 0.2s;

    cursor: pointer;
}

.addButton svg {
    margin: auto;
    color: #BCAB4E;
    scale: 1.3;
    pointer-events: none;
}

.addButton path {
    pointer-events: none;
}

.addButton:active {
    transition: 0s;
    background: #BCAB4E;
    scale: 1.2;
}

.disabled {
    pointer-events: none;
    filter: grayscale(80%);
}
</style>
