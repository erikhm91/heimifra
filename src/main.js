import Vue from 'vue';
import App from './App.vue';
import './styles/app.scss';
import { BootstrapVue } from 'bootstrap-vue';
import { store } from './store/store';


Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
