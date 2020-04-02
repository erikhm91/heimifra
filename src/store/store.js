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
        myPostReplies: [], //array of postreply objects. same as 'replies' collection in firestore
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
        repliesForPost: state => function(postid) {
            return state.myPostReplies.filter(reply => reply.id == postid);
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
        activeChatMessages: state => state.activeChatMessages.slice().reverse(),
        activeChatMessagesUnreversed: state => state.activeChatMessages,

        dbActive: state => state.dbActive, //obsolete - to be deleted
    },

    mutations: {
        //post
        ADD_POST(state, postObj) {
            state.postArray.push(postObj);
        },
        UPDATE_POST(state, postObj) {
            let index = state.postArray.findIndex(obj => obj.id === postObj.id);
            // state.postArray[index] = postObj;
            Vue.set(state.postArray, index, postObj)
        },
        SET_POSTS(state, postArray) {
            state.postArray = postArray
        },

        //my posts
        ADD_OWN_POST(state, postObj) {
            state.myPosts.push(postObj);
        },
        UPDATE_OWN_POST(state, postObj) {
            let index = state.myPosts.findIndex(obj => obj.id === postObj.id);
            Vue.set(state.myPosts, index, postObj)
        },
        SET_MYPOSTS(state, postArray) {
            console.log("mutating myposts: ", postArray)
            state.myPosts = postArray
            console.log("state.myPosts: ", state.myPosts)
        },
        SET_DELETE_FLAG(state, postId) {
            // console.log("myPosts", state.myPosts, postId)
            let index = state.myPosts.findIndex(obj => obj.id === postId);
            state.myPosts[index].status = 'del'
            // console.log("myPosts after update: ", state.myPosts)
        },
        ADD_POST_REPLY(state, reply) {
            state.myPostReplies.push(reply)
        },


        //chat
        SET_ACTIVE_CHATROOM(state, chatroom) {
            state.activeChatroom = chatroom;
            state.activeChatMessages = []
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

        ADD_CHATMESSAGE_FIRST(state, payload) {
            if (state.activeChatroom != payload.chatroomid) {
                state.activeChatroom = payload.chatroomid;
            }
            state.activeChatMessages.unshift(payload.msg)
        },

        ADD_CHATMESSAGE_END(state, payload) {
            if (state.activeChatroom != payload.chatroomid) {
                state.activeChatroom = payload.chatroomid;
            }
            state.activeChatMessages.push(payload.msg)
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
        ADD_TASK(state, postObj) {
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
        },
        UPDATE_TASK(state, postObj) {
            let index = state.myTasks.findIndex(obj => obj.id === postObj.id);
            // console.log("Task update triggered. old task: ", state.myTasks[index])
            // state.myTasks[index] = postObj;
            Vue.set(state.myTasks, index, postObj)
            // console.log("new task: ", state.myTasks[index])
        }
    },

    actions: {
        //chat
        activateChat(context, payload) {
            console.log("activateChat payload: ", payload)
            context.commit('SET_ACTIVE_CHATROOM', payload.chatroomid)
            // context.dispatch('fetchChatMessages', payload) //only need to have chatlistener for changes, so disable for now.
            // context.dispatch('initiateChatListener', payload) //have chatlistener on component for now, so it is destroyed when exiting chat.
        },
        fetchChatMessages(context, payload) { //not used - listener instead
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
            context.commit('SET_ACTIVE_CHATROOM', chatroom)
            // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
            let ref = db.collection('chats').doc(chatroom).collection('messages').orderBy("time", "desc").limit(30)

            this.unsubscribe = ref.onSnapshot(snapshot => {
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
                        // console.log("messagepayload: ", messagePayload)
                        context.dispatch('addMessageToStore', messagePayload)
                    }
                })
            })
        },

        addMessageToStore(context, payload) {
            console.log("activechatmessages: ", context.getters.activeChatMessages)
            if (context.getters.activeChatMessages.length == 0) {
                context.commit('ADD_CHATMESSAGE_END', payload)
            } else {
                if (payload.msg.time >= context.getters.activeChatMessagesUnreversed[0].time) {
                    context.commit('ADD_CHATMESSAGE_FIRST', payload)
                } else {
                    context.commit('ADD_CHATMESSAGE_END', payload)
                }
            }
            // console.log("commited message to store: ", payload.msg)
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
                    // let messagePayload = {
                    //     room: chatroomid,
                    //     msg: newMessage
                    // }
                    // commit('ADD_CHATMESSAGE', messagePayload)
                    // console.log("Chatroom message successfully written to firestore!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        nullActiveChat({ commit }) {
            this.unsubscribe();
            commit('NULL_ACTIVE_CHAT')
            console.log("nulled chat and unsubscribed to chatlistener")
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
                    // console.log("Deleteflag for doc ", postid, " successfully set");
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
                    // console.log("assigned task ", payload.uid, " to user ", assignedUid);
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
                    // console.log("removed task ", payload.uid, " for user ", assignedUid);
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
            // context.dispatch('fetchMyTasks')
            context.dispatch('initiateTaskListener')
            context.dispatch('initiateReplyListener')
        },
        fetchPosts: context => { // not used - listener instead
            let posts = []
            //get myPosts
            db.collection("posts").where("status", "in", ["free", "offer", "picked"]) //not see 'del' or finished status
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
        initiatePostListener(context) {
            // let queryParam = 'offer.' + context.getters.activeUser.uid;
            // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
            let ref = db.collection('posts').

                ref.onSnapshot(snapshot => {

                    snapshot.docChanges().forEach(change => {

                        console.log("document listener triggered for my Tasks!")
                        if (change.type == 'added') {
                            // console.log("found an added Post", change.doc.data())
                            let post = change.doc.data()
                            post.id = change.doc.id
                            context.commit("ADD_POST", post)
                        }
                        else if (change.type == 'modified') {
                            // console.log("found a modified Post", change.doc.data())
                            let post = change.doc.data()
                            post.id = change.doc.id
                            // console.log("messagepayload: ", messagePayload)
                            context.commit("UPDATE_POST", post)
                        }
                    })
                })
        },

        initiateReplyListener(context) {
            // let queryParam = 'offer.' + context.getters.activeUser.uid;
            // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
            let ref = db.collection('replies').where("owner", "==", context.getters.activeUser.uid)

                ref.onSnapshot(snapshot => {

                    snapshot.docChanges().forEach(change => {

                        console.log("document listener triggered for Replies!")
                        if (change.type == 'added') {
                            console.log("found and added reply: ", change.doc.data())
                            let reply = change.doc.data()
                            
                            context.commit("ADD_POST_REPLY", reply)
                        }
                    })
                })
        },


        fetchMyPosts: context => {
            let myPosts = []
            //get myPosts
            db.collection("posts")
                .where("uid", "==", context.getters.activeUser.uid)
                .where("status", "in", ["free", "offer", "picked", "fin"]) //not see 'del' status
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
        fetchMyTasks: context => {   //not used! listener instead
            let myTasks = []
            let queryParam = 'offer.' + context.getters.activeUser.uid;
            console.log("queryparam mytasks", queryParam)
            db.collection("posts").where(queryParam, "array-contains", "true")
                .where("status", "in", ["free", "offer", "picked", "fin"]) //not see 'del' status
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
        initiateTaskListener(context) {
            let queryParam = 'offer.' + context.getters.activeUser.uid;
            // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
            let ref = db.collection('posts').where(queryParam, "array-contains", "true")

            ref.onSnapshot(snapshot => {

                snapshot.docChanges().forEach(change => {

                    console.log("document listener triggered for my Tasks!")
                    if (change.type == 'added') {
                        // console.log("found and added task:", change.doc.data())
                        let post = change.doc.data()
                        post.id = change.doc.id
                        context.commit("ADD_TASK", post)
                    }
                    else if (change.type == 'modified') {
                        // console.log("found a modified task:", change.doc.data())
                        let post = change.doc.data()
                        post.id = change.doc.id
                        // console.log("messagepayload: ", messagePayload)
                        context.commit("UPDATE_TASK", post)
                    }
                })
            })
        }
    }
})
