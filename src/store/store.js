import Vue from 'vue';
import Vuex from 'vuex';
import examplePosts from "../data/exampleposts.json";
import examplePosts2 from "../data/exampleposts2.json";
import exampletasks from "../data/exampletasks.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    state: {
        postArray: examplePosts2.posts,
        activeView: 'message-container',
        myPosts: examplePosts.posts,
        myTasks: exampletasks.tasks
        
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
        },
        ADD_OWN_TASK(state, postObj) {
            state.myTasks.push(postObj);
        }
    },

    getters: {
        postArray : state => state.postArray,
        activeView : state => state.activeView,
        myPosts : state => state.myPosts,
        myTasks : state => state.myTasks
    }
})