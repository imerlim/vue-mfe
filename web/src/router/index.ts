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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
