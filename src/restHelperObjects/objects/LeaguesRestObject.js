import $ from 'jquery'
import createLeagueRequest from '../rest-requests/leagues/create-league-request.json'
import updateLeagueRequest from '../rest-requests/leagues/update-league-request.json'
import getLeaguesRequest from '../rest-requests/leagues/get-leagues-request.json'


/* eslint-disable no-console */
/**
 * Object for leagues REST functionality
 */
export default {

    /**
     * Perform get league via REST api
     * @param store calling object
     * @param league league who logs in
     * @returns {Promise}
     */
    createLeague: function (store, league) {
        return new Promise((resolve, reject) => {

            console.log("league in object create: ", league);

            store.commit('AUTH_REQUEST', 'creatingleague');

            let createleagueSettings = Object.assign({}, createLeagueRequest);
            createleagueSettings.headers.token = localStorage.getItem('token');
            createleagueSettings.data = JSON.stringify(league);

            $.ajax(createleagueSettings).then(function (response) {
                console.log('create league response', response);
                store.commit('LEAGUE_CREATE_SUCCESS', response);
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    },
    updateLeague: function (store, league) {
        return new Promise((resolve, reject) => {

            console.log("league in object update: ", league);

            store.commit('AUTH_REQUEST', 'updatingleague');

            let updateLeagueSettings = Object.assign({}, updateLeagueRequest);
            updateLeagueSettings.headers.token = localStorage.getItem('token');
            // //TODO: update when backend bug is fixed for get leagues API
            // league.orgid = "9bbeb119-659e-495b-a04e-2a84a4ba3a03";
            updateLeagueSettings.data = JSON.stringify(league);


            console.log(updateLeagueSettings, 'update league payload');
            $.ajax(updateLeagueSettings).then(function (response) {
                console.log('update league response', response);
                store.commit('LEAGUE_UPDATE_SUCCESS', response);
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    },
    getLeagues: function (store, token) {
        return new Promise((resolve, reject) => {
            store.commit('AUTH_REQUEST', 'gettingLeagues');
            console.log('token in leagues object: ', token);
            let request = Object.assign({}, getLeaguesRequest);
            request.headers.token = localStorage.getItem('token');
          
            $.ajax(request).then(function (response) {
                resolve(response);
              
                console.log('leagues response: ', response);
                store.commit('GET_LEAGUES_SUCCESS', response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })

    }
}
