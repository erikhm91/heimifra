<template>
  <div>

    <ul class="nav nav-tabs nav-fill">
      <li class="nav-item">
        <a class="nav-link" @click="setActive('myLists')" :class="{ active: myListsClicked}" href="#">Mine lister</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActive('myTasks')" :class="{ active: myTasksClicked}" href="#">Mine oppdrag</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="setActive('myProfile')" :class="{ active: myProfileClicked}" href="#">Min profil</a>
      </li>
    </ul>

    <personal-posts v-if="myListsClicked"></personal-posts>
    <my-profile v-if="myProfileClicked"></my-profile>
    <my-tasks v-if="myTasksClicked"></my-tasks>

  </div>
</template>

<script>
import PersonalPosts from "./PersonalPosts.vue";
import MyProfile from "./MyProfile.vue";
import MyTasks from "./MyTasks.vue";

export default {
    data() {
        return {
            myListsClicked: true,
            myTasksClicked: false,
            myProfileClicked: false
        }
    },
    components: {
        personalPosts: PersonalPosts,
        myProfile: MyProfile,
        myTasks: MyTasks
    },
    methods: {
        setActive(view) {
            if (view == 'myLists') {
                this.myListsClicked = true;
                this.myTasksClicked = false;
                this.myProfileClicked = false;
            } else if (view == 'myTasks') {
                 this.myListsClicked = false;
                this.myTasksClicked = true;
                this.myProfileClicked = false;
            } else if (view == 'myProfile') {
                 this.myListsClicked = false;
                this.myTasksClicked = false;
                this.myProfileClicked = true;
            }
        }
    }


};
</script>

<style scoped>
</style>