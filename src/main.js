import Vue from 'vue'
import App from './App.vue'
import { router } from "./router"
import store from "./store"
import Vuelidate from "vuelidate"
import Axios from 'axios'
import { NavbarPlugin, BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(VueSidebarMenu)
Vue.use(NavbarPlugin)
Vue.use(Vuelidate)
Vue.use(Vuetify)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Axios.defaults.baseURL = "http://192.168.10.71/HelisAppWebAPI/api"

export const eventBus = new Vue();

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router,
    store,
    render: h => h(App),
}).$mount('#app')
