import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: 'home',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home.view.vue'),
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/Settings.view.vue'),
        },
        {
            path: '/listening',
            name: 'listening',
            component: () => import('../views/Listening.view.vue'),
        },
        {
            path: '/rhymes',
            name: 'rhymes',
            component: () => import('../views/Rhymes.view.vue'),
        },
    ],
});

export default router;
