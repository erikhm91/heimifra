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
        loggedIn: false,
        dbActive: true,
        postArray: examplePosts2.posts,
        // activeView: 'message-container',
        myPosts: examplePosts.posts,
        myTasks: exampletasks.tasks,
        users: users.users,
        chats: chats.chats,
        activeUser: null,
        // users.users[4],
        chatrooms: chats.chatrooms,
        userChatrooms: chats.userChatrooms,
        activeChatid: null,
        activeChatroom: null,
        activeUid: null,
        activeEmail: null
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
        // SET_ACTIVE_VIEW(state, activeView) {
        //     state.activeView = activeView;
        // },
        NULL_ACTIVE_CHAT(state) {
            state.activeChat = null;
            state.activeChatroom = null;
        },
        SET_ACTIVE_CHAT(state, chatroomid) {
            
            let chat = state.chatrooms.find(obj => obj.room === chatroomid);
            if (chat == null) {
                //create new chat
                chat = {
                    "room": chatroomid,
                    "messages": []
                }
                state.chatrooms.push(chat);
            } 
            state.activeChatid = chatroomid;
            state.activeChatroom = chat;
        },

        ADD_OWN_TASK(state, postObj) {
            state.myTasks.push(postObj);
        },
        ADD_USER(state, userObj) {
            state.users.push(userObj);
        },
        ADD_CHATMESSAGE(state, payload) {
            //payload: {'roomid': roomid, 'msg': msgObj}
            let chat = state.chatrooms.find(obj => obj.room === payload.roomid);
            console.log(chat)
            if (chat == null) {
                //create new chat
                chat = {
                    "room": payload.roomid,
                    "messages": []
                }
                state.chatrooms.push(chat);
            }
            console.log(chat)
            chat.messages.push(payload.msg);
        },
        SET_USER(state, user) {
            state.activeUser = user;
        },
        SET_ACTIVE_UID(state, uid){
            state.activeUid = uid;
        },
        SET_ACTIVE_EMAIL(state, email){
            state.activeEmail = email
        },
        SET_LOGGED_IN(state, bool){
            state.loggedIn = bool
        }

    },

    getters: {
        postArray : state => state.postArray,
        // activeView : state => state.activeView,
        myPosts : state => state.myPosts,
        myTasks : state => state.myTasks,
        users: state => state.users,
        user: state => uid => state.users.find(obj => obj.uid == uid),
        chatroom: state => room => state.chatrooms.find(obj => obj.room == room),
        activeUser: state => state.activeUser,
        activeChatroom: state => state.activeChatroom,
        dbActive: state => state.dbActive,
        loggedIn: state => state.loggedIn
    }
})
