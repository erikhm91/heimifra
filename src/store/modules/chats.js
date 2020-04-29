import { firestore } from "@/firebase/init";
import firebase from 'firebase'
import Vue from 'vue'
const state = {
    activeChatroom: null,
    activeChatMessages: [],
    chats: []
}

const getters = {
    //chat
    chatroom: state => chatroomid => {
        console.log("chatroomid: ", chatroomid)
        const foundRoom = state.chats.find(obj => obj.chatroomid == chatroomid)
        return foundRoom;
    },
    activeChatroom: state => state.activeChatroom,
    activeChatMessages: state => state.activeChatMessages.slice().reverse(),
    activeChatMessagesUnreversed: state => state.activeChatMessages,
    numberOfUnreadMessages: state => {
        let numOfUnread = 0
        state.chats.forEach(room => {
            console.log("activeUser in numberOfUnreadMessages", this.state.users.activeUser)
            const arrayOfUnreadMessages = room.messages.filter(msg => msg.read === false && msg.to === state.users.activeUser.uid)
            numOfUnread += arrayOfUnreadMessages.length;
        })
        console.log('numberOfUnreadMessages triggered! ', numOfUnread)
        return numOfUnread;
    }
}

const mutations = {
    //chat
    SET_ACTIVE_CHATROOM(state, chatroom) {
        state.activeChatroom = chatroom;
        state.activeChatMessages = []
        console.log("store - activeChatroom set to: ", chatroom)
    },
    SET_CHATROOM_STATUS_FETCHED(state, chatroomid) {
        const index = state.chats.findIndex(obj => obj.chatroomid === chatroomid);
        let chatroom = state.chats[index]
        if (chatroom) {
            if (chatroom.fetched != true) {
                chatroom.fetched = true
                Vue.set(state.chats, index, chatroom)
            }
        }
    },
    SET_CHATMESSAGES_IN_STORE(state, payload) {
        const chatroomid = payload.chatroomid;
        const messages = payload.messages;
        let chatroom = state.chats.find(obj => obj.chatroomid === chatroomid);
        if (chatroom) {
            // if (chatroom.fetched != true) {
            //     chatroom.fetched = true
            //     Vue.set(state.chats, index, chatroom)
            // }
            Vue.set(chatroom, 'messages', messages)
        }
        console.log("state.chats after set_chatmessages_in_store:", state.chats)
    },
    SET_CHAT_MESSAGES_READ(state, chatroomid) {
        let chatroom = state.chats.find(obj => obj.chatroomid === chatroomid);
        if (chatroom) {
            chatroom.messages.forEach(msg => {
                Vue.set(msg, 'read', true)
            })
        }
    },
    SET_ACTIVE_CHAT_MESSAGES(state, messageArray) {
        state.activeChatMessages = messageArray;
    },
    SET_ACTIVE_CHAT_MESSAGES_FROM_STORE(state, chatroomid) {
        let chatroom = state.chats.find(obj => obj.chatroomid === chatroomid);
        if (chatroom) {
            chatroom.messages.forEach(msg => {
                state.activeChatMessages.push(msg)
            })
        }
        console.log("set activechat messages from store: ", state.activeChatMessages)
    },
    NULL_ACTIVE_CHAT(state) {
        state.activeChatMessages = [];
        state.activeChatroom = null;
    },
    ADD_CHATROOM_IF_NOT_EXISTS(state, chatroomid) {
        let chatroom
        if (state.chats.length > 0) {
            chatroom = state.chats.find(obj => obj.chatroomid === chatroomid);
        }
        if (chatroom == null) {
            //create new chat
            chatroom = {
                'chatroomid': chatroomid,
                'fetched': false,
                'messages': []
            }
            state.chats.push(chatroom);
        }
        console.log("Updated chats with new chatroom: ", state.chats, chatroomid)
    },
    ADD_CHATMESSAGE(state, payload) {
        console.log(chatroom)
        let chatroom = state.chats.find(obj => obj.chatroomid === payload.chatroomid)
        chatroom.messages.push(payload.message);
        // if (state.activeChatroom == payload.chatroomid) {
        //     state.activeChatMessages.push(payload.message)
        //     console.log("updated active chatmessages", state.activeChatMessages)
        // }
        console.log("updated chats state", state.chats)
    },

    ADD_CHATMESSAGE_FIRST(state, payload) { //TO be obsolete, when moving away from "activechatroom"
        if (state.activeChatroom != payload.chatroomid) {
            state.activeChatroom = payload.chatroomid;
        }
        state.activeChatMessages.unshift(payload.msg)
    },

    ADD_CHATMESSAGE_FIRST_CHATS(state, payload) {
        if (state.activeChatroom != payload.chatroomid) {
            state.activeChatroom = payload.chatroomid;
        }
        state.activeChatMessages.unshift(payload.msg)
    },

    ADD_CHATMESSAGE_END_CHATS(state, payload) { //TO be obsolete, when moving away from "activechatroom"
        if (state.activeChatroom != payload.chatroomid) {
            state.activeChatroom = payload.chatroomid;
        }
        state.activeChatMessages.push(payload.msg)
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
}
const actions = {
    //chat
    activateChat(context, payload) { //OBSOLETE
        console.log("activateChat payload: ", payload)
        context.commit('SET_ACTIVE_CHATROOM', payload.chatroomid)
        // context.dispatch('fetchChatMessages', payload) //only need to have chatlistener for changes, so disable for now.
        // context.dispatch('initiateChatListener', payload) //have chatlistener on component for now, so it is destroyed when exiting chat.
    },
    activateChatNew(context, payload) {
        console.log("activateChat payload: ", payload)
        // let payload = {
        //     chatroomid: this.chatroomid,
        //     chatPartner: this.chatPartner --> Not needed?
        //   };
        //set the chatroomid - and add chatroom to store
        context.commit('ADD_CHATROOM_IF_NOT_EXISTS', payload.chatroomid)
        context.commit('SET_ACTIVE_CHATROOM', payload.chatroomid)

        //fetch messages:
        const chatroom = context.getters.chatroom(payload.chatroomid);
        if (chatroom.fetched === true) {
            //already fetched from db, fetch from store
            context.commit('SET_ACTIVE_CHAT_MESSAGES_FROM_STORE', payload.chatroomid)

        } else {
            //fetch from db
            context.dispatch('fetchChatMessages', payload)
        }
        context.dispatch('setChatMessagesRead', payload.chatroomid)
        context.commit('SET_CHAT_MESSAGES_READ', payload.chatroomid)
        // context.dispatch('fetchChatMessages', payload) //only need to have chatlistener for changes, so disable for now.
    },

    setChatMessagesRead(context, chatroomid) {
        // console.log("assigning task to activeuser id ", assignedUid)
        // console.log("assign task payload", payload)
        const activeChatMessages = context.getters.activeChatMessages;
        let ref = firestore.collection("chats").doc(chatroomid).collection('messages')
        activeChatMessages.forEach(message => {
            ref.doc(message.id).update({
                read: true
            }).then(function () {
            })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        })
        context.commit('SET_CHAT_MESSAGES_READ', chatroomid)
    },
    fetchChatMessages(context, payload) {
        let chatroom = payload.chatroomid
        firestore.collection('chats').doc(chatroom).collection('messages')
            .get()
            .then(function (querySnapshot) {
                let messages = [];
                querySnapshot.forEach(function (doc) {
                    // console.log(doc.id, " => ", doc.data());
                    let msg = doc.data()
                    messages.push(msg)
                });
                // console.log("myPosts:", myPosts);
                context.commit('SET_ACTIVE_CHAT_MESSAGES', messages);
                const storePayload = {
                    chatroomid: payload.chatroomid,
                    messages: messages
                }
                context.commit('SET_CHATMESSAGES_IN_STORE', storePayload)
                context.commit('SET_CHATROOM_STATUS_FETCHED', payload.chatroomid)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            })
    },
    initiateChatListenerGlobal(context, payload) {
        // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
        let queryParam = 'sub.' + context.getters.activeUser.uid;
        // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
        firestore.collection('chats').where(queryParam, "==", true).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    // postArray.push(doc.data())
                    context.dispatch('initiateListenerForChatroom', doc)
                })
            })
    },

    initiateListenerForChatroom(context, doc) { //helper method for initiateChatListenerGlobal
        const chatroomid = doc.id
        //set listener for chatroom
        let ref = firestore.collection('chats').doc(chatroomid).collection('messages')
            .where('to', '==', context.getters.activeUser.uid)
        // .where('read','==',false)
        // .orderBy("time", "desc").limit(3)
        ref.onSnapshot(snapshot => {
            console.log("found messages with global query!")
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    let doc = change.doc.data()
                    let newMessage = {
                        to: doc.to,
                        from: doc.from,
                        text: doc.text,
                        time: doc.time,
                        read: doc.read,
                        postid: doc.postid
                    }
                    // let messagePayload = {
                    //     room: chatroom,
                    //     msg: newMessage
                    // }
                    console.log("message found: ", newMessage)
                    //TODO: add to store
                    const payload = {
                        chatroomid: chatroomid,
                        message: newMessage
                    }
                    context.dispatch('addMessageToStoreNew', payload)
                    // console.log("messagepayload: ", messagePayload)
                    // context.dispatch('addMessageToStore', messagePayload)
                }
            })
        });
    },
    initiateChatListener(context, payload) { //OBSOLETE
        //payload: { chatpartner : "uid"}
        // console.log("chatroommixin: ", chatroomMixin);
        let chatroom = payload.chatroomid
        context.commit('SET_ACTIVE_CHATROOM', chatroom)
        // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
        let ref = firestore.collection('chats').doc(chatroom).collection('messages').orderBy("time", "desc").limit(30)

        this.unsubscribe = ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type == 'added') {
                    let doc = change.doc.data()
                    let newMessage = {
                        to: doc.to,
                        from: doc.from,
                        text: doc.text,
                        time: doc.time,
                        read: doc.read,
                        postid: doc.postid
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
    addMessageToStoreNew(context, payload) {
        // console.log("activechatmessages: ", context.getters.activeChatMessages)
        //TODO: check if unread - increase unread messages? No, read from getters dynamically.

        //add to chats store (to be implemented fully)
        context.commit('ADD_CHATMESSAGE', payload)
        // console.log("commited message to store: ", payload.msg)
    },

    addMessageToStore(context, payload) { //OBSOLETE
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

        //add to chats store (to be implemented fully)
        context.commit('ADD_CHATMESSAGE', payload)
        // console.log("commited message to store: ", payload.msg)
    },

    sendMessage({ commit }, payload) {
        // Add a new message
        console.log("payload: ", payload)
        let chatroomid = payload.chatroom
        const isFirstMessage = payload.isfirst
        if (isFirstMessage == true) {
            const user1 = payload.from
            const user2 = payload.to
            firestore.collection('chats').doc(chatroomid).add({
                ['sub.' + user1] : true,
                ['sub.' + user2] : true
            }).then( () => {
                console.log("updated chatroom in db with subscriptions for the users")
            }).catch(function (error) {
                console.error("Error writing document, adding sub: ", error);
            });
        }
        let newMessage = {
            to: payload.to,
            from: payload.from,
            time: new firebase.firestore.Timestamp.now(),
            text: payload.text,
            read: false,
            postid: payload.postid
        }
        // chatroomMixin.getChatroomid(payload.from, payload.to);
        firestore.collection("chats").doc(chatroomid).collection("messages").add(
            newMessage)
            .then(function () {
                let messagePayload = {
                    chatroomid: chatroomid,
                    message: newMessage
                }
                commit('ADD_CHATMESSAGE', messagePayload)
                console.log("Chatroom message successfully written to firestore and added to store!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
    nullActiveChat({ commit }) {
        // this.unsubscribe();
        commit('NULL_ACTIVE_CHAT')
        console.log("nulled chat and unsubscribed to chatlistener")
    }
}

export default {
    state, //implicit state : state
    getters,
    mutations,
    actions
}