import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import forget from '@/components/forget'
import business from '@/components/business'
import sponsor from '@/components/sponsor'
import businessDetail from '@/components/businessDetail'
import order from '@/components/order/order'
import history from '@/components/order/history'
import atPresent from '@/components/order/atPresent'
import property from '@/components/property/property'
import download from '@/components/download'
import ad from '@/components/ad'
import applyAd from '@/components/applyAd'
import editAd from '@/components/editAd'
import myAd from '@/components/myAd'
import certification from '@/components/certification'
import personal from '@/components/personal/personal'
import own from '@/components/personal/own'
import policy from '@/components/policy'
import dealAccount from '@/components/property/dealAccount'
import legalAccount from '@/components/property/legalAccount'
import merchantAccount from '@/components/property/merchantAccount'
import sponsorAccount from '@/components/property/sponsorAccount'
import record from '@/components/property/record'
import sponsorRecord from '@/components/property/sponsorRecord'
import propertyDetail from '@/components/property/propertyDetail'
import merchantApply from '@/components/merchant/merchantApply'
import sponsorApply from'@/components/merchant/sponsorApply'
import merchant from '@/components/merchant/merchant'
import merchantCoins from '@/components/merchant/coins'
import merchantUserList from '@/components/merchant/userList'
import merchantRecord from '@/components/merchant/record'
import help from '@/components/static/help'
import coinsApply from '@/components/static/coinsApply'
import api from '@/components/static/api'

import coins from '@/components/coinExchange/index'
import exchange from '@/components/coinExchange/exchange'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: '/register',
          name: 'register',
          component: register
        },
        {
          path: '/forget',
          name: 'forget',
          component: forget
        },
        {
          path: '/business',
          name: 'business',
          component: business
        },
        {
          path: '/businessDetail/:id',
          name: 'businessDetail',
          component: businessDetail
        },
          {
            path:'/sponsor',
              name:'sponsor',
              component:sponsor

          },
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/property',
          name: 'property',
          component: property,
          redirect: '/property/dealAccount',
          children:[
            {
              path: '/property/dealAccount',
              name: 'dealAccount',
              component: dealAccount
            },
            {
              path: '/property/legalAccount',
              name: 'legalAccount',
              component: legalAccount
            },
            {
              path: '/property/merchantAccount',
              name: 'merchantAccount',
              component: merchantAccount
            },
              {
                path:'/property/sponsorAccount',
                  name:'sponsorAccount',
                  component:sponsorAccount
              }
          ]
        },
        {
          path: '/record',
          name: 'record',
          component: record
        },{
        path:'/sponsorRecord',
              name:'sponsorRecord',
              component:sponsorRecord
          },
        {
          path: 'propertyDetail',
          name: 'propertyDetail',
          component: propertyDetail
        },
        {
          path: '/download',
          name: 'download',
          component: download
        },
        {
          path: '/ad',
          name: 'ad',
          component: ad
        },
        {
          path: '/applyAd',
          name: 'applyAd',
          component: applyAd
        },
        {
          path: '/editAd/:id',
          name: 'editAd',
          component: editAd
        },
        {
          path: '/myAd',
          name: 'myAd',
          component: myAd
        },
        {
          path: '/certification',
          name: 'certification',
          component: certification
        },
        {
          path: '/personal',
          name: 'personal',
          component: personal
        },
        {
          path: '/own/:id',
          name: 'own',
          component: own
        },
        {
          path: '/policy',
          name: 'policy',
          component: policy
        },
        {
          path: '/history',
          name: 'history',
          component: history
        },
        {
          path: '/atPresent',
          name: 'atPresent',
          component: atPresent
        },
        {
          path: '/merchantApply',
          name: 'merchantApply',
          component: merchantApply
        },
          {
            path:'/sponsorApply',
              name:'sponsorApply',
              component:sponsorApply
          },
        {
          path: '/merchant',
          name: 'merchant',
          component: merchant,
          redirect: '/merchant/coins',
          children:[
            {
              path: '/merchant/coins',
              name: 'merchantCoins',
              component: merchantCoins
            },
            {
              path: '/merchant/userList',
              name: 'merchantUserList',
              component: merchantUserList
            },
            {
              path: '/merchant/record',
              name: 'merchantRecord',
              component: merchantRecord
            }
          ]
        },
        {
          path: '/help',
          name: 'help',
          component: help
        },
        {
          path: '/coinsApply',
          name: 'coinsApply',
          component: coinsApply
        },
        {
          path: '/api',
          name: 'api',
          component: api
        }
      ]
    },
    {
      path: '/coins',
      name: 'coins',
      component: coins,
      children:[
        {
          path: '/coins/exchange/:currency',
          name: 'exchange',
          component: exchange
        }
      ]
    }
  ]
})
