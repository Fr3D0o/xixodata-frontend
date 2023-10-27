<script setup>
import { ref, onMounted } from 'vue'
import { getAll } from '@/api/torro.js'

const dropdown = ref(false)

const torrons = ref(null)

const def = ref(null)

async function fetch() {
    torrons.value = await getAll()
    def.value = await torrons.value[0]
}

function select(i) {
    def.value = torrons.value[i]

}

onMounted(() => fetch())

</script>


<template>
    <div class="calculTorroWrapper">

        <div class="dropdown">
            <div v-if="def != null" class="dropdown-select" @click="dropdown = !dropdown">{{ def.nom }}</div>
            <div class="outside" :class="{ 'hide': !dropdown }" @click="dropdown = !dropdown"></div>
            <div class="dropdown-options" :class="{ 'hide': !dropdown }" @click="dropdown = !dropdown">
                <div v-for="(torro, i) in torrons" @click="select(i)">{{ torro.nom }}</div>
            </div>
        </div>


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
            <tr v-if="def != null" v-for="ingredient in def.ingredients">
                <td>{{ ingredient.nom }}</td>
                <td>{{ ingredient.pesCuita }}</td>
                <td>{{ ingredient.mermeCuita }}</td>
                <td>{{ ingredient.pesRealCuita }}</td>
                <td>{{ ingredient.pes }}</td>
                <td>{{ ingredient.merme / 100 * 0.5 }}</td>
                <td>{{ ingredient.pes - (ingredient.merme / 100 * 0.5) }}</td>
            </tr>
        </table>

        <table v-if="def != null">
            <tr v-if="def.formats.length != 0">
                <th>Pes</th>
                <th>Pes per caixo</th>
                <th>Barres per caixa tallat</th>
                <th>Barres per caixo</th>
            </tr>
            <tr v-if="def != null" v-for="formats in def.formats">
                <td>{{ formats.pes }}</td>
                <td>{{ formats.pesXcaixo }}</td>
                <td>{{ formats.barresXcaixaTallat }}</td>
                <td>{{ formats.barresXcaixo }}</td>
            </tr>
        </table>

        <div v-if="def != null">
            <table v-for="format in def.formats">
                <tr>
                    <th>Pes</th>
                    <th>Pes per caixo</th>
                    <th>Barres per caixa tallat</th>
                    <th>Barres per caixo</th>
                </tr>
                <tr v-for="packagins in format.packagings">
                    <td>{{ packagins.nom }}</td>
                    <td>{{ packagins.llarg }}</td>
                    <td>{{ packagins.ample }}</td>
                    <td>{{ packagins.altura }}</td>
                </tr>
            </table>
        </div>

    </div>
</template>


<style scoped>
.dropdown {
    text-align: center;
    position: relative;
    top: 100px;
    left: 108px;
    cursor: pointer;
}

.dropdown-select {
    border: 1px solid black;
    width: 100px;
    padding: 15px;
    border-radius: 3px;
}

.dropdown-options {
    position: fixed;
    margin-top: 5px;
    border: 1px solid black;
    width: 100px;
    border-radius: 3px;
    z-index: 1;
    background-color: white;
}

.dropdown-options div {
    background-color: white;
    border: 1px solid black;
    padding: 15px;
    border-radius: 3px;
    margin: 5px
}

.outside {
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100vh;
    width: 100vw;
}

.hide {
    display: none;
}

table {
    border-spacing: 10px 10px;
    margin: 98px;
    margin-top: 126px;
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
</style>
