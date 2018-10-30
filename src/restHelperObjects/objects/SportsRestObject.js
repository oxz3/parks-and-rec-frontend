import $ from 'jquery'
import createSportRequest from '../rest-requests/sports/create-sport-request.json'
import updateSportRequest from '../rest-requests/sports/update-sports-request.json'
import getSportRequest from '../rest-requests/sports/get-sports-request.json'
import getSportByNameRequest from '../rest-requests/sports/get-sport-by-name-request.json'


/* eslint-disable no-console */
/**
 * Object for sports REST functionality
 */
export default {

    /**
     * Perform get sport via REST api
     * @param store calling object
     * @param sport sport who logs in
     * @returns {Promise}
     */
    createSport: function (store, sport) {
        return new Promise((resolve, reject) => {

            store.commit('AUTH_REQUEST', 'creatingSport');

            let createsportSettings = Object.assign({}, createSportRequest);
            createsportSettings.headers.token = localStorage.getItem('token');
            createsportSettings.data = JSON.stringify(sport);

            $.ajax(createsportSettings).then(function (response) {
                console.log('create sport response', response);
                store.commit('SPORT_CREATE_SUCCESS', response);
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    },
    updateSport: function (store, sport) {
        return new Promise((resolve, reject) => {

            console.log("sport in object update: ", sport);

            store.commit('AUTH_REQUEST', 'updatingsport');

            let updatesportSettings = Object.assign({}, updateSportRequest);
            updatesportSettings.headers.token = localStorage.getItem('token');
            // //TODO: update when backend bug is fixed for get sports API
            // sport.orgid = "9bbeb119-659e-495b-a04e-2a84a4ba3a03";
            updatesportSettings.data = JSON.stringify(sport);


            console.log(updatesportSettings, 'update sport payload');
            $.ajax(updatesportSettings).then(function (response) {
                console.log('update sport response', response);
                store.commit('SPORT_UPDATE_SUCCESS', response);
                resolve(response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    },
    getSports: function (store, token) {
        return new Promise((resolve, reject) => {
            store.commit('AUTH_REQUEST', 'gettingsports');
            console.log('token in sports object: ', token);
            let request = Object.assign({}, getSportRequest);
            request.headers.token = localStorage.getItem('token');

            $.ajax(request).then(function (response) {
                resolve(response);
                console.log('sports response: ', response);
                store.commit('GET_SPORTS_SUCCESS', response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })

    },
    getSportByName: function (store, sport) {
        return new Promise((resolve, reject) => {

            store.commit('AUTH_REQUEST', 'gettingSportByName');
            let request = Object.assign({}, getSportByNameRequest);
            request.headers.token = localStorage.getItem('token');

            let url = request.url.substr(0, request.url.lastIndexOf("sportName=") + 10);
            request.url = url + sport.name;
            request.url = request.url + "&orgId=" + sport.orgid;
            $.ajax(request).then(function (response) {
                resolve(response);
               // store.commit('GET_SPORT_BY_NAME_SUCCESS', response);
            }).catch(err => {
                store.commit('AUTH_ERROR', err);
                reject(err)
            })
        })
    }
}