<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAll, remove, edit, add } from '@/api/temporada.js'

const temporades = reactive({})

const form = ref({
    any: null
})

const editing = ref(false)
const editingId = ref(null)

const dropdown = ref({})
const outside = ref({})

async function fetch() {
    temporades.value = await getAll()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value.any = null

            temporades.value = await getAll()
        })
    }
}


function editForm(id) {
    const temporada = temporades.value.find((element) => element.id == id);
    editingId.value = temporada.id

    form.value = {
        any: temporada.any
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        any: null
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        temporades.value = await getAll()
    })

    form.value = {
        any: null,
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        temporades.value = await getAll()
    })
}

function popup(i) {
    dropdown.value[i].classList.toggle('hide')
    outside.value[i].classList.toggle('hide')
}

onMounted(() => fetch())
</script>

<template>
    <div class="adminTemporadaWrapper">
        <table>
            <tr>
                <th>Barres</th>
                <th>Items</th>
            </tr>
            <tr v-for="(temporades, i) in temporades.value">
                <td>{{ temporades.any }}</td>
                <td v-if="temporades.items == null">items: 0</td>
                <td v-if="temporades.items != null">
                    <div @click="popup(i)"> items: {{ temporades.items.length }} </div>
                    <div class="hide outside" ref="outside" @click="popup(i)"></div>
                    <table class="hide popup" ref="dropdown">
                        <tr>
                            <th>Nom</th>
                        </tr>
                        <tr v-for="items in temporades.items">
                            <td>{{ items.nom }}</td>
                            <td>edit</td>
                            <td>delete</td>
                        </tr>
                    </table>
                </td>

                <td @click="editForm(temporades.id)">edita</td>
                <td @click="del(temporades.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Any</label>
                <input v-model="form.any" type="number" step="1" min="2023" max="2024">
            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminTemporadaWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    place-items: center;
    justify-content: center;
}

table {
    border-spacing: 10px 10px;
}

tr {
    border-bottom: 1px solid black;
}

td,
th {
    margin: 5px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
}


td:nth-last-child(-n +2) {
    color: blue;
    border: 1px solid blue;
    cursor: pointer;
}

td:nth-last-child(-n +1) {
    color: red;
    border: 1px solid red;
    cursor: pointer;
}

.hide {
    display: none;
}

.popup {
    background: white;
    padding: 10px;
    border: 1px solid black;
    position: absolute;
    margin-left: -11px;
    margin-top: 20px;
    border-radius: 4px;
}

hr {
    height: 300px;
    width: 1px;
    color: black;
    background-color: black;
    border: none;
    margin: 30px;
}

.field {
    display: flex;
    flex-direction: column;
    margin: 10px;
}

.field input,
.field select,
.field option {
    background-color: white;
    padding: 10px;
    font-size: 15px;
    border: 1px solid black;
    border-radius: 3px;
    width: 300px;
}

.submit {
    background: none;
    border: 1px solid blue;
    padding: 10px;
    font-size: 15px;
    border-radius: 3px;
    margin-left: 10px;
    margin-top: 10px;
    color: blue;
    cursor: pointer;
}

.outside {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
}
</style>
