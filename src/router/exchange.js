import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/coinExchange/index'
import exchange from '@/components/coinExchange/exchange'

// import exchange from '@/components/coinExchange/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/exchange',
      children:[
        {
          path: '/exchange/:currency',
          name: 'exchange',
          component: exchange
        }
      ]
    }
  ]
})
