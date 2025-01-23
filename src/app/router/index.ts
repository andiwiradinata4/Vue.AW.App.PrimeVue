import { createRouter, createWebHistory } from 'vue-router';
import UmsRouter from '../ums/ums.routing.ts';
import MainLayout from '@/app/base/main/main.layout.vue';
import MainPage from '@/app/base/main/main.page.vue';
import { useAuthStore } from '@/app/stores/auth.store.ts';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Home', // Rute untuk halaman Home
        component: MainPage,
      },
      ...UmsRouter.getRoutes()
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
  // routes: [...routes, ...UmsRouter.getRoutes()],
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });  // jika tidak authorized, redirect ke halaman login
  } else {
    next();  // jika authorized atau tidak butuh authorization, lanjutkan
  }
});

export default router;
