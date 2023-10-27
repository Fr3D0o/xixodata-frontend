<script setup>
import { ref, onBeforeMount } from 'vue'
import DropdownComponent from '@/components/dropdownComponent.vue'
import { getAll } from '@/api/temporada.js'
import { getAll as getAllTorrons } from '@/api/torro.js'
import { getAll as getAllFormats } from '@/api/format.js'
import { edit, remove } from '@/api/item.js'


const temporades = ref(null)
const temporada = ref(null)
const titles = ['Nom', 'Barres', 'Torro', 'Format']

const torrons = ref(null)
const formats = ref(null)

const items = ref([])
const itemsSorted = ref([])
let sortCount = 0

const carets = ref({})
const settings = ref({})

const editing = ref(false)
const editingRow = ref(null)

const editingForm = ref({
    nom: null,
    barres: 0,
    torro: null,
    format: null
})

const deleting = ref(false)
const deletingRow = ref(null)

const currentDropdown = ref(null)

async function fetchData() {
    await getAll().then(function (value) {
        temporades.value = value
        temporada.value = value[0]
        setSeason(0)
    })
    await getAllTorrons().then(function (value) {
        torrons.value = value
    })
    await getAllFormats().then(function (value) {
        formats.value = value
    })
}

function setSeason(i) {
    if (!editing.value) {
        items.value = []
        temporades.value[i].items.forEach((elem) => {
            let newItem = {
                nom: elem.nom,
                barres: elem.barres,
                torro: { "id": elem.torro.id, "nom": elem.torro.nom },
                format: { "id": elem.format.id, "nom": elem.format.nom },
                id: elem.id
            }

            items.value.push(newItem)
            itemsSorted.value = [...items.value].sort()
        })

        temporada.value = temporades.value[i]
    }
}

function toggleSetting(i, elem) {
    if (!editing.value && !deleting.value) {
        settings.value[i].classList.remove('hidden')
        document.addEventListener('click', function (e) {
            if (e.target != elem.target && e.target != null) {
                settings.value[i].classList.add('hidden')
            }
        })
    }
}

let lastSort = 0
function sort(i) {
    if (!editing.value && !deleting.value) {

        if (lastSort != i) {
            sortCount = 0
            for (let y = 0; y < carets.value.length; y++) {
                carets.value[y].children[0].classList.remove('sorted')
                carets.value[y].children[1].classList.remove('sorted')
            }
        }
        lastSort = i

        let string = Object.keys(items.value[0])[i];

        function compare(a, b) {
            if (a[string] < b[string]) {
                return -1;
            }
            if (a[string] > b[string]) {
                return 1;
            }
            return 0;
        }

        switch (sortCount) {
            case 0:
                itemsSorted.value = [...items.value].sort(compare);
                carets.value[i].children[1].classList.add('sorted')
                sortCount = 1
                break
            case 1:
                itemsSorted.value = [...items.value].sort(compare).reverse();
                carets.value[i].children[1].classList.remove('sorted')
                carets.value[i].children[0].classList.add('sorted')
                sortCount = 2
                break
            case 2:
                itemsSorted.value = items.value
                carets.value[i].children[1].classList.remove('sorted')
                carets.value[i].children[0].classList.remove('sorted')
                sortCount = 0
                break
        }
    }
}

function editMode(i) {
    editingRow.value = i
    editing.value = true
    editingForm.value.nom = itemsSorted.value[i].nom
    editingForm.value.barres = itemsSorted.value[i].barres
    editingForm.value.torro = itemsSorted.value[i].torro
    editingForm.value.format = itemsSorted.value[i].format
}

async function editConfirm(i, id) {
    let values = {
        nom: editingForm.value.nom,
        barres: editingForm.value.barres,
        torro: editingForm.value.torro.id,
        format: editingForm.value.format.id
    }

    await edit(values, id).then(function (value) {
        itemsSorted.value[i].nom = value.nom
        itemsSorted.value[i].barres = value.barres
        itemsSorted.value[i].torro = value.torro
        itemsSorted.value[i].format = value.format
    })

    editingRow.value = null
    editing.value = false
}

function editCancel() {
    editingRow.value = null
    editing.value = false
}

function deleteMode(i) {
    deletingRow.value = i
    deleting.value = true
}

function deleteConfirm(i, id) {
    itemsSorted.value.splice(i, 1)
    remove(id)
    deletingRow.value = null
    deleting.value = false
}

function deleteCancel() {
    deletingRow.value = null
    deleting.value = false
}

function toggleDropdown(e) {
    let elem = e.target
    elem.parentElement.children[1].classList.toggle("hidden")
    currentDropdown.value = elem
    document.addEventListener("click", hideDropdown)
}

function hideDropdown(e) {
    if (e.target != currentDropdown.value) {
        currentDropdown.value.parentElement.children[1].classList.add("hidden")
        document.removeEventListener("click", hideDropdown)
    }
}

onBeforeMount(() => fetchData())
</script>

<template>
    <div class="productionSeasonWrapper">
        <DropdownComponent :data="temporades" :title="temporada?.any.toString()" @set-current="setSeason"
            :lock="editing || deleting" />
        <div class="table">
            <div class="tr">
                <div class="th" v-for="(title, i) in titles" @click="sort(i)">
                    <p>{{ title }}</p>
                    <div ref="carets">
                        <font-awesome-icon class="top-caret" icon="fa-solid fa-caret-down" />
                        <font-awesome-icon icon="fa-solid fa-caret-down" />
                    </div>
                </div>
                <div class="th settings">
                </div>
            </div>
            <div class="tr" v-for="(item, i) in itemsSorted">
                <div class="td">
                    <p v-if="editingRow != i">{{ item.nom }}</p>
                    <input v-if="editing && editingRow == i" v-model="editingForm.nom"
                        @keydown.enter="editConfirm(i, item.id)">
                </div>
                <div class="td">
                    <p v-if="editingRow != i">{{ item.barres }}</p>
                    <input v-if="editing && editingRow == i" v-model.number="editingForm.barres" step="1" min="0"
                        @keydown.enter="editConfirm(i, item.id)">
                </div>
                <div class="td">
                    <p v-if="editingRow != i">{{ item.torro.nom }}</p>

                    <div class="inputDropdownWrapper" v-if="editingRow == i">
                        <div class="inputDropdown" @click="toggleDropdown">
                            {{ editingForm.torro.nom }}
                        </div>
                        <div class="dropdownOptionsWrapper hidden">
                            <div class="dropdownOption" v-for="torro in torrons" @click="editingForm.torro = torro">{{
                                torro.nom }}</div>
                        </div>
                    </div>
                </div>
                <div class="td">
                    <p v-if="editingRow != i">{{ item.format.nom }}</p>

                    <div class="inputDropdownWrapper" v-if="editingRow == i">
                        <div class="inputDropdown" @click="toggleDropdown">
                            {{ editingForm.format.nom }}
                        </div>
                        <div class="dropdownOptionsWrapper hidden">
                            <div class="dropdownOption" v-for="format in formats" @click="editingForm.format = format">{{
                                format.nom }}</div>
                        </div>
                    </div>
                </div>
                <div class="td settings" @click="toggleSetting(i, $event)">
                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                </div>
                <div class="settingsDropdown hidden" ref="settings">
                    <font-awesome-icon class="edit" icon="fa-solid fa-pen" @click="editMode(i)" />
                    <font-awesome-icon class="delete" icon="fa-solid fa-trash" @click="deleteMode(i)" />
                </div>
                <div v-if="editing && editingRow == i" class="settingsDropdown" ref="settings">
                    <font-awesome-icon class="ok" icon="fa-solid fa-check" @click="editConfirm(i, item.id)" />
                    <font-awesome-icon class="delete" icon="fa-solid fa-xmark" @click="editCancel" />
                </div>
                <div v-if="deleting && deletingRow == i" class="settingsDropdown" ref="settings">
                    <font-awesome-icon class="ok" icon="fa-solid fa-check" @click="deleteConfirm(i, item.id)" />
                    <font-awesome-icon class="delete" icon="fa-solid fa-xmark" @click="deleteCancel" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.productionSeasonWrapper {
    height: 100%;
    width: 100%;
    padding: 30px;
}

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
    cursor: pointer;
}

.th div {
    display: flex;
    flex-direction: column;
    pointer-events: none;
}

.th p {
    margin: 0px;
    user-select: none;
    pointer-events: none;
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
    aspect-ratio: 1/1;
    border-radius: 5px;
    cursor: pointer;
    background: #CCCCCCAB;
    padding: 10px;
}

.expand-icon {
    scale: 1.5;
}

.expand-iconWrapper:hover {
    background: #BCAB4E42;
}

svg {
    pointer-events: none;
}

.sorted {
    color: #BCAB4E;
}

.settings {
    width: 15px;
    cursor: pointer;
}

.settings svg {
    opacity: 0;
    scale: 1.3;
    pointer-events: none;
    color: #6f6f6f;
}

.settings svg path {
    pointer-events: none;
}

.tr:hover>.settings svg {
    opacity: 1;
}

.settingsDropdown {
    position: absolute;
    margin-left: 50px;
    height: inherit;
    width: 85px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    left: 1105px;
    scale: 1.2;
    gap: 10px;
    align-self: center;
}

.hidden {
    display: none !important;
}

.settingsDropdown svg {
    opacity: 1;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .2);
    cursor: pointer;
}

.edit {
    background: #babaff;
    color: #5050ff !important;
    pointer-events: unset;
    transition: 0.1s;
}

.delete {
    background: #ffaeae;
    color: #ff4040 !important;
    pointer-events: unset;
    transition: 0.1s;
}

.edit:hover {
    scale: 1.205;
    filter: brightness(106%);
    transition: 0.1s;
}

.delete:hover {
    transition: 0.1s;
    scale: 1.205;
    filter: brightness(106%)
}

.td input {
    box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, .2);
    border: none;
    padding: 10px;
    padding-block: 7px;
    border-radius: 5px;
    font-size: 15px;
    margin-inline: -10px;
}

.ok {
    background: #b0f2c7;
    color: #36dd28 !important;
    pointer-events: unset;
    transition: 0.1s;
}

.ok:hover {
    scale: 1.205;
    filter: brightness(106%);
    transition: 0.1s;
}

.inputDropdownWrapper {
    width: 100%;
    height: 100%;
}

.inputDropdown {
    height: 100%;
    width: inherit;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 10px;
    box-sizing: border-box;
}

.inputDropdown:hover {
    background: #cccccc2e;
}

.dropdownOptionsWrapper {
    margin-top: 5px;
    background: white;
    position: absolute;
    width: 200px;
    height: fit-content;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    padding-bottom: 3px;
}

.dropdownOption {
    padding: 5px 8px;
    background: gray;
    margin: 3px;
    border-radius: 5px;
    margin-bottom: 0;
    background: #cccccc4d;
    cursor: pointer;
}

.dropdownOption:hover {
    background: #ccccccb8;
}
</style>



