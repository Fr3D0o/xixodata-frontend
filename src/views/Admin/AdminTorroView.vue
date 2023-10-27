<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAll, remove, edit, add } from '@/api/torro.js'
import { getAll as getAllIngredients } from '@/api/ingredient.js'

const torrons = reactive({})
const ingredients = reactive({})

const form = ref({
    nom: null,
    ingredients: []
})

const editing = ref(false)
const editingId = ref(null)

const dropdown = ref({})
const dropdown1 = ref({})
const outside = ref({})
const outside1 = ref({})

async function fetch() {
    torrons.value = await getAll()
    ingredients.value = await getAllIngredients()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value.nom = null

            torrons.value = await getAll()
        })
    }
}


function editForm(id) {
    const torro = torrons.value.find((element) => element.id == id);
    editingId.value = torro.id

    form.value = {
        nom: torro.nom,
        ingredients: torro.ingredients
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        nom: null
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        torrons.value = await getAll()
    })

    form.value = {
        nom: null,
        ingredients: []
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        torrons.value = await getAll()
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
    <div class="adminTorroWrapper">
        <table>
            <tr>
                <th>Nom</th>
                <th>Ingredients</th>
            </tr>
            <tr v-for="(torro, i) in torrons.value">
                <td>{{ torro.nom }}</td>
                <td v-if="torro.ingredients == null">ingredients: 0</td>
                <td v-if="torro.ingredients != null">
                    <div @click="popup(i)"> ingredients: {{ torro.ingredients.length }} </div>
                    <div class="hide outside" ref="outside" @click="popup(i)"></div>
                    <table class="hide popup" ref="dropdown">
                        <tr>
                            <th>Nom</th>
                            <th>Pes</th>
                            <th>Merme</th>
                            <th>Pes real</th>
                        </tr>
                        <tr v-for="ingredient in torro.ingredients">
                            <td>{{ ingredient.nom }}</td>
                            <td>{{ ingredient.pes }}</td>
                            <td>{{ ingredient.merme }}</td>
                            <td>{{ ingredient.pesReal }}</td>
                            <td>edit</td>
                            <td>delete</td>
                        </tr>
                    </table>
                </td>

                <td @click="editForm(torro.id)">edita</td>
                <td @click="del(torro.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Nom</label>
                <input v-model="form.nom" type="text">
            </div>

            <div class="field">
                <label>Ingredients</label>

                <select v-model="form.ingredients" name="cars" id="cars" multiple>
                    <option default :value="null">CAP</option>
                    <option v-for="ingredient of ingredients.value" :value="ingredient.id">{{ ingredient.nom + " | " +
                        ingredient.pes + " | " + ingredient.merme + " | " + ingredient.pesReal }}</option>
                </select>

            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminTorroWrapper {
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
