<script setup>
defineProps({
    th: Array,
    visible: Boolean,
    data: Array
})

</script>


<template>
    <div class="expand table" :class="{ 'hidden': !visible }">
        <div class="tr">
            <div class="th" v-for="i in th">
                <p>{{ i }}</p>
                <div>
                    <font-awesome-icon class="top-caret" icon="fa-solid fa-caret-down" />
                    <font-awesome-icon icon="fa-solid fa-caret-down" />
                </div>
            </div>
        </div>
        <div class="tr">
            <div class="td" v-for="i in data">
                <p>{{ i }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.table {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    width: fit-content;
    border-radius: 5px;
    overflow: hidden;
}

.tr {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #CCCCCC;
    background: white;
}


.tr:nth-child(odd) {
    background: #cccccc2e;
}

.tr:nth-last-child(-n +1) {
    border: none;
}

.th {
    background: #CCCCCC;
    display: flex;
    align-items: center;
    gap: 10px;
}

.th div {
    display: flex;
    flex-direction: column;
}

.th p {
    margin: 0px;
}

.top-caret {
    transform: rotate(180deg);
    margin-bottom: -8px;
}

.th,
.td {
    padding: 10px;
    padding-inline: 20px;
    width: 200px;
    height: 30px;
    align-items: center;
    display: flex;
}

.expand-iconWrapper {
    height: 40px;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background: #CCCCCCAB;
}

.expand-iconWrapper:hover {
    background: #BCAB4E42;
}

.expand-icon {
    margin: auto;
    scale: 1.4;
}

.expand {
    position: fixed;
    margin-top: 148px !important;
    z-index: 1;
}

.hidden {
    display: none !important;
}
</style>
