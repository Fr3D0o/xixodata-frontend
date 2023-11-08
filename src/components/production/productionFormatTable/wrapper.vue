<script setup>
import { ref } from 'vue'

let props = defineProps({
    title: String,
    id: Number
})

const settings = ref(false)
const settingsElem = ref({})
const removeButton = ref({})
const editButton = ref({})

function toggleSettings() {
    if (settings.value) {
        settings.value = false
        document.removeEventListener('click', hideDropdown)
    } else {
        settings.value = true
        document.addEventListener('click', hideDropdown)
    }
}

function hideDropdown(e) {
    if (e.target != settingsElem.value && e.target != removeButton.value && e.target != editButton.value) {
        settings.value = false
        document.removeEventListener('click', hideDropdown)
    }
}

const removeAttempt = ref(false)

</script>


<template>
    <div class="tableWrapper">
        <div class="tableWrapperTitle">
            <div class="left">
                <div>{{ title }}</div>
            </div>
            <div class="settings">
                <div class="icon-wrapper">
                    <div class="noclick" @click="toggleSettings" ref="settingsElem">
                        <font-awesome-icon icon="fa-solid fa-ellipsis" class="noclick" />
                    </div>
                    <div class="edit" v-if="settings && !removeAttempt" ref="editButton" @click="$emit('editFormat')">
                        <font-awesome-icon icon="fa-solid fa-pen" />
                    </div>
                    <div class="delete" v-if="settings && !removeAttempt" ref="removeButton" @click="removeAttempt = true">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </div>
                    <div class="ok" v-if="removeAttempt" @click="removeAttempt = false, $emit('deleteFormat')">
                        <font-awesome-icon icon="fa-solid fa-check" />
                    </div>
                    <div class="delete" v-if="removeAttempt" @click="removeAttempt = false">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </div>
                </div>
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
    position: relative;
    display: flex;
    width: 200px;
    place-items: center;
    justify-content: end;
}

.tableWrapperTitle:hover>.settings {
    opacity: 1;
}

.noclick {
    aspect-ratio: 1/1;
    height: 30px;
    cursor: pointer;
}

.noclick svg {
    scale: 1;
    pointer-events: none;
}

.icon-wrapper {
    position: absolute;
    height: 40px;
    display: flex;
    place-items: center;
    gap: 15px;
}

.edit {
    cursor: pointer;
    background: #D1D1FF;
    color: blue;
    border-radius: 5px;
    aspect-ratio: 1/1;
    height: 40px;
    display: flex;
    place-content: center;
    place-items: center;
    transition: 0.5s;
    cursor: pointer;
}

.edit:active {
    scale: 1.3;
    filter: brightness(105%);
    transition: 0.1s;
}

.edit svg {
    scale: 0.8;
    pointer-events: none;
}

.delete {
    cursor: pointer;
    background: #FFD1D1;
    color: red;
    border-radius: 5px;
    aspect-ratio: 1/1;
    height: 40px;
    display: flex;
    place-content: center;
    place-items: center;
    transition: 0.5s;
    cursor: pointer;
}

.delete:active {
    scale: 1.3;
    filter: brightness(105%);
    transition: 0.1s;
}

.delete svg {
    scale: 0.8;
    pointer-events: none;
}

.ok {
    cursor: pointer;
    background: #D1FFD1;
    color: #00FF00;
    border-radius: 5px;
    aspect-ratio: 1/1;
    height: 40px;
    display: flex;
    place-content: center;
    place-items: center;
    transition: 0.5s;
    cursor: pointer;
}

.delete:active {
    scale: 1.3;
    filter: brightness(105%);
    transition: 0.1s;
}

.delete svg {
    scale: 0.8;
    pointer-events: none;
}
</style>
