import Vue from 'vue'
import VueRouter from 'vue-router';
import PostView from '@/components/PostView.vue';
import PersonalPosts from '@/components/PersonalPosts.vue'
import MyTasks from '@/components/MyTasks.vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import AboutUs from '@/components/AboutUs.vue'
import Login from '@/components/profile/Login.vue'
import Signup from '@/components/profile/Signup.vue'
import { store } from '@/store/store'

Vue.use(VueRouter)

const router = new VueRouter({
    //mode: 'history',  ->will remove hash from url. will need to configure server to enable history mode (no hash)

    routes: [
        {
            path: '', component: PostView, name: 'home',
            meta: {
                requiresAuth: true
            }
        },
        { path: '/lister', component: PersonalPosts, name: 'myposts' },
        {
            path: '/oppdrag', component: MyTasks, name: 'mytasks'

            // ,children: [
            //     {
            //         path: '/chat/:id', component: ChatWindow, name: 'chat'
            //     }
            // ]

        },
        { path: '/minside', component: MyProfile, name: 'myprofile' },
        { path: '/login', component: Login, name: 'login' },
        { path: '/about', component: AboutUs, name: 'aboutus' },
        { path: '/signup', component: Signup, name: 'signup' }
    ]
})

//global route guards
router.beforeEach((to, from, next) => {
    console.log('entered beforeEach routeguard: ', to.matched.some(record => record.meta.requiresAuth))
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
            next({ name: 'login' })
        } else {

            next() // go to wherever I'm going          
        }
    } else {
        if (to.matched.some(record => record.name == 'login' || record.name == 'signup') && from.matched.some(record => record.name != 'myprofile')) {
            //redirect from login and signup if already logged in, but not trigger from myprofile (signout)
            next({ name: 'home' })
        } else {

        next() // does not require auth, make sure to always call next()!
        }
    }
})

// export router as default
export default router;


