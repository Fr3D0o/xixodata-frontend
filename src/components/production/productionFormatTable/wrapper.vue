<script setup>
let props = defineProps({
    title: String,
})

</script>


<template>
    <div class="tableWrapper">
        <div class="tableWrapperTitle">
            <div class="left">
                <div>{{ title }}</div>
                <font-awesome-icon icon="fa-solid fa-pen" />
            </div>
            <font-awesome-icon class="settings" icon="fa-solid fa-ellipsis" />
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

.tableWrapperTitle .left {
    display: flex;
    place-items: center;
    gap: 5px;
}

.tableWrapperTitle .left svg {
    scale: 0.8;
    opacity: 0;
    cursor: pointer;
}

.tableWrapperTitle:hover>.left svg {
    opacity: 0.6;
}

.settings {
    opacity: 0;
    margin-right: 8px;
    scale: 1.3;
    cursor: pointer;
}

.tableWrapperTitle:hover>.settings {
    opacity: 1;
}
</style>
