/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import usersObject from './restHelperObjects/UsersRestObject'


Vue.use(Vuex);


// let token = null;
const localStorage = window.localStorage;

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
            selectedOption: "leagues",
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
        login(context, user) {
            console.log('user in action:', user);
            usersObject.login(context, user);
        },
        register(context, user) {
            usersObject.register(context, user);
        },
        getUser(context, user) {
            return usersObject.getUser(context, user);
        },
        updateUser(context, user) {
            usersObject.updateUser(context, user);
        },
        logout(context) {
            usersObject.logout(context);
        }
    }


});
