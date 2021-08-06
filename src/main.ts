import { createApp } from 'vue';
import App from './App/App.vue';
// import store, { key } from './store';
import { createPinia } from 'pinia';

import 'virtual:windi.css';

createApp(App).use(createPinia()).mount('#app');
