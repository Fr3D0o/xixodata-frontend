<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getAll, add, edit, remove } from '@/api/ingredient.js'

const ingredients = reactive({})

const form = ref({
    nom: null,
    pesCuita: null,
    mermeCuita: null,
    pesRealCuita: null,
    pes: null,
    merme: null,
    pesReal: null,
})

const editing = ref(false)
const editingId = ref(null)

async function fetch() {
    ingredients.value = await getAll()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value = {
                nom: null,
                pes: null,
                merme: null,
                pesReal: null,
            }

            ingredients.value = await getAll()
        })
    }
}

function editForm(id) {
    const ingredient = ingredients.value.find((element) => element.id == id);
    editingId.value = ingredient.id

    form.value = {
        nom: ingredient.nom,
        pes: ingredient.pes,
        merme: ingredient.merme,
        pesReal: ingredient.pesReal
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        nom: null,
        pes: null,
        merme: null,
        pesReal: null,
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        ingredients.value = await getAll()
    })

    form.value = {
        nom: null,
        pes: null,
        merme: null,
        pesReal: null,
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        ingredients.value = await getAll()
    })
}

onMounted(() => fetch())
</script>


<template>
    <div class="adminIngredientWrapper">
        <table>
            <tr>
                <th>Nom</th>
                <th>Pes cuita</th>
                <th>Merme cuita</th>
                <th>Pes real cuita</th>
                <th>Pes</th>
                <th>Merme</th>
                <th>Pes real</th>
            </tr>
            <tr v-for="ingredient in ingredients.value">
                <td>{{ ingredient.nom }}</td>
                <td>{{ ingredient.pesCuita }}</td>
                <td>{{ ingredient.mermeCuita }}</td>
                <td>{{ ingredient.pesRealCuita }}</td>
                <td>{{ ingredient.pes }}</td>
                <td>{{ ingredient.merme }}</td>
                <td>{{ ingredient.pesReal }}</td>
                <td @click="editForm(ingredient.id)">edita</td>
                <td @click="del(ingredient.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Nom</label>
                <input v-model="form.nom" type="text">
            </div>

            <div class="field">
                <label>Pes cuita</label>
                <input v-model="form.pesCuita" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Merme cuita</label>
                <input v-model="form.mermeCuita" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Pes real cuita</label>
                <input v-model="form.pesRealCuita" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Pes</label>
                <input v-model="form.pes" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Merme</label>

                <select v-model="form.merme">
                    <option :value="true">si</option>
                    <option :value="false">no</option>
                </select>

            </div>

            <div class="field">
                <label>Pes real</label>
                <input v-model="form.pesReal" type="number" step="0.01" min="0">
            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminIngredientWrapper {
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

.field input {
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
</style>
