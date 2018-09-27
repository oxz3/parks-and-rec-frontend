import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Logon from './views/Logon.vue'
import Secure from './components/SecureLoggedIn.vue'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/logon',
            name: 'logon',
            component: Logon
        },
        {
            path: '/secureLoggedIn',
            name: 'secureLoggedIn',
            component: Secure,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

//Make sure user is authenticated before hitting a route (to control certain pages if need be)
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return
        }
        next('/logon')
    } else {
        next()
    }
});

export default router;
