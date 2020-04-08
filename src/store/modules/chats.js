import db from "@/firebase/init";
const state = {
    activeChatroom: null,
    activeChatMessages: [],
    chats: []
}

const getters = {
    //chat
    chatroom: state => room => state.chatrooms.find(obj => obj.room == room),
    activeChatroom: state => state.activeChatroom,
    activeChatMessages: state => state.activeChatMessages.slice().reverse(),
    activeChatMessagesUnreversed: state => state.activeChatMessages,
}

const mutations = {
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
        let chatroom
        if (state.chats.length > 0) {
            chatroom = state.chats.find(obj => obj.room === payload.room);
        } else {
            //create new chat
            chatroom = {
                "room": payload.room,
                "messages": []
            }
            state.chats.push(chatroom);
        }
        console.log(chatroom)
        chatroom.messages.push(payload.msg);
        console.log("updated chats state ", state.chats)

        // let messagePayload = {
        //     room : chatroomid,
        //     msg : newMessage
        // }

        // if (state.activeChatroom != payload.chatroomid) {
        //     state.activeChatroom = payload.chatroomid;
        // }
        // console.log("adding chatmessage: ", payload)

        // state.activeChatMessages.push(payload.msg)
        // console.log("message added to chat: ", payload.msg)
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

        //add to chats store (to be implemented fully)
        context.commit('ADD_CHATMESSAGE', payload)
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
    }
}

export default {
    state, //implicit state : state
    getters,
    mutations,
    actions
}