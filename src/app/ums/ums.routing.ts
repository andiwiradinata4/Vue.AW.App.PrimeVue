import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/ums',
        name: 'UMS',
        component: { template: '<router-view />' },
        children: [
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
