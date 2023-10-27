<script setup>

</script>


<template>
    <div class="table-title-wrapper">
        <div class="table-title">
            <slot />
        </div>
        <div class="sorter-wrapper">
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
</style>
