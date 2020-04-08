import Vue from 'vue';
// import Vuex from 'vuex';
import db from "@/firebase/init";
const state = {
    postArray: [],
    // activeView: 'message-container',
    // myPosts: examplePosts.posts,
    // myTasks: exampletasks.tasks,
    myPosts: [],
    myPostReplies: [], //array of postreply objects. same as 'replies' collection in firestore
    myTasks: [],
}

const getters = {
    //post
    getPost: state => postid => state.postArray.find(obj => obj.id == postid),
    postArray: state => state.postArray,
    postsNotOwn: state => {
        console.log("state: ", this.state)
        return state.postArray.filter(post => post.owner != this.state.users.activeUser.uid) //not working!
    },
    myPosts: state => state.myPosts,
    myActivePosts: state => {
        return state.myPosts.filter(post => post.status == "free")
    },
    //task
    myTasks: state => state.myTasks,

    repliesForPost: state => function (postid) {
        console.log("entered repliesforpost", postid)
        console.log("all postreplies: ", state.myPostReplies)
        return state.myPostReplies.filter(reply => reply.postid == postid);
    },
    numberOfRepliesToPost: state => function (postid) {
        console.log("entered numberofrepliestopost", postid)
        console.log("postreplies: ", state.myPostReplies)
        return state.myPostReplies.filter(reply => reply.postid == postid).length
    },
}

const mutations = {
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
    SET_POST_STATUS(state, payload) {
        let post = state.postArray.find(obj => obj.id === payload.postid);
        if (post) {
            post.status = payload.status
        }
        post = state.myPosts.find(obj => obj.id === payload.postid);
        if (post) {
            post.status = payload.status
        }
        post = state.myTasks.find(obj => obj.id === payload.postid);
        if (post) {
            post.status = payload.status
        }
    },
    SET_POST_PICKED(state, payload) {
        let post = state.postArray.find(obj => obj.id === payload.postid);
        post.status = payload.status
        Vue.set(post, 'picked', payload.uid)
    },
    ADD_POST_REPLY(state, reply) {
        state.myPostReplies.push(reply)
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
    // SET_DELETE_FLAG(state, postId) { OBSOLETE
    //     // console.log("myPosts", state.myPosts, postId)
    //     let index = state.myPosts.findIndex(obj => obj.id === postId);
    //     state.myPosts[index].status = 'del'
    //     // console.log("myPosts after update: ", state.myPosts)
    // },
    //task
    ADD_TASK(state, postObj) {
        state.myTasks.push(postObj);
    },

    SET_MYTASKS(state, postArray) {
        state.myTasks = postArray
    },
    UPDATE_TASK(state, postObj) {
        let index = state.myTasks.findIndex(obj => obj.id === postObj.id);
        // console.log("Task update triggered. old task: ", state.myTasks[index])
        // state.myTasks[index] = postObj;
        Vue.set(state.myTasks, index, postObj)
        // console.log("new task: ", state.myTasks[index])
    }
}
const actions = {
    //post
    updatePostStatus(context, payload) {
        //update database with new status
        db.collection("posts").doc(payload.postid).update({
            status: payload.status
        })
            .then(function () {
                context.commit('SET_POST_STATUS', payload)
                console.log("Status for doc ", payload.postid, " successfully updated");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },

    // deletePost({ commit }, postid) { //obsolete
    //     // console.log("deleteflagPost: " + postid)
    //     commit('SET_DELETE_FLAG', postid)
    //     //update database with delete flag
    //     db.collection("posts").doc(postid).update({
    //         status: "del"
    //     })
    //         .then(function () {
    //             // console.log("Deleteflag for doc ", postid, " successfully set");
    //         })
    //         .catch(function (error) {
    //             console.error("Error writing document: ", error);
    //         });
    // },

    //task
    assignTask(context, payload) {
        context.dispatch('assignOfferToPost', payload.postid)
        context.dispatch('addPostReply', payload)
    },

    addPostReply(context, payload) {
        //create reply object to use in store etc (even though need just attributes for db)
        let reply = {
            helper: payload.helper,
            name: payload.name,
            owner: payload.owner,
            postid: payload.postid,
            text: payload.text
        }

        db.collection("replies").add({
            helper: payload.helper,
            name: payload.name,
            owner: payload.owner,
            postid: payload.postid,
            text: payload.text
        })
            .then(function () {
                console.log("added Reply doc for user: ", reply.helper);
                //update store
                context.commit('ADD_POST_REPLY', reply)
                //check status of post, update to "offer" if not already in status!

                if (context.getters.getPost(reply.postid).status == 'free') {
                    let statusPayload = {
                        postid: reply.postid,
                        status: 'offer'
                    }
                    context.dispatch('updatePostStatus', statusPayload)
                    console.log('status updated to offer for post: ', reply.postid)
                }
                console.log('no need to update status for postid: ', reply.postid)
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
    assignOfferToPost(context, postid) {
        let assignedUid = context.getters.activeUser.uid
        // console.log("assigning task to activeuser id ", assignedUid)
        // console.log("assign task payload", payload)
        db.collection("posts").doc(postid).update({
            ['offer.' + assignedUid]: true
        })
            .then(function () {
                console.log("assigned task ", postid, " to user ", assignedUid);
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
    setPostPicked(context, payload) {
        let data = {
            postid: payload.postid,
            uid: payload.uid,
            status: 'picked'
        }
        db.collection("posts").doc(data.postid).update({
            status: data.status,
            picked: data.uid
        })
            .then(function () {
                context.commit('SET_POST_PICKED', data)
                console.log("Status for doc ", data.postid, " successfully updated");
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
            ['offer.' + assignedUid]: false
        })
            .then(function () {
                // console.log("removed task ", payload.uid, " for user ", assignedUid);
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
    fetchPosts: context => { //not used, listener used instead
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
        let ref = db.collection('posts').where("owner", ">")

        ref.onSnapshot(snapshot => {

            snapshot.docChanges().forEach(change => {

                console.log("document listener triggered for posts")
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
        console.log("triggered lister for owner replies")

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
            .where("status", "in", ["free", "offer", "picked", "ownerfin", "helpfin"]) //not see 'del', 'fin' status
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
    fetchMyTasks: context => {   //obsolete not used! listener instead
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
    fetchOwnRepliesToPosts: context => {
        db.collection("replies").where("helper", "==", context.getters.activeUser.uid)
            .where("status", "in", ["offer", "picked"])
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    // postArray.push(doc.data())
                    let replyObj = doc.data()
                    context.commit('ADD_POST_REPLY', replyObj)
                    console.log("added own post reply: ", replyObj)
                });

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            })
    },
    initiateTaskListener(context) {
        let queryParam = 'offer.' + context.getters.activeUser.uid;
        // chatroomMixin.getChatroomId(context.getters.activeUser.uid, payload.chatPartner)
        let ref = db.collection('posts').where(queryParam, "==", true)

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

export default {
    state,
    getters,
    mutations,
    actions
}