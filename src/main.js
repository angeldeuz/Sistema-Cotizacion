import Vue from 'vue';
import Vuetify from 'vuetify';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://ec2-174-129-57-180.compute-1.amazonaws.com/backEnd/api/';
Vue.use(Vuetify);
Vue.config.productionTip = false;
//axios.defaults.baseURL='http://ec2-174-129-57-180.compute-1.amazonaws.com/backEnd/api/'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
