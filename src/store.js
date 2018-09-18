import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        sports: [
            {name: 'Soccer', description: "kick the ball", price: 20},
            {name: 'Football', description: "score touchdowns", price: 20},
            {name: 'Basketball', description: 'shoot the ball', price: 30}
        ]
    },
    mutations: {},
    actions: {}
})
