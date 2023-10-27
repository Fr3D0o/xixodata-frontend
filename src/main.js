import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFloppyDisk, faPlus, faXmark, faCheck, faTrash, faPen, faEllipsis, faEye, faCaretDown, faHouseChimney, faChartColumn, faTableList, faGear, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFloppyDisk, faPlus, faXmark, faCheck, faTrash, faPen, faEllipsis, faEye, faHouseChimney, faChartColumn, faTableList, faGear, faCartShopping, faCaretDown)

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
