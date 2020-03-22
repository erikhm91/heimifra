import Vue from 'vue';
import Vuex from 'vuex';
import examplePosts from "../data/ownposts.json";
import examplePosts2 from "../data/exampleposts.json";
import exampletasks from "../data/exampletasks.json";
import users from "../data/users.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    state: {
        postArray: examplePosts2.posts,
        activeView: 'message-container',
        myPosts: examplePosts.posts,
        myTasks: exampletasks.tasks,
        users: users.users
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
        },
        ADD_USER(state, userObj) {
            state.users.push(userObj);
        }
    },

    getters: {
        postArray : state => state.postArray,
        activeView : state => state.activeView,
        myPosts : state => state.myPosts,
        myTasks : state => state.myTasks,
        users: state => state.users,
        user: state => uid => state.users.find(obj => obj.uid == uid)
    }
})