import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS

import 'bootstrap'; // Bootstrap JS

const app = createApp(App);
app.use(router);
app.mount('#app');
