import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
loadFonts();

app.mount('#app');
