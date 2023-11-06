import { defineStore } from 'pinia'
import { useProductionStore } from '@/stores/production'


export const useSidebarStore = defineStore('sidebar', {
    state: () => {
        return {
            links: [
                {
                    to: "/",
                    name: "Inici",
                    icon: "fa-solid fa-house-chimney",
                    isClicked: true,
                },
                {
                    to: "/produccio",
                    name: "Produccio",
                    icon: "fa-solid fa-chart-column",
                    isClicked: false,
                },
                {
                    to: "/admin",
                    name: "Llista",
                    icon: "fa-solid fa-table-list",
                    isClicked: false,
                },
                {
                    to: "/test",
                    name: "Administracio",
                    icon: "fa-solid fa-gear",
                    isClicked: false,
                },
                {
                    to: "/",
                    name: "Comandes",
                    icon: "fa-solid fa-cart-shopping",
                    isClicked: false,
                },
            ]
        }
    },
    actions: {
        setLink(i) {
            this.links.map((x) => x.isClicked = false)
            this.links[i].isClicked = true;

            const productionStore = useProductionStore()
            console.log("LOL")
            productionStore.setLink(0)
        },
    },
    persist: true,
})
