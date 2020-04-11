import Vue from 'vue';
import App from './App.vue';
import './styles/app.scss';
import { BootstrapVue } from 'bootstrap-vue';
// import VueRouter from 'vue-router';
// import { routes } from './routes/routes';
import router from './routes/routes';
import { store } from './store/store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app = null;
//wrap vue app to not reinititalize everything on a refresh.


//wait for firebase auth to init before creating the app
//detects when theres a change in auth.


firebase.auth().onAuthStateChanged((user) => {
  // let user = null;
  console.log("auth state changed!", firebase.auth())

  let firebaseuser = firebase.auth().currentUser
  console.log("current user: ", firebaseuser)


  // if (store.getters.apiReady == false) {
  //   //user is loggin in, do not refresh page.
  // } else {
  //build page

  if (user) {
    console.log(user)
    store.commit('SET_LOGGED_IN', true)
    store.commit('SET_ACTIVE_USER', {
      uid: user.uid,
      email: user.email,
      name: null,
      bio: null,
    })

    store.dispatch('initState')

  } else {
    // store.commit('SET_ACTIVE_USER', null)
    // store.commit('SET_LOGGED_IN', false)
  }

  console.log("app:", app)
  //init app if not created
  if (!app) {
    console.log("new instance of app generated")

    // Vue.use(VueRouter);
    Vue.use(BootstrapVue);

    // const router = new VueRouter({
    //   routes
    //   // ,mode: 'history'  ->will remove hash from url. will need to configure server to enable history mode (no hash)
    // });


    app = new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')

  }
  // }
})
