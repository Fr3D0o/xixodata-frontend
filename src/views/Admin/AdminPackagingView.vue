<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAll, add, remove, edit } from '@/api/packaging.js'

const packagings = reactive({})

const form = ref({
    nom: null,
    item: null,
    X: null,
    Y: null,
    Z: null,
})

const editing = ref(false)
const editingId = ref(null)

async function fetch() {
    packagings.value = await getAll()
}

async function formSubmit() {
    if (Object.values(form.value).every(x => x !== null && x !== '')) {
        add(form.value).then(async function () {
            form.value = {
                nom: null,
                item: null,
                X: null,
                Y: null,
                Z: null,
            }

            packagings.value = await getAll()
        })
    }
}

function editForm(id) {
    const packaging = packagings.value.find((element) => element.id == id);
    editingId.value = packaging.id

    form.value = {
        nom: packaging.nom,
        item: packaging.item,
        X: packaging.X,
        Y: packaging.Y,
        Z: packaging.Z
    }

    editing.value = true
}

function editCancel() {
    form.value = {
        nom: null,
        item: null,
        X: null,
        Y: null,
        Z: null,
    }

    editing.value = false
}

async function editConfirm() {
    edit(form.value, editingId.value).then(async function () {
        packagings.value = await getAll()
    })

    form.value = {
        nom: null,
        item: null,
        X: null,
        Y: null,
        Z: null,
    }

    editing.value = false
}

async function del(id) {
    remove(id).then(async function () {
        packagings.value = await getAll()
    })
}

onMounted(() => fetch())
</script>


<template>
    <div class="adminPackagingWrapper">
        <table>
            <tr>
                <th>Nom</th>
                <th>Item</th>
                <th>Z</th>
                <th>Y</th>
                <th>Z</th>
            </tr>
            <tr v-for="packaging in packagings.value">
                <td>{{ packaging.nom }}</td>
                <td>{{ packaging.item }}</td>
                <td>{{ packaging.X }}</td>
                <td>{{ packaging.Y }}</td>
                <td>{{ packaging.Z }}</td>
                <td @click="editForm(packaging.id)">edita</td>
                <td @click="del(packaging.id)">elimina</td>
            </tr>
        </table>
        <hr>
        <div>
            <div class="field">
                <label>Nom</label>
                <input v-model="form.nom" type="text">
            </div>

            <div class="field">
                <label>Item</label>
                <select v-model="form.item">
                    <option value="numBarres">numBarres</option>
                    <option value="numCaixes">numCaixes</option>
                </select>
            </div>

            <div class="field">
                <label>X</label>
                <input v-model="form.X" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Y</label>
                <input v-model="form.Y" type="number" step="0.01" min="0">
            </div>

            <div class="field">
                <label>Z</label>
                <input v-model="form.Z" type="number" step="0.01" min="0">
            </div>

            <button v-if="!editing" class="submit" @click="formSubmit()">ok</button>
            <button v-if="editing" class="submit" @click="editCancel()">cancel</button>
            <button v-if="editing" class="submit" @click="editConfirm()">edit</button>
        </div>
    </div>
</template>


<style scoped>
.adminPackagingWrapper {
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
