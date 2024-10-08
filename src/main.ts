import './assets/fonts/fonts.css';
import './assets/colors.css';
import './assets/variables.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
