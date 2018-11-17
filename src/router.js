import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Logon from './views/Logon.vue'
import Leagues from './views/Leagues.vue'
import Sports from './views/Sports.vue'
import Teams from './views/Teams.vue'

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
            path: '/main',
            name: 'main',
            component: Main,
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
        },
        {
            path: '/sports',
            name: 'sports',
            component: Sports
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/leagues/:id/teams',
            name: 'teams',
            component: Teams
        }
    ]
});

export default router;
