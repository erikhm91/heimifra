import Vue from 'vue';
import Vuex from 'vuex';
import examplePosts from "../data/exampleposts.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    state: {
        postArray: [],
        activeView: 'message-container',
        myPosts: examplePosts.posts
        
    },

    mutations: {
        ADD_POST(state, postObj) {
            state.postArray.push(postObj);
        },
        ADD_OWN_POST(state, postObj) {
            state.myPosts.push(postObj);
        },
        SET_ACTIVE_VIEW(state, activeView) {
            state.activeView = activeView;
        }
    },

    getters: {
        postArray : state => state.postArray,
        activeView : state => state.activeView,
        myPosts : state => state.myPosts
    }
})