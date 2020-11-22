import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/users',
        name: 'Users',
        component: () =>
            import ('../views/Users.vue')
    },
    {
        path: '/shops',
        name: 'Shops',
        component: () =>
            import ('../views/Shops.vue')
    },
    {
        path: '/wastes',
        name: 'Wastes',
        component: () =>
            import ('../views/Wastes.vue')
    },
    {
        path: '/reports',
        name: 'Reports',
        component: () =>
            import ('../views/Reports.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router