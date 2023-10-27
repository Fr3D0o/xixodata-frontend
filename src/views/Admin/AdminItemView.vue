<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAll, remove, edit, add } from '@/api/item.js'
import { getAll as getAllTemporades } from '@/api/temporada.js'
import { getAll as getAllTorrons } from '@/api/torro.js'
import { getAll as getAllFormats } from '@/api/format.js'

const items = reactive({})
const temporades = reactive({})
const torrons = reactive({})
const formats = reactive({})

const form = ref({
    nom: null,
    barres: null,
    temporada: null,
    torro: null,
    format: null
})


const editing = ref(false)
const editingId = ref(null)

const dropdown = ref({})
const dropdown1 = ref({})
const outside = ref({})
const outside1 = ref({})

async function fetch() {
    items.value = await getAll()
    temporades.value = await getAllTemporades()
    torrons.value = await getAllTorrons()
    formats.value = await getAllFormats()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value.barres = null

            items.value = await getAll()
        })
    }
}


function editForm(id) {
    const item = items.value.find((element) => element.id == id);
    editingId.value = item.id

    form.value = {
        nom: item.nom,
        barres: item.barres,
        temporada: item.temporada,
        torro: item.torro,
        format: item.format
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        barres: null
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        items.value = await getAll()
    })

    form.value = {
        nom: null,
        barres: null,
        temporada: null,
        torro: null,
        format: null
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        items.value = await getAll()
    })
}

function popup(i) {
    dropdown.value[i].classList.toggle('hide')
    outside.value[i].classList.toggle('hide')
}

function popup1(i) {
    dropdown1.value[i].classList.toggle('hide')
    outside1.value[i].classList.toggle('hide')
}

onMounted(() => fetch())
</script>

<template>
    <div class="adminItemWrapper">
        <table>
            <tr>
                <th>Nom</th>
                <th>Barres</th>
                <th>Temporada</th>
                <th>Torro</th>
                <th>Format</th>
            </tr>
            <tr v-for="(items, i) in items.value">
                <td>{{ items.nom }}</td>
                <td>{{ items.barres }}</td>
                <td>{{ items.temporada.id }}</td>
                <td>{{ items.torro.id }}</td>
                <td>{{ items.format.id }}</td>
                <!-- <td v-if="items.temporada == null">ingredients: </td> -->
                <!-- <td v-if="items.torro != null"> -->
                <!--     <div @click="popup(i)"> ingredients: {{ items.ingredients.length }} </div> -->
                <!--     <div class="hide outside" ref="outside" @click="popup(i)"></div> -->
                <!--     <table class="hide popup" ref="dropdown"> -->
                <!--         <tr> -->
                <!--             <th>Nom</th> -->
                <!--             <th>Pes</th> -->
                <!--             <th>Merme</th> -->
                <!--             <th>Pes real</th> -->
                <!--         </tr> -->
                <!--         <tr v-for="ingredient in items.ingredients"> -->
                <!--             <td>{{ ingredient.nom }}</td> -->
                <!--             <td>{{ ingredient.pes }}</td> -->
                <!--             <td>{{ ingredient.merme }}</td> -->
                <!--             <td>{{ ingredient.pesReal }}</td> -->
                <!--             <td>edit</td> -->
                <!--             <td>delete</td> -->
                <!--         </tr> -->
                <!--     </table> -->
                <!-- </td> -->

                <!-- <td v-if="items.formats == null">formats: 0</td> -->
                <!-- <td v-if="items.formats != null"> -->
                <!--     <div @click="popup1(i)"> formats: {{ items.formats.length }} </div> -->
                <!--     <div class="hide outside" ref="outside1" @click="popup1(i)"></div> -->
                <!--     <table class="hide popup" ref="dropdown1"> -->
                <!--         <tr> -->
                <!--             <th>Pes</th> -->
                <!--             <th>Pes per caixo</th> -->
                <!--             <th>Barres per caixa tallat</th> -->
                <!--             <th>Barres per caixo</th> -->
                <!--         </tr> -->
                <!--         <tr v-for="formats in items.formats"> -->
                <!--             <td>{{ formats.pes }}</td> -->
                <!--             <td>{{ formats.pesXcaixo }}</td> -->
                <!--             <td>{{ formats.barresXcaixaTallat }}</td> -->
                <!--             <td>{{ formats.barresXcaixo }}</td> -->
                <!--             <td>edit</td> -->
                <!--             <td>delete</td> -->
                <!--         </tr> -->
                <!--     </table> -->
                <!-- </td> -->
                <td @click="editForm(items.id)">edita</td>
                <td @click="del(items.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Nom</label>
                <input v-model="form.nom" type="text">
            </div>

            <div class="field">
                <label>Barres</label>
                <input v-model="form.barres" type="number">
            </div>

            <div class="field">
                <label>Temporada</label>

                <select v-model="form.temporada">
                    <option v-for="temporada of temporades.value" :value="temporada.id">{{ temporada.any }} </option>
                </select>
            </div>

            <div class="field">
                <label>Torro</label>

                <select v-model="form.torro">
                    <option v-for="torrons of torrons.value" :value="torrons.id">{{ torrons.nom }} </option>
                </select>
            </div>

            <div class="field">
                <label>Format</label>

                <select v-model="form.format">
                    <option v-for="formats of formats.value" :value="formats.id">{{ formats.nom }} </option>
                </select>
            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminItemWrapper {
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
