import Vue from 'vue';
import App from './App.vue';
import './styles/app.scss';
import { BootstrapVue } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import { routes } from './routes/routes';
import { store } from './store/store';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
