import { createApp } from 'vue';
import App from './App/App.vue';
import store, { key } from './store';

import 'virtual:windi.css';

createApp(App).use(store, key).mount('#app');
