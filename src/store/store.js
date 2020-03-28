import Vue from 'vue';
import Vuex from 'vuex';
// import examplePosts from "../data/ownposts.json";
import examplePosts2 from "../data/exampleposts.json";
// import exampletasks from "../data/exampletasks.json";
import users from "../data/users.json";
import chats from "../data/chats.json";
import db from "@/firebase/init";

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        loggedIn: false,
        dbActive: true,
        postArray: examplePosts2.posts,
        // activeView: 'message-container',
        // myPosts: examplePosts.posts,
        // myTasks: exampletasks.tasks,
        myPosts: null,
        myTasks: null,
        users: users.users,
        chats: chats.chats,
        activeUser: null,
        // users.users[4],
        chatrooms: chats.chatrooms,
        userChatrooms: chats.userChatrooms,
        activeChatid: null,
        activeChatroom: null,
        error: null
    },

    getters: {
        postArray: state => state.postArray,
        // activeView : state => state.activeView,
        myPosts: state => state.myPosts,
        myTasks: state => state.myTasks,
        users: state => state.users,
        user: state => uid => state.users.find(obj => obj.uid == uid),
        chatroom: state => room => state.chatrooms.find(obj => obj.room == room),
        activeUser: state => state.activeUser,
        activeChatroom: state => state.activeChatroom,
        dbActive: state => state.dbActive,
        loggedIn: state => state.loggedIn
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

            console.log("index: " + index);
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
        SET_LOGGED_IN(state, bool) {
            state.loggedIn = bool
        },
        SET_MYTASKS(state, postArray) {
            state.myTasks = postArray
        },
        SET_MYPOSTS(state, postArray) {
            state.myPosts = postArray
        },
        SET_ERROR(state, error) {
            state.error = error
        }

    },

    actions: {
        initState (context) {
            // console.log("payload",payload)
            // context.commit('SET_USER', {
            //     uid: payload.uid,
            //     email: payload.email
            // })
            store.commit('SET_LOGGED_IN', true)
            // if (!context.getters.activeUser) {
            //     //get a snapshot of posts in your area? no realtime.
            //     return
            // }

            context.dispatch('fetchAndSetMyPosts')
            context.dispatch('fetchAndSetMyTasks')

            //     if (!context.getters.activeUser) {
            //         //get a snapshot of posts in your area? no realtime.
            //         return
            //     }

            //     let myPosts = []
            //     //get myPosts
            //     db.collection("posts").where("uid", "==", context.getters.activeUser.uid)
            //         .get()
            //         .then(function (querySnapshot, postArray) {
            //             postArray = myPosts;
            //             querySnapshot.forEach(function (doc) {
            //                 // doc.data() is never undefined for query doc snapshots
            //                 // console.log(doc.id, " => ", doc.data());
            //                 postArray.push(doc.data())

            //             });
            //             // console.log("myPosts:", myPosts);
            //             context.commit('SET_MYPOSTS', myPosts);

            //         })
            //         .catch(function (error) {
            //             console.log("Error getting documents: ", error);
            //         })

            //     let myTasks = []
            //     let queryParam = 'help.' + context.getters.activeUser.uid;
            //     console.log(queryParam)
            //     db.collection("posts").where(queryParam, "array-contains", "true")
            //         .get()
            //         .then(function (querySnapshot, postArray) {
            //             postArray = myTasks;
            //             querySnapshot.forEach(function (doc) {
            //                 // doc.data() is never undefined for query doc snapshots
            //                 // console.log(doc.id, " => ", doc.data());
            //                 postArray.push(doc.data())

            //             });
            //             // console.log("myTasks:", myTasks);
            //             context.commit('SET_MYTASKS', myTasks);

            //         })
            //         .catch(function (error) {
            //             console.log("Error getting documents: ", error);
            //         })
            // }

        },
        fetchAndSetMyPosts: context => {
            let myPosts = []
            //get myPosts
            db.collection("posts").where("uid", "==", context.getters.activeUser.uid)
                .get()
                .then(function (querySnapshot, postArray) {
                    postArray = myPosts;
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        postArray.push(doc.data())

                    });
                    // console.log("myPosts:", myPosts);
                    context.commit('SET_MYPOSTS', myPosts);

                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })

        },
        fetchAndSetMyTasks: context => {
            let myTasks = []
            let queryParam = 'help.' + context.getters.activeUser.uid;
            console.log(queryParam)
            db.collection("posts").where(queryParam, "array-contains", "true")
                .get()
                .then(function (querySnapshot, postArray) {
                    postArray = myTasks;
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        postArray.push(doc.data())

                    });
                    // console.log("myTasks:", myTasks);
                    context.commit('SET_MYTASKS', myTasks);

                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })
        }

    }
})
