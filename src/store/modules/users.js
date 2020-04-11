import db from "@/firebase/init";
import firebase from 'firebase';
const state = {
    users: [],
    activeUser: null
}

const getters = {
    //user
    activeUser: state => state.activeUser,
    
    getUsers: state => state.users, //should use to keep buffered user data in store?
    getUser: state => uid => state.users.find(obj => obj.uid == uid), //keep buffered user data in store
}

const mutations = {
    ADD_USERS(state, userArray) {
        userArray.forEach(user => state.users.push(user))
        // state.users.push(userObj)
    },
    ADD_USER(state, userObj) {
        state.users.push(userObj);
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
}
const actions = {
    async fetchOwnUser(context) {
            return db.collection('users').where('uid', '==', context.getters.activeUser.uid)
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
                        // context.commit("SET_API_READY", true)
                        return 'success'
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                })

    },
    fetchUsers: (context, uidArray) => {
        //TODO: implement filter so not querying for users which are already in store! Do not care about changes occurring within session.
        return db.collection("users")
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
    giveUserRatingOld: (context, payload) => {
        // return new Promise((resolve, reject) => {
        console.log("userrating accessed")
        let data = {
            rating: payload.rating,
            uid: payload.uid
        }
        //increment cntrate:
        const increment = firebase.firestore.FieldValue.increment(1);
        const ref = db.collection('users').where('uid', '==', data.uid)
        // Update read count
        // ref.update({ cntrate: increment }).then(function (resolve) {

        ref.update({ rate: 4 }).then(function () {
            // resolve('success!')
            console.log("successfully updated rate!");
        })
            .catch(function (error) {
                console.log("Error updating user cntrate: ", error);
                // reject(error)
            })
        // })
    },

    getUserAction(context, uid) {
        
        console.log('entered getUser action')
        let user = context.getters.getUser(uid)
        if (user) {
            return user
        }

        let users = [uid]
        return context.dispatch('fetchUsers', users).then( resolve => {
                user = context.getters.getUser(uid)
                console.log('user fetched in giveUserRating', user)
                return user
        })
        // .error( error => {
        //         console.log('error in getting user, aborting giveUserRating: ', error)
        // }
            //await api call for user, so get total.
    },

    async giveUserRating(context, payload) {
        //update database with new status
        console.log("userrating accessed")
        let data = {
            rating: payload.rating,
            uid: payload.uid
        }
        //TODO: getter which triggers api call if not in store...? or action which functions as a getter.. 
        //calculate new total rate based on user data
        // let user = context.getters.getUser(data.uid)
        // let users;
  
        // users = [data.uid]
        // if (user)
        //     context.dispatch('fetchUsers', users).then( () => {
        //         user = context.getters.getUser(data.uid)
        //         console.log('user fetched in giveUserRating', user)
        //     })
        //     // .catch( (error) => {
        //     //     console.log('error in getting user, aborting giveUserRating')
        //     // }
        //     //await api call for user, so get total.
        
        let promise = context.dispatch('getUserAction', data.uid)
        let user = await promise //will return the user, either from getter or from db :-)

        console.log('user fetched: ', user)

        //calculate rate
        // let newTotal = 0
        // let oldrate = user.cntrate * user.rate;
        // let newRating = data.rating;

        // let top = oldrate + newRating;
        // let bottomVal = user.cntrate + 1;
        // newTotal = top / bottomVal;
        let newTotal = (user.cntrate * user.rate + data.rating) / (user.cntrate + 1)
        newTotal = Math.round((newTotal + Number.EPSILON) * 10000) / 10000
        
        console.log('rounded total: ', newTotal)

        //increment cntrate:
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection("users").doc(data.uid).update({
            rate: newTotal,
            cntrate: increment
        })
            .then(function () {
                // context.commit('SET_POST_STATUS', payload)
                console.log("successfully updated rate!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}