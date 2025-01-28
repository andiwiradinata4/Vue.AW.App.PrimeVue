// import './assets/main.css'
import './assets/tailwind.css';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from '@/app/router/index.ts'
import { useAuthStore } from '@/app/stores/auth.store.ts';
import '@/app/services/axios.service.ts';
import 'primeicons/primeicons.css';
import Ripple from 'primevue/ripple';

const app = createApp(App);
const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            light: {
                50: '{sky.50}',
                100: '{sky.100}',
                200: '{sky.200}',
                300: '{sky.300}',
                400: '{sky.400}',
                500: '{sky.500}',
                600: '{sky.600}',
                700: '{sky.700}',
                800: '{sky.800}',
                900: '{sky.900}',
                950: '{sky.950}'
            },
            dark: {
                50: '{zinc.50}',
                100: '{zinc.100}',
                200: '{zinc.200}',
                300: '{zinc.300}',
                400: '{zinc.400}',
                500: '{zinc.500}',
                600: '{zinc.600}',
                700: '{zinc.700}',
                800: '{zinc.800}',
                900: '{zinc.900}',
                950: '{zinc.950}'
            }
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{sky.600}',
                    inverseColor: '#ffffff',
                    hoverColor: '{sky.500}',
                    activeColor: '{sky.400}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                },
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                },
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            }
        },
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    },
    components: {

    }
});

app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Noir,
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
