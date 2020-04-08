import PostView from '@/components/PostView.vue';
import PersonalPosts from '@/components/PersonalPosts.vue'
import MyTasks from '@/components/MyTasks.vue'
import MyProfile from '@/components/profile/MyProfile.vue'
import AboutUs from '@/components/AboutUs.vue'
import Login from '@/components/profile/Login.vue'
import Signup from '@/components/profile/Signup.vue'


// import ChatWindow from '@/components/message/ChatWindow.vue'


export const routes = [/* 
    {path: '', component: App }, */

    { path: '', component: PostView, name: 'home' },
    { path: '/myposts', component: PersonalPosts, name: 'myposts' },
    {
        path: '/mytasks', component: MyTasks, name: 'mytasks'

        // ,children: [
        //     {
        //         path: '/chat/:id', component: ChatWindow, name: 'chat'
        //     }
        // ]

    },
    { path: '/myprofile', component: MyProfile, name: 'myprofile' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/aboutus', component: AboutUs, name: 'aboutus' },
    { path: '/signup', component: Signup, name: 'signup' }


];
