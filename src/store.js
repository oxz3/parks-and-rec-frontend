/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import router from './router'
import adminLogonRequest from './data/rest-requests/admin-logon-request.json'
import registerUserRequest from './data/rest-requests/register-new-user-request.json'
import updateUserRequest from './data/rest-requests/update-user-request.json'
import getUserRequest from './data/rest-requests/get-user-request.json'


Vue.use(Vuex);

const localStorage = window.localStorage;
let token = null;


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
            newRegisteredUser: "",
            updatedUser: "",
            registerUser: false,
            editUser: false,
            token: localStorage.getItem('token') || null
        },
        error: undefined
    },
    getters: {
        isLoggedIn: state => !!state.settings.token,
    },
    mutations: {
        //Whether Sports or Leagues (users next?) are selected in the settings panel
        SET_MANAGED_OPTION: (state, payload) => {
            state.settings.selectedOption = payload;
        },
        SET_SETTING_INFO: (state, payload) => {
            state.settings.info.selected = payload;
        },
        EDIT_USER: (state, payload) => {
            state.settings.user = payload;
            state.settings.editUser = true;
            router.push('/logon')
        },
        REGISTER(state) {
            state.settings.registerUser = true;
        },
        //Set status to
        AUTH_REQUEST(state, payload) {
            state.status = payload;
        },
        //After successful logon
        AUTH_SUCCESS(state, payload) {
            state.settings.token = payload.token;
            state.status = 'logonSuccess';
            state.settings.user = payload.user;
        },
        REGISTRATION_SUCCESS(state, payload) {
            state.settings.newRegisteredUser = payload.username;
            state.settings.registerUser = false;
            state.status = 'registrationSuccess';
        },
        UPDATE_USER_SUCCESS(state, payload) {
            state.settings.updatedUser = payload.username;
            state.settings.editUser = false;
            state.status = 'updateUserSuccess';
        },
        AUTH_ERROR(state, error) {
            console.warn('auth error', error);
            state.status = 'error';
            state.error = error;
        },
        LOGOUT(state) {
            state.status = "logged off";
            state.settings.user = {};
            state.settings.editUser = false;
            state.settings.token = null
        },
        CANCEL_LOGON_FORM(state) {
            state.settings.editUser = false;
            state.settings.registerUser = false;
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            context.commit("SET_MANAGED_OPTION", payload);
        },
        setSettingInfo: (context, payload) => {
            context.commit("SET_SETTING_INFO", payload);
        },
        editUser: (context, payload) => {
            context.commit("EDIT_USER", payload);
        },
        openRegisterForm: (context) => {
            context.commit("REGISTER");
        },
        cancelLogonForm: (context) => {
            context.commit("CANCEL_LOGON_FORM")
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST', 'logging in');
                let loginSettings = Object.assign({}, adminLogonRequest);
                loginSettings.data = JSON.stringify(user);

                $.ajax(loginSettings).then(function (resp) {
                    token = resp;
                    if (token.length > 1) {
                        //saving token in local storage (user can leave app and not have to login again as long as in time that token is valid)
                        localStorage.setItem('token', token);
                        console.log(localStorage.getItem('token'));
                        let payload = {
                            token: token,
                            user: user
                        };
                        commit('AUTH_SUCCESS', payload);
                        resolve(resp)
                    }
                    else {
                        commit('AUTH_ERROR', "Invalid Admin User or Password Entered!");
                        localStorage.removeItem('token');
                    }
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
                commit('AUTH_REQUEST', 'registeringUser');

                //const userName = user;
                let registerSettings = Object.assign({}, registerUserRequest);
                console.log(localStorage.getItem('token'));
                registerSettings.headers.token = localStorage.getItem('token');
                registerSettings.data = JSON.stringify(user);

                $.ajax(registerSettings).then(function (resp) {
                    let user = resp;
                    commit('REGISTRATION_SUCCESS', user);
                    resolve(resp)
                }).catch(err => {
                    commit('AUTH_ERROR', err);
                    localStorage.removeItem('token');
                    reject(err)
                })
            })
        },
        getUser({commit}, user) {
            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST', 'gettingUser');

                let getUserSettings = Object.assign({}, getUserRequest);
                getUserSettings.headers.token = localStorage.getItem('token');
                let url = getUserSettings.url.substr(0, getUserSettings.url.lastIndexOf("=") + 1);
                getUserSettings.url = url + user;

                $.ajax(getUserSettings).then(function (response) {
                    resolve(response);
                }).catch(err => {
                    commit('AUTH_ERROR', err);
                    reject(err)
                })
            })
        },
        updateUser({commit}, user) {
            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST', 'updatingUser');

                let updateUserSettings = Object.assign({}, updateUserRequest);
                updateUserSettings.headers.token = localStorage.getItem('token');
                updateUserSettings.data = JSON.stringify(user);

                $.ajax(updateUserSettings).then(function (resp) {
                    console.log('resp from server: ', resp);
                    commit('UPDATE_USER_SUCCESS', resp);
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
                console.log('logged out token removed: ', localStorage.getItem('token'));
                resolve()
            })
        }
    }


});
