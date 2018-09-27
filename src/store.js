/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuex, VueLocalStorage);

const localStorage = window.localStorage;

export const store = new Vuex.Store({
    strict: true,
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {
            // id: null,
            // username: "",
            // password: ""
        },
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
            userIsAdmin: true
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
    mutations: {
        SET_MANAGED_OPTION: (state, payload) => {
            console.log(payload);
            state.settings.selectedOption = payload;
        },
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, payload) {
            console.log(payload);
            state.status = 'success';
            state.token = payload.token;
            state.user = payload.user;
        },
        AUTH_ERROR(state) {
            console.log('auth error');
            state.status = 'error'
        },
        LOGOUT(state) {
            state.status = '';
            state.token = ''
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            console.log(payload);
            context.commit("SET_MANAGED_OPTION", payload);
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                var settings = {
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
                    "data": JSON.stringify(user)
                };

                //const userName = user;

                $.ajax(settings).then(function (resp) {
                    console.log(resp);
                    const token = resp;

                    //saving token in local storage (user can leave app and not have to login again as long as in time that token is valid)
                    localStorage.setItem('token', token);
                    //axios.defaults.headers.common['Authorization'] = token;
                    // $http.defaults.headers.post['X-CSRF-TOKEN'] = response.headers("X-CSRF-TOKEN");
                    // $http.defaults.headers.put['X-CSRF-TOKEN'] = response.headers("X-CSRF-TOKEN");
                    //attempt to set subsequent ajax calls with token header
                    $.ajaxSetup({
                        beforeSend: function (xhr)
                        {
                            xhr.setRequestHeader("Authorization",token);
                        }
                    });
                    console.log(user);
                    let payload = {
                        token: token,
                        user: user
                    };
                    commit('AUTH_SUCCESS', payload);
                    resolve(resp)
                }).catch(err => {
                    commit('AUTH_ERROR');
                    localStorage.removeItem('token');
                    reject(err)
                })

                // axios({
                //     url: "https://parks-and-rec-app.herokuapp.com/parksrec/services/v1/login",
                //     data: JSON.stringify(user),
                //     withCredentials: true,
                //     method: 'POST'
                // })
                //     .then(resp => {
                //         console.log(resp);
                //         const token = resp.data.token;
                //         const user = resp.data.user;
                //         console.log('logged in here is token: ', token, user, resp);
                //         //saving token in local storage (user can leave app and not have to login again as long as in time that token is valid)
                //         localStorage.setItem('token', token);
                //         axios.defaults.headers.common['Authorization'] = token;
                //         commit('AUTH_SUCCESS', token, user);
                //         resolve(resp)
                //     })
                //     .catch(err => {
                //         commit('AUTH_ERROR');
                //         localStorage.removeItem('token');
                //         reject(err)
                //     })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request');
                axios({
                    url: "https://parks-and-rec-app.herokuapp.com/parksrec/services/v1/login",
                    data: user,
                    method: 'POST'
                })
                    .then(resp => {
                        const token = resp.data.token;
                        const user = resp.data.user;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit('AUTH_SUCCESS', token, user);
                        resolve(resp)
                    })
                    .catch(err => {
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
                delete axios.defaults.headers.common['Authorization'];
                resolve()
            })
        }
    }


});
