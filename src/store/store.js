import Vue from 'vue';
import Vuex from 'vuex';
// import examplePosts from "../data/ownposts.json";
// import examplePosts2 from "../data/exampleposts.json";
// import exampletasks from "../data/exampletasks.json";
import users from "../data/users.json";
import chats from "../data/chats.json";
import db from "@/firebase/init";
import firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        loggedIn: false,
        dbActive: true,
        postArray: [],
        // activeView: 'message-container',
        // myPosts: examplePosts.posts,
        // myTasks: exampletasks.tasks,
        myPosts: [],
        myTasks: [],
        users: users.users,
        chats: chats.chats,
        activeUser: null,
        // users.users[4],
        // chatrooms: chats.chatrooms,
        // userChatrooms: chats.userChatrooms,
        // activeChatid: null,
        activeChatroom: null,
        activeChatMessages: [],
        error: null
    },

    getters: {
        //post
        postArray: state => state.postArray,
        myPosts: state => state.myPosts,
        myActivePosts: state => {
            return state.myPosts.filter(post => post.status == "free")
        },

        //task
        myTasks: state => state.myTasks,

        //user
        activeUser: state => state.activeUser,
        loggedIn: state => state.loggedIn, //obsolete? Activeuser serves purpose
        users: state => state.users, //should use to keep buffered user data in store?
        user: state => uid => state.users.find(obj => obj.uid == uid), //keep buffered user data in store?

        //chat
        chatroom: state => room => state.chatrooms.find(obj => obj.room == room),
        activeChatroom: state => state.activeChatroom,
        activeChatMessages: state => state.activeChatMessages,

        dbActive: state => state.dbActive, //obsolete - to be deleted
    },

    mutations: {
        //post
        ADD_POST(state, postObj) {
            state.postArray.push(postObj);
        },
        ADD_OWN_POST(state, postObj) {
            state.myPosts.push(postObj);
        },
        SET_DELETE_FLAG(state, postId) {
            // console.log("myPosts", state.myPosts, postId)
            let index = state.myPosts.findIndex(obj => obj.id === postId);
            state.myPosts[index].status = 'del'
            // console.log("myPosts after update: ", state.myPosts)
        },
        SET_POSTS(state, postArray) {
            state.postArray = postArray
        },
        SET_MYPOSTS(state, postArray) {
            console.log("mutating myposts: ", postArray)
            state.myPosts = postArray
            console.log("state.myPosts: ", state.myPosts)
        },

        //chat
        SET_ACTIVE_CHATROOM(state, chatroom) {
            state.activeChatroom = chatroom;
            console.log("store - activeChatroom set to: ", chatroom)
        },
        SET_ACTIVE_CHAT_MESSAGES(state, messageArray) {
            state.activeChatMessages = messageArray;
        },
        NULL_ACTIVE_CHAT(state) {
            state.activeChatMessages = [];
            state.activeChatroom = null;
        },
        ADD_CHATMESSAGE(state, payload) {
            // //payload: {'roomid': roomid, 'msg': msgObj}
            // let chat = state.chatrooms.find(obj => obj.room === payload.roomid);
            // console.log(chat)
            // if (chat == null) {
            //     //create new chat
            //     chat = {
            //         "room": payload.roomid,
            //         "messages": []
            //     }
            //     state.chatrooms.push(chat);
            // }
            // console.log(chat)
            // chat.messages.push(payload.msg);

            // let messagePayload = {
            //     room : chatroomid,
            //     msg : newMessage
            // }
            if (state.activeChatroom != payload.chatroomid) {
                state.activeChatroom = payload.chatroomid;
            }
            console.log("adding chatmessage: ", payload)

            state.activeChatMessages.push(payload.msg)
            console.log("message added to chat: ", payload.msg)
        },

        // SET_ACTIVE_CHAT(state, chatroomid) {

        //     let chat = state.chatrooms.find(obj => obj.room === chatroomid);
        //     if (chat == null) {
        //         //create new chat
        //         chat = {
        //             "room": chatroomid,
        //             "messages": []
        //         }
        //         state.chatrooms.push(chat);
        //     }
        //     state.activeChatid = chatroomid;
        //     state.activeChatroom = chat;
        // },

        //task
        ADD_OWN_TASK(state, postObj) {
            state.myTasks.push(postObj);
        },
        ADD_USER(state, userObj) {
            state.users.push(userObj);
        },
        SET_MYTASKS(state, postArray) {
            state.myTasks = postArray
        },
        //user
        SET_USER(state, user) {
            state.activeUser = user;
        },
        SET_LOGGED_IN(state, bool) {
            state.loggedIn = bool
        },
        SET_ERROR(state, error) {
            state.error = error
        }
    },

    actions: {
        //chat
        activateChat(context, payload) {
            console.log("activateChat payload: ",payload)
            context.commit('SET_ACTIVE_CHATROOM', payload.chatroomid)
            // context.dispatch('fetchChatMessages', payload) //only need to have chatlistener for changes, so disable for now.
            // context.dispatch('initiateChatListener', payload) //have chatlistener on component for now, so it is destroyed when exiting chat.
        },
        fetchChatMessages(context, payload) {
            let chatroom = payload.chatroomid
            let messages = []
            db.collection('chats').doc(chatroom).collection('messages')
                .get()
                .then(function (querySnapshot, messageArray) {
                    messageArray = messages
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        let msg = doc.data()
                        messageArray.push(msg)

                    });
                    // console.log("myPosts:", myPosts);
                    context.commit('SET_ACTIVE_CHAT_MESSAGES', messages);

                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })

        },
        initiateChatListener(context, payload) {
            //payload: { chatpartner : "uid"}
            // console.log("chatroommixin: ", chatroomMixin);
            let chatroom = payload.chatroomid
            // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
            let ref = db.collection('chats').doc(chatroom).collection('messages')

            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc.data()
                        let newMessage = {
                            uid: doc.uid,
                            text: doc.text,
                            time: doc.time
                        }
                        let messagePayload = {
                            room: chatroom,
                            msg: newMessage
                        }
                        console.log("messagepayload: ", messagePayload)
                        context.commit("ADD_CHATMESSAGE",messagePayload)
                    }
                })
            })
        },
        sendMessage({ commit }, payload) {
            // Add a new message
            console.log("payload: ", payload)
            let chatroomid = payload.chatroom
            let newMessage = {
                uid: payload.from,
                time: payload.time,
                text: payload.text
            }
            // chatroomMixin.getChatroomid(payload.from, payload.to);
            db.collection("chats").doc(chatroomid).collection("messages").add(
                newMessage)
                .then(function () {
                    let messagePayload = {
                        room: chatroomid,
                        msg: newMessage
                    }
                    commit('ADD_CHATMESSAGE', messagePayload)
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        nullActiveChat({ commit }) {
            commit('NULL_ACTIVE_CHAT')
        },

        //post
        deletePost({ commit }, postid) {
            // console.log("deleteflagPost: " + postid)
            commit('SET_DELETE_FLAG', postid)
            //update database with delete flag
            db.collection("posts").doc(postid).update({
                status: "del"
            })
                .then(function () {
                    console.log("Deleteflag for doc ", postid, " successfully set");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },

        //task
        assignTask(context, payload) {
            let assignedUid = context.getters.activeUser.uid
            let assignedEmail = context.getters.activeUser.email
            // console.log("assigning task to activeuser id ", assignedUid)
            // console.log("assign task payload", payload)
            db.collection("posts").doc(payload.id).update({
                ['offer.' + assignedUid]: ['true', assignedEmail]
            })
                .then(function () {
                    console.log("assigned task ", payload.uid, " to user ", assignedUid);
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        removeTask(context, payload) {
            let assignedUid = context.getters.activeUser.uid
            // console.log("assigning task to activeuser id ", assignedUid)
            // console.log("assign task payload", payload)
            db.collection("posts").doc(payload.id).update({
                ['offer.' + assignedUid]: ['false']
            })
                .then(function () {
                    console.log("removed task ", payload.uid, " for user ", assignedUid);
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },

        //init
        initState(context) {
            store.commit('SET_LOGGED_IN', true)
            // console.log(context)
            context.dispatch('fetchPosts')
            context.dispatch('fetchMyPosts')
            context.dispatch('fetchMyTasks')
        },
        fetchPosts: context => {
            let posts = []
            //get myPosts
            db.collection("posts").where("status", "in", ["free", "picked"]) //not see 'del' or finished status
                .get()
                .then(function (querySnapshot, postArray) {
                    postArray = posts;
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        let post = doc.data()
                        post.id = doc.id
                        postArray.push(post)
                    });
                    // console.log("myPosts:", myPosts);
                    context.commit('SET_POSTS', posts);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })
        },
        fetchMyPosts: context => {
            let myPosts = []
            //get myPosts
            db.collection("posts")
                .where("uid", "==", context.getters.activeUser.uid)
                .where("status", "in", ["free", "picked", "fin"]) //not see 'del' status
                .get()
                .then(function (querySnapshot, postArray) {
                    postArray = myPosts;
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        // postArray.push(doc.data())
                        let post = doc.data()
                        post.id = doc.id
                        postArray.push(post)
                    });
                    // console.log("setting myPosts:", myPosts);
                    context.commit('SET_MYPOSTS', myPosts);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })
        },
        fetchMyTasks: context => {
            let myTasks = []
            let queryParam = 'offer.' + context.getters.activeUser.uid;
            console.log("queryparam mytasks", queryParam)
            db.collection("posts").where(queryParam, "array-contains", "true")
                .where("status", "in", ["free", "picked", "fin"]) //not see 'del' status
                .get()
                .then(function (querySnapshot, postArray) {
                    postArray = myTasks;
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        // postArray.push(doc.data())
                        let post = doc.data()
                        post.id = doc.id
                        postArray.push(post)
                    });
                    // console.log("myTasks:", myTasks);
                    context.commit('SET_MYTASKS', myTasks);
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })
        },
    }
})
