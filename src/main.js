// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import 'babel-polyfill'
import iView from 'iview'
import common from './assets/js/common'
import 'iview/dist/styles/iview.css'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueResource)
Vue.prototype.$common = common;
Vue.http.headers.common['x-wesports-token'] = store.state.userstatus.token;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
