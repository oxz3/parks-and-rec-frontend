/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex);

const localStorage = window.localStorage;
let token = '';

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://parks-and-rec-app.herokuapp.com/parksrec/services/v1/login",
    "method": "POST",
    "headers": {
        "cache-control": "no-cache",
        "content-type": "application/json",
        "authorization": "Basic QWRtaW46QWRtaW4="
    },
    "processData": false,
    "data": ""
};

export const store = new Vuex.Store({
    strict: true,
    state: {
        //indicates the status of user logon
        status: "",
        activities: [
            {name: 'Soccer', description: "kick the ball", price: 20},
            {name: 'Football', description: "score touchdowns", price: 20},
            {name: 'Basketball', description: 'shoot the ball', price: 30}
        ],
        leagues: [
            {name: 'Soccer', description: "Fall Soccer League", maxMembers: 20, currentMembers: 18},
            {name: 'Football', description: "Fall Football League", maxMembers: 50, currentMembers: 0},
            {name: 'Basketball', description: "Fall Basketball League", maxMembers: 30, currentMembers: 25}
        ],
        settings: {
            options: [
                "activities",
                "leagues"
            ],
            selectedOption: "activities",
            userIsAdmin: true,
            user: {},
            token:  localStorage.getItem('token') || ''
        }
    },
    getters: {
        isLoggedIn: state => !!state.settings.token,
    },
    mutations: {
        //Whether Sports or Leagues (users next?) are selected in the settings panel
        SET_MANAGED_OPTION: (state, payload) => {
            console.log(payload);
            state.settings.selectedOption = payload;
        },
        //Set status to
        AUTH_REQUEST(state, payload) {
            state.status = payload;
        },
        //After successful logon
        AUTH_SUCCESS(state, payload) {
            console.log(payload);
            state.status = 'successful logon';
            state.settings.token = payload.token;
            state.settings.user = payload.user;
        },
        AUTH_ERROR(state, error) {
            console.log('auth error', error);
            state.status = 'error'
        },
        LOGOUT(state) {
            state.status = "logged off";
            state.settings.token = ""
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            console.log(payload);
            context.commit("SET_MANAGED_OPTION", payload);
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST', 'logging in');
                let loginSettings = settings;
                loginSettings.data = JSON.stringify(user);

                $.ajax(loginSettings).then(function (resp) {
                    console.log(resp);
                    token = resp;

                    //saving token in local storage (user can leave app and not have to login again as long as in time that token is valid)
                    localStorage.setItem('token', token);
                    console.log(localStorage.getItem('token'));
                    console.log(user);
                    let payload = {
                        token: token,
                        user: user
                    };
                    commit('AUTH_SUCCESS', payload);
                    resolve(resp)
                }).catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem('token');
                    reject(err)
                })
            })
        },
        register({commit}, user) {

            console.log('registering new user: ', user);
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST', 'registering user');

                //const userName = user;
                let registerSettings = settings;
                registerSettings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://parks-and-rec-app.herokuapp.com/parksrec/services/v1/createUser",
                    "method": "POST",
                    "headers": {
                        "cache-control": "no-cache",
                        "content-type": "application/json",
                        "token": "546ce251-9009-445c-a69b-dd4c69b91aaf",
                        "postman-token": "0437f360-4dc7-3162-ab64-87c4b9c0d26f"
                    },
                    "processData": false,
                    "data": "{\n  \"id\": null,\n  \"username\": \"TestUserEJG6\",\n  \"password\": \"password\",\n   \"roles\": [\n      {\n           \"id\": null,\n          \"role_id\": 1,\n          \"user_id\":null\n\n      },\n      {\n          \"id\": null,\n          \"role_id\": 2,\n          \"user_id\":null\n      }\n  ]}"
                };

                console.log(localStorage.getItem('token'));
                registerSettings.headers.token = localStorage.getItem('token');
                console.log(registerSettings);
                registerSettings.data = JSON.stringify(user);

                $.ajax(registerSettings).then(function (resp) {
                    console.log(resp);
                    const token = resp;

                    //saving token in local storage (user can leave app and not have to login again as long as in time that token is valid)
                    localStorage.setItem('token', token);

                    console.log(user);
                    let payload = {
                        token: token,
                        user: user
                    };
                    commit('AUTH_SUCCESS', payload);
                    resolve(resp)
                }).catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem('token');
                    reject(err)
                })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('LOGOUT');
                localStorage.removeItem('token');
                console.log(localStorage.getItem('token'));
                resolve()
            })
        }
    }


});
