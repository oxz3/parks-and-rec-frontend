import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Logon from './views/Logon.vue'
import Leagues from './views/Leagues.vue'
import Sports from './views/Sports.vue'
import LeaguesList from './views/LeaguesList.vue'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Logon,
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
            path: '/leagueslist',
            name: 'leagueslist',
            component: LeaguesList
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
    ]
});

export default router;
