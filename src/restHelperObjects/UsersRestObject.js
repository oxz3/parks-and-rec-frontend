import $ from 'jquery'
import adminLogonRequest from './rest-requests/admin-logon-request.json'
import registerUserRequest from './rest-requests/users/register-new-user-request.json'
import updateUserRequest from './rest-requests/users/update-user-request.json'
import getUserRequest from './rest-requests/users/get-user-request.json'

let token = null;

/* eslint-disable no-console */
/**
 * Object for Users REST functionality
 */
export default {

    /**
     * Perform user logon via REST api
     * @param store calling object
     * @param user user who logs in
     * @returns {Promise}
     */
    login: function (store, user) {
        return new Promise((resolve, reject) => {
            store.commit('AUTH_REQUEST', 'logging in');
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
                    store.commit('AUTH_SUCCESS', payload);
                    resolve(resp)
                }
                else {
                    store.commit('AUTH_ERROR', "Invalid Admin User or Password Entered!");
                    localStorage.removeItem('token');
                }
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                localStorage.removeItem('token');
                reject(err)
            })
        })
    },

    /**
     * Perform user registration via REST api
     * @param store calling object
     * @param user user who logs in
     * @returns {Promise}
     */
    register: function (store, user) {

        console.log('registering new user: ', user);

        return new Promise((resolve, reject) => {

            let registerSettings = Object.assign({}, registerUserRequest);
            registerSettings.headers.token = localStorage.getItem('token');
            registerSettings.data = JSON.stringify(user);

            $.ajax(registerSettings).then(function (resp) {
                store.commit('REGISTRATION_SUCCESS', resp);
                resolve(resp)
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                localStorage.removeItem('token');
                reject(err)
            })
        })
    },

    /**
     * Perform get user via REST api
     * @param store calling object
     * @param user user who logs in
     * @returns {Promise}
     */
    getUser: function (store, user) {
        return new Promise((resolve, reject) => {

            store.commit('AUTH_REQUEST', 'gettingUser');

            let getUserSettings = Object.assign({}, getUserRequest);
            getUserSettings.headers.token = localStorage.getItem('token');
            let url = getUserSettings.url.substr(0, getUserSettings.url.lastIndexOf("=") + 1);
            getUserSettings.url = url + user;

            $.ajax(getUserSettings).then(function (response) {
                console.log('update result in object:', response);
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    },

    /**
     * Perform user update via REST api
     * @param store calling object
     * @param user user who logs in
     * @returns {Promise}
     */
    updateUser: function (store, user) {
        return new Promise((resolve, reject) => {

            store.commit('AUTH_REQUEST', 'updatingUser');

            let updateUserSettings = Object.assign({}, updateUserRequest);
            updateUserSettings.headers.token = localStorage.getItem('token');
            updateUserSettings.data = JSON.stringify(user);

            $.ajax(updateUserSettings).then(function (resp) {
                store.commit('UPDATE_USER_SUCCESS', resp);
                resolve(resp)
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                localStorage.removeItem('token');
                reject(err)
            })
        })
    },

    /**
     * Logout of application and erase token from local storage
     * @returns {Promise}
     */
    logout: function (store) {
        return new Promise((resolve) => {
            store.commit('LOGOUT');
            localStorage.removeItem('token');
            console.log('logged out token removed: ', localStorage.getItem('token'));
            resolve()
        })
    }
}