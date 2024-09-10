import './assets/fonts/fonts.css';
import './assets/colors.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
