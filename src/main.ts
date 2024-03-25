import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import PageSearch from '@/pages/PageSearch.vue'
import PageView from './pages/PageView.vue'
import PageFavourites from './pages/PageFavourites.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: PageSearch},
        {path: "/amiibo/:id", component: PageView},
        {path: "/favourite", component: PageFavourites}
    ]
})

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
