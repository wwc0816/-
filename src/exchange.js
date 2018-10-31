// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Exchange.vue'
import router from './router/exchange'
import VueResource from 'vue-resource'
import iView from 'iview'
import common from './assets/js/common'
import 'iview/dist/styles/iview.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueResource)
Vue.prototype.$common = common;
Vue.http.headers.common['x-wesports-token'] = store.state.userstatus.token;

/* eslint-disable no-new */
new Vue({
  el: '#exchange',
  router,
  store,
  components: { App },
  template: '<App/>'
})
