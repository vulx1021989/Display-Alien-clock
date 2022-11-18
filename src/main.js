import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
// createApp.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
// createApp.use(IconsPlugin)

// import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
