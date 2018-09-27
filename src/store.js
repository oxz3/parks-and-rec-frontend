/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
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
    mutations: {
        SET_MANAGED_OPTION: (state, payload) => {
            console.log(payload);
            state.settings.selectedOption = payload;
        }
    },
    actions: {
        setManagedOption: (context, payload) => {
            console.log(payload);
            context.commit("SET_MANAGED_OPTION", payload);
        }
    }

    
});
