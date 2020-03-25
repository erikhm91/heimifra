import MessageContainer from '@/components/MessageContainer.vue';
import PersonalPosts from '@/components/PersonalPosts.vue'
import MyTasks from '@/components/MyTasks.vue'
import MyProfile from '@/components/MyProfile.vue'
import AboutUs from '@/components/AboutUs.vue'
// import ChatWindow from '@/components/message/ChatWindow.vue'


export const routes = [/* 
    {path: '', component: App }, */

    { path: '', component: MessageContainer, name: 'home' },
    { path: '/myposts', component: PersonalPosts, name: 'myposts' },
    { path: '/mytasks', component: MyTasks, name: 'mytasks'
    
    // ,children: [
    //     {
    //         path: '/chat/:id', component: ChatWindow, name: 'chat'
    //     }
    // ]

    },
    { path: '/myprofile', component: MyProfile, name: 'myprofile' },
    { path: '/aboutus', component: AboutUs, name: 'aboutus' },

  
];
