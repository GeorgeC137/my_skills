import { createRouter, createWebHistory } from 'vue-router'

// Import views 
import About from '../components/About'
import Skills from '../components/Skills'

const routes = [
    {
        path: '/about/:name',
        name: 'About',
        component: About
    },
    {
        path: '/',
        name: 'Skills',
        component: Skills
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router