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
            // {name: 'Soccer', description: "kick the ball", id: 1},
            // {name: 'Football', description: "score touchdowns", id: 2},
            // {name: 'Basketball', description: 'shoot the ball', id: 3}
        ],
        leagues: [
            // {leagueName: 'Soccer', description: "Fall Soccer League", sportId: 1, leagueId: 999},
            // {leagueName: 'Soccer 2', description: "Fall Soccer League 2", sportId: 1, leagueId: 996},
            // {leagueName: 'Football', description: "Fall Football League", sportId: 2, leagueId: 998},
            // {leagueName: 'Basketball', description: "Fall Basketball League", sportId: 3, leagueId: 997}
        ],
        userSports: [],
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
        sports: state => state.sports,
        leagues: state => state.leagues
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
            state.newRegisteredUser = {};
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
            console.log('registeration success: ', payload);
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
            state.settings.createUser = false;
            state.settings.token = null;
            state.sports = [];
            state.userSports = [];
            state.leagues = [];
        },
        CANCEL_LOGON_FORM(state) {
            state.settings.editUser = false;
            state.settings.registerUser = false;
            router.push("/main");
        },
        GET_LEAGUES_SUCCESS(state, payload) {
            state.leagues = payload;
        },
        OPEN_CREATE_LEAGUE(state, sport) {
            console.log(sport);
            state.settings.currentSport = sport;
            state.settings.league = state.templateLeague;
            state.settings.league.sportId = sport.id;
            state.settings.createLeague = true;
            state.settings.editLeague = false;
            router.push('/leagues');
        },
        OPEN_EDIT_LEAGUE(state, payload) {
            console.log('payload in edit mutation', payload);
            state.settings.currentSport = payload.currentSport;
            state.settings.editLeague = true;
            state.settings.createLeague = false;
            state.settings.league = payload.league;
            router.push('/leagues');
        },
        CANCEL_LEAGUES_FORM(state) {
            state.settings.createLeague = false;
            state.settings.editLeague = false;
            state.settings.league = state.templateLeague;
            router.push("/main");
        },
        LEAGUE_CREATE_SUCCESS(state, payload) {
            console.log('leagues? ', state.leagues);
            state.settings.newLeague = payload.leagueName;
            state.leagues.push(payload);
            state.createLeague = false;
            state.status = 'leagueCreateSuccess';
            if (!state.settings.currentSport.leagues) {
                state.settings.currentSport.leagues = [];
            }
            if (state.settings.currentSport.leagues) {
                state.settings.currentSport.leagues.push(payload);
            }
            router.push('/main');

        },
        LEAGUE_UPDATE_SUCCESS(state, payload) {
            console.log('updating league', payload);
            state.settings.updatedLeague = payload.leagueName || "league";
            state.settings.league = payload;
            let leagueToUpdate = state.settings.currentSport.leagues.map(function(x) {return x.leagueId; }).indexOf(payload.leagueId);
            state.settings.currentSport.leagues[leagueToUpdate] = payload;
            state.editLeague = false;
            state.status = 'updateLeagueSuccess';
            router.push("/main");
        },
         DELETE_LEAGUES_SUCCESS(state, payload) {
            state.leagues = payload;
            state.status = 'deleteLeagueSuccess';
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
            router.push("/main");
        },
        DELETE_SPORTS_SUCCESS(state, payload) {
            state.userSports = payload;
            state.status = 'deleteSportSuccess';
        },
        GET_ALL_SPORTS_SUCCESS(state, payload) {
            state.userSports = payload;
        },
        GET_ALL_TEAMS_SUCCESS(state, payload) {
            state.teams = payload;
        },
        SPORT_CREATE_SUCCESS(state, payload) {
            state.settings.newSport = payload.name;
            state.sports.push(payload);
            state.userSports.push(payload);
            state.createsport = false;
            state.status = 'sportCreateSuccess';
            router.push("/main");
        },
        SPORT_UPDATE_SUCCESS(state, payload) {
            console.log('updating sport', payload);
            state.settings.updatedSport = payload.name || "sport";
            let foundIndex = state.userSports.findIndex(x => x.sportId === payload.sportId);
            console.log('mutation update sport: ', foundIndex);
            state.userSports[foundIndex] = payload;
            console.log('updated sports list: ', state.userSports);
            state.editsport = false;
            state.status = 'updateSportSuccess';
            router.push("/main");
        },
        ADD_SPORT_TO_LIST(state, sport) {
            console.log('adding sport to sports list in store', sport);
            console.log(state.sports);
            state.sports.forEach(function (s) {
                console.log(s, sport[0]);
                if (sport[0].name.includes(s.name) && s.orgid === sport[0].orgid && sport[0].orgid === state.settings.user.orgid) {
                        console.log('match of sports: ', s, sport[0]);
                        s.id = sport[0].id;
                        state.userSports.push(s);
                }
            });
        },
        ADD_LEAGUE_TO_SPORT_LIST(state, payload) {
            state.userSports.forEach(function (sport) {
                if (sport.id === payload.sportId) {
                    if (!sport.leagues) {
                        sport.leagues = [];
                        payload.league.addedToSportList = true;
                        sport.leagues.push(payload.league);
                    }
                    if (sport.leagues.length > 0 && !payload.league.addedToSportList) {
                        payload.league.addedToSportList = true;
                        sport.leagues.push(payload.league);
                    }
                }
            });
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
            return leaguesObject.getLeagues(context, token);
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
        deleteLeague(context, league) {
            return leaguesObject.deleteLeague(context, league);
        },
        //Sports
        getSports(context, token) {
            return sportsObject.getSports(context, token);
        },
        getAllSports(context) {
            return sportsObject.getAllSports(context);
        },
        getAllTeams(context, leagueId) {
            return sportsObject.getAllTeams(context, leagueId);
        },
        getSportByName(context, sport) {
            return sportsObject.getSportByName(context, sport);
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
        deleteSport(context, sport) {
            return sportsObject.deleteSport(context, sport);
        },
        cancelSportsForm(context) {
            context.commit("CANCEL_SPORTS_FORM");
        },
        addSportToList(context, sport) {
            context.commit("ADD_SPORT_TO_LIST", sport);
        },
        //build sport league list
        addLeagueToSportList(context, payload) {
            context.commit("ADD_LEAGUE_TO_SPORT_LIST", payload);
        }
    }
});
