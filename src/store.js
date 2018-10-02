/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import router from './router'
import adminLogonRequest from './data/rest-requests/admin-logon-request.json'
import registerUserRequest from './data/rest-requests/register-new-user-request.json'

Vue.use(Vuex);

const localStorage = window.localStorage;
let token = '';


export const store = new Vuex.Store({
    strict: true,
    state: {
        //indicates the status of user logon
        status: "",
        sports: [
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
                "sports",
                "leagues"
            ],
            info: {
                "selected": "",
            },
            selectedOption: "sports",
            userIsAdmin: true,
            user: {},
            editUser: false,
            token: localStorage.getItem('token') || ''
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
        SET_SETTING_INFO: (state, payload) => {
            state.settings.info.selected = payload;
        },
        EDIT_USER: (state, payload) => {
            console.log(payload);
            state.settings.user = payload;
            state.settings.editUser = true;
            router.push('/logon')
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
            state.settings.user = {};
            state.settings.editUser = false;
            state.settings.token = ""
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            console.log(payload);
            context.commit("SET_MANAGED_OPTION", payload);
        },
        setSettingInfo: (context, payload) => {
            context.commit("SET_SETTING_INFO", payload);
        },
        editUser: (context, payload) => {
            console.log(payload);
            context.commit("EDIT_USER", payload);
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST', 'logging in');
                let loginSettings = adminLogonRequest;
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
                let registerSettings = registerUserRequest;
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
            return new Promise((resolve) => {
                commit('LOGOUT');
                localStorage.removeItem('token');
                console.log(localStorage.getItem('token'));
                resolve()
            })
        }
    }


});
