import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import PageSearch from '@/components/PageSearch.vue'
import PageView from './components/PageView.vue'
import PageFavourites from './components/PageFavourites.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: "/", component: PageSearch},
        {path: "/amiibo/:id", component: PageView},
        {path: "/favourite", component: PageFavourites}
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
