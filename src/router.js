import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Logon from './views/Logon.vue'
import Leagues from './views/Leagues.vue'


Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/logon',
            name: 'logon',
            component: Logon
        },
        {
            path: '/leagues',
            name: 'leagues',
            component: Leagues
        }
    ]
});

export default router;
