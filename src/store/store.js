import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    state: {
        postArray: [],
        activeView: 'message-container'
        
    },

    mutations: {
        ADD_POST(state, postObj) {
            state.postArray.push(postObj);
        },
        SET_ACTIVE_VIEW(state, activeView) {
            state.activeView = activeView;
        }
    },

    getters: {
        postArray : state => state.postArray,
        activeView : state => state.activeView
    }
})