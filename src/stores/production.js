import { defineStore } from 'pinia'

export const useProductionStore = defineStore('production', {
    state: () => {
        return {
            links: [
                {
                    to: "/produccio/temporada",
                    name: "Temporada",
                    isClicked: true,
                },
                {
                    to: "/produccio/torro",
                    name: "Torro",
                    isClicked: false,
                }
            ]
        }
    },
    actions: {
        setLink(i) {
            this.links.map((x) => x.isClicked = false)
            this.links[i].isClicked = true;
        },
    },
    persist: true,
})
