import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import AdminTemporadaView from '@/views/Admin/AdminTemporadaView.vue'
import AdminTorroView from '@/views/Admin/AdminTorroView.vue'
import AdminItemView from '@/views/Admin/AdminItemView.vue'
import AdminIngredientView from '@/views/Admin/AdminIngredientView.vue'
import AdminFormatView from '@/views/Admin/AdminFormatView.vue'
import AdminPackagingView from '@/views/Admin/AdminPackagingView.vue'

import ComponentTestView from '@/views/ComponentTestView.vue'

import IndexView from '@/views/IndexView.vue'
import HomeView from '@/views/HomeView.vue'

import ProductionView from '@/views/Production/ProductionView.vue'
import ProductionSeasonView from '@/views/Production/ProductionSeasonView.vue'
import ProductionTorroView from '@/views/Production/ProductionTorroView.vue'

import CalculView from '@/views/Calcul/CalculView.vue'
import CalculTorroView from '@/views/Calcul/CalculTorroView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: IndexView,
            redirect: '/inici',
            children: [
                {
                    path: '/test',
                    name: 'Component test',
                    component: ComponentTestView,
                },
                {
                    path: '/inici',
                    name: 'Inici',
                    component: HomeView,
                },
                {
                    path: '/produccio',
                    name: 'Produccio',
                    component: ProductionView,
                    redirect: '/produccio/temporada',
                    children: [
                        {
                            path: '/produccio/temporada',
                            name: 'Temporada',
                            component: ProductionSeasonView,
                        },
                        {
                            path: '/produccio/torro',
                            name: 'Torro',
                            component: ProductionTorroView,
                        }
                    ]
                },
                {
                    path: '/admin',
                    name: 'Admin',
                    component: AdminView,
                    redirect: '/admin/torro',
                    children: [
                        {
                            path: 'temporada',
                            name: 'Temporadaasdas',
                            component: AdminTemporadaView,
                        },
                        {
                            path: 'item',
                            name: 'Items',
                            component: AdminItemView,
                        },
                        {
                            path: 'torro',
                            name: 'Torronsasd',
                            component: AdminTorroView,
                        },
                        {
                            path: 'ingredient',
                            name: 'Ingredients',
                            component: AdminIngredientView,
                        },
                        {
                            path: 'format',
                            name: 'Formats',
                            component: AdminFormatView,
                        },
                        {
                            path: 'packaging',
                            name: 'Packagings',
                            component: AdminPackagingView,
                        },
                    ]
                }
            ]
        },
        {
            path: '/calcul',
            name: 'Calcul',
            component: CalculView,
            redirect: '/calcul/torro',
            children: [
                {
                    path: 'torro',
                    name: 'Calcul torrons',
                    component: CalculTorroView,
                }
            ]
        }
    ]
})

export default router
