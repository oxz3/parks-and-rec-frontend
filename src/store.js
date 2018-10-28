/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import usersObject from './restHelperObjects/objects/UsersRestObject'
import leaguesObject from './restHelperObjects/objects/LeaguesRestObject'
import sportsObject from './restHelperObjects/objects/SportsRestObject'


Vue.use(Vuex);


// let token = null;
const localStorage = window.localStorage;

export const store = new Vuex.Store({
    strict: true,
    state: {
        //indicates the status of user logon
        status: "",
        sports: '',
        leagues: '',
        templateLeague: {
            leagueId: 1,
            leagueName: "Test League E2",
            description: "test league E Fun",
            sportId: 3,
            ageMin: 15,
            ageMax: 16,
            coed: 1,
            teamMin: 2,
            teamMax: 6,
            leagueSchedule: "test league E schedule",
            leagueRules: "Play Fair have Fun",
            orgid: "9bbeb119-659e-495b-a04e-2a84a4ba3a03",
            userId: 2
        },
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
            league: {
                leagueId: 1,
                leagueName: "Test League E2",
                description: "test league E Fun",
                sportId: 3,
                ageMin: 15,
                ageMax: 16,
                coed: 1,
                teamMin: 2,
                teamMax: 6,
                leagueSchedule: "test league E schedule",
                leagueRules: "Play Fair have Fun",
                orgid: "9bbeb119-659e-495b-a04e-2a84a4ba3a03",
                userId: 2
            },
            newRegisteredUser: "",
            updatedUser: "",
            registerUser: false,
            editUser: false,
            createLeague: false,
            editLeague: false,
            newLeague: "",
            updatedLeague: "",
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
          router.push('/' + payload);
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
        },
        GET_LEAGUES_SUCCESS(state, payload) {
            state.leagues = payload;
        },
        GET_sportS_SUCCESS(state, payload){
            state.sports=payload
        },
        OPEN_CREATE_LEAGUE(state) {
            state.league = state.templateLeague;
            state.settings.createLeague = true;
            state.settings.editLeague = false;
        },
        OPEN_EDIT_LEAGUE(state, payload) {
            console.log('payload in edit mutation', payload);
            state.settings.editLeague = true;
            state.settings.createLeague = false;
            state.settings.league = payload;
            router.push('/leagues');
        },
        CANCEL_LEAGUES_FORM(state) {
            state.settings.createLeague = false;
            state.settings.editLeague = false;
            state.settings.league = state.templateLeague;
        },
        LEAGUE_CREATE_SUCCESS(state, payload) {
            state.settings.newLeague = payload.leagueName;
            state.leagues.push(payload);
            state.createLeague = false;
            state.status = 'leagueCreateSuccess';
        },
        LEAGUE_UPDATE_SUCCESS(state, payload) {
            console.log('updating league', payload);
            state.settings.updatedLeague = payload.leagueName;
            //update the local array by key or value to show update in UI
            //let obj = state.leagues.find(obj => obj.leagueId === payload.leagueId);
            let foundIndex = state.leagues.findIndex(x => x.leagueId === payload.leagueId);
            console.log('mutation update league: ', foundIndex);
            state.leagues[foundIndex] = payload;
            console.log('updated leagues list: ', state.leagues);
            state.editLeague = false;
            state.status = 'updateLeagueSuccess';
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            context.commit("SET_MANAGED_OPTION", payload);
        },
        setSettingInfo: (context, payload) => {
            context.commit("SET_SETTING_INFO", payload);
        },
        //users
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
            return usersObject.login(context, user);
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
        },
        //leagues
        getLeagues(context, token) {
            leaguesObject.getLeagues(context, token);
        },
        getSports(context, token) {
            sportsObject.getSports(context, token);
        },
        openCreateLeague(context) {
            context.commit("OPEN_CREATE_LEAGUE");
        },
        createLeague(context, league) {
            leaguesObject.createLeague(context, league);
        },
        openUpdateLeague(context, league) {
            context.commit('OPEN_EDIT_LEAGUE', league);
        },
        updateLeague(context, league){
           leaguesObject.updateLeague(context, league);
        },
        cancelLeaguesForm(context) {
            context.commit("CANCEL_LEAGUES_FORM");
        }
    }


});
