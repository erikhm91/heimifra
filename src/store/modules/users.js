import db from "@/firebase/init";
const state = {
    users: [],
    activeUser: null,
    loggedIn: false,
}

const getters = {
     //user
     activeUser: state => state.activeUser,
     loggedIn: state => state.loggedIn, //obsolete? Activeuser serves purpose
     getUsers: state => state.users, //should use to keep buffered user data in store?
     getUser: state => uid => state.users.find(obj => obj.uid == uid), //keep buffered user data in store
}

const mutations = {
    ADD_USERS(state, userArray) {
        userArray.forEach(user => state.users.push(user))
        // state.users.push(userObj)
    },
    SET_ACTIVE_USER(state, user) {
        state.activeUser = user;
    },
    UPDATE_ACTIVE_USER(state, payload) {
        if (payload.name) {
            state.activeUser.name = payload.name
        }
        if (payload.bio) {
            state.activeUser.bio = payload.bio
        }
        if (payload.rate) {
            state.activeUser.rate = payload.rate
        }
    },
    SET_LOGGED_IN(state, bool) {
        state.loggedIn = bool
    }
}
const actions = {
    fetchOwnUser(context) {
        db.collection('users').where('uid', '==', context.getters.activeUser.uid)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("fetched activeUser:", doc.data());
                    let user = doc.data()
                    let payload = {}
                    if (user.name) {
                        payload.name = user.name
                    }
                    if (user.bio) {
                        payload.bio = user.bio
                    }
                    if (user.rate) {
                        payload.rate = user.rate
                    }

                    context.commit("UPDATE_ACTIVE_USER", payload)
                    context.commit("SET_API_READY", true)
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            })




    },
    fetchUsers: (context, uidArray) => {
        //TODO: implement filter so not querying for users which are already in store! Unlikely to change during session
        //get myPosts
        db.collection("users")
            .where("uid", "in", uidArray)
            .get()
            .then(function (querySnapshot) {
                let userArray = []
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log("found user:", doc.data())
                    userArray.push(doc.data())

                });
                // console.log("setting myPosts:", myPosts);
                context.dispatch('addUsersToStore', userArray)
                console.log('finished executing fetchUsers')
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            })
    },

    addUsersToStore: (context, userArray) => {
        context.commit('ADD_USERS', userArray)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}