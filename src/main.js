import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-vue-ui-kit/css/mdb.min.css';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
