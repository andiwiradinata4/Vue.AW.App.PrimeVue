// import './assets/main.css'
import './assets/tailwind.css';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from '@/app/router/index.ts'
import { useAuthStore } from '@/app/stores/auth.store.ts';
import '@/app/services/axios.service.ts';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';

const app = createApp(App)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    },
    ripple: true
});
app.use(createPinia())
app.use(router)
app.directive('ripple', Ripple);
const authStore = useAuthStore();
authStore.loadTokens();
app.mount('#app')
