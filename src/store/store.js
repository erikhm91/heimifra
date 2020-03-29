import Vue from 'vue';
import Vuex from 'vuex';
// import examplePosts from "../data/ownposts.json";
// import examplePosts2 from "../data/exampleposts.json";
// import exampletasks from "../data/exampletasks.json";
import users from "../data/users.json";
import chats from "../data/chats.json";
import db from "@/firebase/init";
import firebase from 'firebase'
import { chatroomMixin } from "@/components/mixins/chatroomMixin.js";

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
        myActivePosts: state => {
            return state.myPosts.filter(post => post.status == "free")
        },
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


        SET_DELETE_FLAG(state, postId) {
            console.log("myPosts", state.myPosts, postId)
            let index = state.myPosts.findIndex(obj => obj.id === postId);
            state.myPosts[index].status = 'del'
            console.log("myPosts after update: ", state.myPosts)

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
        SET_POSTS(state, postArray) {
            state.postArray = postArray
        },
        SET_MYTASKS(state, postArray) {
            state.myTasks = postArray
        },
        SET_MYPOSTS(state, postArray) {
            console.log("mutating myposts: ", postArray)
            state.myPosts = postArray
            console.log("state.myPosts: ", state.myPosts)
        },
        SET_ERROR(state, error) {
            state.error = error
        }

    },

    actions: {
        initState(context) {
            store.commit('SET_LOGGED_IN', true)
            // console.log(context)
            context.dispatch('fetchPosts')
            context.dispatch('fetchMyPosts')
            context.dispatch('fetchMyTasks')
        },
        initiateChatListener (context, chatPartner) {
            //payload: { chatpartner : "uid"}
            let chatroom = chatroomMixin.getChatroomId(context.getters.activeUser.uid, chatPartner)
            let ref = db.collection('chats').doc(chatroom).collection('messages')

            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added'){
                        let doc = change.doc
                        let newMessage = {
                            uid : doc.uid,
                            text : doc.text,
                            time : doc.time
                        }
                        let messagePayload = {
                            room : chatroom,
                            msg : newMessage
                        }
                        console.log("messagepayload: ", messagePayload)
                        context.commit("ADD_CHATMESSAGE". messagePayload)
                    }
                })
            })

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
        sendMessage(context, payload) {
            // Add a new message
            console.log("payload: ",payload)
            let chatroomid = payload.chatroom
            // chatroomMixin.getChatroomid(payload.from, payload.to);
            db.collection("chats").doc(chatroomid).collection("messages").add({
                uid : payload.from,
                time: Date.now(),
                text : payload.text
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }

    }
})
