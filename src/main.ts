import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AmiiboSearch from '@/view/AmiiboSearch.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: AmiiboSearch},
        // {path: "/"}
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
