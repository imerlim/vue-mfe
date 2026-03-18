import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/calculadora-juros-compostos',
        name: 'CalculadoraJurosCompostos',
        component: () => import('../views/CalculadoraJurosCompostos.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue')
    },
    {
        path: '/memory-board',
        name: 'MemoryView',
        component: () => import('@/views/game/MemoryView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
