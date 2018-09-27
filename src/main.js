import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import {store} from './store'
import Axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false;

//Make Axios the default $http service, configure auth tokens in local storage for all requests
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if(token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.use(Vuetify, VueLocalStorage);

new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app');
