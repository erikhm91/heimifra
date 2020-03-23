import Vue from 'vue';
import Vuex from 'vuex';
import examplePosts from "../data/ownposts.json";
import examplePosts2 from "../data/exampleposts.json";
import exampletasks from "../data/exampletasks.json";
import users from "../data/users.json";
import chats from "../data/chats.json";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict:true,
    state: {
        postArray: examplePosts2.posts,
        activeView: 'message-container',
        myPosts: examplePosts.posts,
        myTasks: exampletasks.tasks,
        users: users.users,
        chats: chats.chats,
        activeUser: users.users[4]
    },

    mutations: {
        ADD_POST(state, postObj) {
            state.postArray.push(postObj);
        },
        ADD_OWN_POST(state, postObj) {
            state.myPosts.push(postObj);
        },

        DELETE_POST(state, postId) {

            let index = state.myPosts.findIndex(obj => obj.id === postId);
            
            console.log("index: "+ index);
            if (index > -1) {
              state.myPosts.splice(index, 1);
            }
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
        user: state => uid => state.users.find(obj => obj.uid == uid),
        chat: state => (uid1, uid2) => state.chats.find(obj => obj.contact1 == uid1 && obj.contact2 == uid2),
        activeUser: state => state.activeUser
    }
})