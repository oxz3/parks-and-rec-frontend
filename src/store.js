/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import usersObject from './restHelperObjects/objects/UsersRestObject'
import leaguesObject from './restHelperObjects/objects/LeaguesRestObject'
import sportsObject from './restHelperObjects/objects/SportsRestObject'
import templateUser from './data/template-user.json'
import templateLeague from './data/template-league.json'
import templateSport from './data/template-sport.json'


Vue.use(Vuex);


// let token = null;
const localStorage = window.localStorage;

export const store = new Vuex.Store({
    strict: true,
    state: {
        //indicates the status of user logon
        status: "",
        sports: [
            {name: 'Soccer', description: "kick the ball", id: 1},
            {name: 'Football', description: "score touchdowns", id: 2},
            {name: 'Basketball', description: 'shoot the ball', id: 3}
        ],
        leagues: [
            {leagueName: 'Soccer', description: "Fall Soccer League", sportId: 1, leagueId: 999},
            {leagueName: 'Football', description: "Fall Football League", sportId: 2, leagueId: 998},
            {leagueName: 'Basketball', description: "Fall Basketball League", sportId: 3, leagueId: 997},
            {leagueName: 'Soccer 2', description: "Fall Soccer League 2", sportId: 1, leagueId: 996},

        ],
        templateUser: templateUser,
        templateLeague: templateLeague,
        templateSport: templateSport,
        settings: {
            options: [
                "sports",
                "leagues"
            ],
            info: {
                "selected": "",
            },
            currentSport: {},
            selectedOption: "sports",
            userIsAdmin: true,
            user: {},
            league: {},
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
        },
        SET_SETTING_INFO: (state, payload) => {
            state.settings.info.selected = payload;
        },
        SET_USER: (state, payload) => {
            state.settings.user = payload;
            console.log('updated settings user: ', state.settings.user);
        },
        EDIT_USER: (state, payload) => {
            state.settings.user = payload;
            state.settings.editUser = true;
            router.push('/logon')
        },
        REGISTER(state) {
            state.settings.registerUser = true;
            state.user = state.templateUser;
            router.push('/logon')
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
            state.settings.authenticatedUser = payload.user;
        },
        REGISTRATION_SUCCESS(state, payload) {
            state.settings.newRegisteredUser = payload.username;
            state.settings.registerUser = false;
            state.status = 'registrationSuccess';
        },
        UPDATE_USER_SUCCESS(state, payload) {
            state.settings.updatedUser = payload.username;
            state.settings.editUser = false;
            state.settings.user = payload;
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
            //state.settings.user = state.templateUser;
        },
        GET_LEAGUES_SUCCESS(state, payload) {
            state.leagues = payload;
        },
        OPEN_CREATE_LEAGUE(state, sport) {
            state.settings.currentSport = sport;
            state.league = state.templateLeague;
            state.league.sportId = sport.id;
            state.settings.createLeague = true;
            state.settings.editLeague = false;
            router.push('/leagues');
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
            state.settings.updatedLeague = payload.leagueName || "league";
            let foundIndex = state.leagues.findIndex(x => x.leagueId === payload.leagueId);
            console.log('mutation update league: ', foundIndex);
            state.leagues[foundIndex] = payload;
            console.log('updated leagues list: ', state.leagues);
            state.editLeague = false;
            state.status = 'updateLeagueSuccess';
        },
        //Sports
        GET_SPORTS_SUCCESS(state, payload) {
            state.sports = payload;
        },
        OPEN_CREATE_SPORT(state) {
            state.sport = state.templateSport;
            state.settings.createSport = true;
            state.settings.editSport = false;
        },
        OPEN_EDIT_SPORT(state, payload) {
            state.settings.editSport = true;
            state.settings.createSport = false;
            state.settings.sport = payload;
            router.push('/sports');
        },
        CANCEL_SPORTS_FORM(state) {
            state.settings.createSport = false;
            state.settings.editSport = false;
            state.settings.sport = state.templateSport;
        },
        SPORT_CREATE_SUCCESS(state, payload) {
            state.settings.newSport = payload.name;
            state.sports.push(payload);
            state.createsport = false;
            state.status = 'sportCreateSuccess';
        },
        SPORT_UPDATE_SUCCESS(state, payload) {
            console.log('updating sport', payload);
            state.settings.updatedSport = payload.name || "sport";
            let foundIndex = state.sports.findIndex(x => x.sportId === payload.sportId);
            console.log('mutation update sport: ', foundIndex);
            state.sports[foundIndex] = payload;
            console.log('updated sports list: ', state.sports);
            state.editsport = false;
            state.status = 'updateSportSuccess';
        },
        ADD_LEAGUE_TO_SPORT_LIST(state, payload) {
            state.sports.forEach(function (sport) {
                if (sport.id === payload.sport.id) {
                    if (!sport.leagues) {
                        sport.leagues = [];
                    }
                    if (sport.leagues.length < 1) {
                        sport.leagues.push(payload.league);
                    }
                    //determine if the league is already in the list
                    sport.leagues.forEach(function (league) {
                        if (league.leagueId !== payload.league.leagueId && payload.leagueId !== undefined) {
                            sport.leagues.push(payload.league);
                        }
                    });
                }
            })
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
        setUser(context, user) {
            context.commit("SET_USER", user);
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
        openCreateLeague(context, sport) {
            context.commit("OPEN_CREATE_LEAGUE", sport);
        },
        createLeague(context, league) {
            leaguesObject.createLeague(context, league);
        },
        openUpdateLeague(context, league) {
            context.commit('OPEN_EDIT_LEAGUE', league);
        },
        updateLeague(context, league) {
            leaguesObject.updateLeague(context, league);
        },
        cancelLeaguesForm(context) {
            context.commit("CANCEL_LEAGUES_FORM");
        },
        //Sports
        getSports(context, token) {
            sportsObject.getSports(context, token);
        },
        openCreateSport(context) {
            context.commit("OPEN_CREATE_SPORT");
        },
        createSport(context, sport) {
            sportsObject.createSport(context, sport);
        },
        openUpdateSport(context, sport) {
            context.commit('OPEN_EDIT_SPORT', sport);
        },
        updateSport(context, sport) {
            sportsObject.updateSport(context, sport);
        },
        cancelSportsForm(context) {
            context.commit("CANCEL_SPORTS_FORM");
        },
        //build sport league list
        addLeagueToSportList(context, payload) {
            context.commit("ADD_LEAGUE_TO_SPORT_LIST", payload);
        }

    }


});
