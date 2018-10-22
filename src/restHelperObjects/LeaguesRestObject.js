import $ from 'jquery'
import createLeagueRequest from './rest-requests/leagues/create-league-request.json'

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

            store.commit('AUTH_REQUEST', 'creatingleague');

            let createleagueSettings = Object.assign({}, createLeagueRequest);
            createleagueSettings.headers.token = localStorage.getItem('token');
            createleagueSettings.data = JSON.stringify(league);

            $.ajax(createleagueSettings).then(function (response) {
                console.log('create league response');
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    }
}