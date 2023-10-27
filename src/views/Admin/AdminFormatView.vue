<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAll, add, edit, remove } from '@/api/format.js'
import { getAll as getAllPackagings } from '@/api/packaging.js'

const formats = reactive({})
const packagings = reactive({})

const form = ref({
    nom: null,
    pes: null,
    pesXcaixo: null,
    barresXcaixaTallat: null,
    barresXcaixo: null,
    packagings: []
})

const dropdown = ref({})
const outside = ref({})

const editing = ref(false)
const editingId = ref(null)

async function fetch() {
    formats.value = await getAll()
    packagings.value = await getAllPackagings()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value = {
                nom: null,
                pes: null,
                pesXcaixo: null,
                barresXcaixaTallat: null,
                barresXcaixo: null
            }

            formats.value = await getAll()
        })
    }
}

function editForm(id) {
    const format = formats.value.find((element) => element.id == id);
    editingId.value = format.id

    form.value = {
        nom: format.nom,
        pes: format.pes,
        pesXcaixo: format.pesXcaixo,
        barresXcaixaTallat: format.barresXcaixaTallat,
        barresXcaixo: format.barresXcaixo
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        nom: null,
        pes: null,
        pesXcaixo: null,
        barresXcaixaTallat: null,
        barresXcaixo: null
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        formats.value = await getAll()
    })

    form.value = {
        nom: null,
        pes: null,
        pesXcaixo: null,
        barresXcaixaTallat: null,
        barresXcaixo: null
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        formats.value = await getAll()
    })
}


function popup(i) {
    dropdown.value[i].classList.toggle('hide')
    outside.value[i].classList.toggle('hide')
}

onMounted(() => fetch())
</script>


<template>
    <div class="adminFormatWrapper">
        <table>
            <tr>
                <th>Nom</th>
                <th>Pes</th>
                <th>Pes per caixo</th>
                <th>Barres per caixa tallat</th>
                <th>Barres per caixo</th>
                <th>Packagings</th>
            </tr>
            <tr v-for="(format, i) in formats.value">
                <td>{{ format.nom }}</td>
                <td>{{ format.pes }}</td>
                <td>{{ format.pesXcaixo }}</td>
                <td>{{ format.barresXcaixaTallat }}</td>
                <td>{{ format.barresXcaixo }}</td>
                <td v-if="format.packagings == null">packagins: 0</td>
                <td v-if="format.packagings != null">
                    <div @click="popup(i)"> packagings: {{ format.packagings.length }} </div>
                    <div class="hide outside" ref="outside" @click="popup(i)"></div>
                    <table class="hide popup" ref="dropdown">
                        <tr>
                            <th>Nom</th>
                            <th>Llarg</th>
                            <th>Ample</th>
                            <th>Altura</th>
                        </tr>
                        <tr v-for="packaging in format.packagings">
                            <td>{{ packaging.nom }}</td>
                            <td>{{ packaging.llarg }}</td>
                            <td>{{ packaging.ample }}</td>
                            <td>{{ packaging.altura }}</td>
                            <td>edit</td>
                            <td>delete</td>
                        </tr>
                    </table>
                </td>
                <td @click="editForm(format.id)">edita</td>
                <td @click="del(format.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Nom</label>
                <input v-model="form.nom" type="text">
            </div>

            <div class="field">
                <label>Pes</label>
                <input v-model="form.pes" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Pes per caixo</label>
                <input v-model="form.pesXcaixo" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Barres per caixa tallat</label>
                <input v-model="form.barresXcaixaTallat" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Barres per caixo</label>
                <input v-model="form.barresXcaixo" type="number" step="1" min="0">
            </div>

            <div class="field">
                <label>Packagings</label>
                <select v-model="form.packagings" name="cars" id="cars" multiple>
                    <option default :value="null">CAP</option>
                    <option v-for="packaging of packagings.value" :value="packaging.id">{{ packaging.nom + " | " +
                        packaging.llarg +
                        " | " + packaging.ample + " | " + packaging.altura }}
                    </option>
                </select>
            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminFormatWrapper {
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
