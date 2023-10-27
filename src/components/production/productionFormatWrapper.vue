<script setup>
let props = defineProps({
    title: String,
})

</script>


<template>
    <div class="tableWrapper">
        <div class="tableWrapperTitle">
            <div>{{ title }}</div>
            <font-awesome-icon icon="fa-solid fa-pen" />
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
    gap: 5px;
    place-items: center;
    user-select: none;
}

.tableWrapperTitle svg {
    scale: 0.8;
    opacity: 0;
    cursor: pointer;
}

.tableWrapperTitle:hover>svg {
    opacity: 0.6;
}
</style>
