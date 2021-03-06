import Vue from 'vue';
import Vuex from 'vuex';
import posts from './modules/posts';
import chats from './modules/chats';
import users from './modules/users';


Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        apiReady: true,
        error: null,
        loggedIn: false
    },
    getters: {
        apiReady: state => state.apiReady,
        dbActive: state => state.dbActive, //obsolete - to be deleted
        isLoggedIn: state => state.loggedIn, //obsolete? Activeuser serves purpose

    },
    mutations: {
        SET_API_READY(state, bool) {
            state.apiReady = bool
        },
        SET_ERROR(state, error) {
            state.error = error
        },
        SET_LOGGED_IN(state, bool) {
            state.loggedIn = bool
        }
    },
    actions: {
        //init
        initState(context) {
            store.commit('SET_LOGGED_IN', true)
            // console.log(context)
            // context.dispatch('fetchPosts')
            // context.dispatch('fetchMyPosts')

            // context.dispatch('fetchMyTasks')
            context.dispatch('initiateOwnPostListener')
            context.dispatch('initiateTaskListener')
            context.dispatch('initiateReplyListener')
            const payload = {
                uid: context.getters.activeUser.uid
            }
            context.dispatch('initiateChatListenerGlobal', payload)
            // context.dispatch('fetchOwnRepliesToPosts') --> necessary???
        },

    },
    modules: {
        posts,
        chats,
        users
    }
})
