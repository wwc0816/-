import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import login_store from './login_store.js';
import name_store from './name_store.js';
import name_qiniu from './qiniu_store.js';
import status_store from './status_store';

export default new vuex.Store({
    modules: {
        userstatus: login_store,
        name: name_store,
        qiniu: name_qiniu,
        status: status_store
    }
})