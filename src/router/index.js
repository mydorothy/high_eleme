import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
// @和 @component 都是在webpack.base.conf.js中配置的路径变量
import Seller from '@component/seller/seller'

import Vuetest from '@component/vuextest'

Vue.use(Router)
export default new Router({
  linkActiveClass: 'actives',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/vuextest',
      name: 'vuextest',
      component: Vuetest
    }
  ]
})

/*
以下方法無法实现
// 定义路由
const router = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  }
]
// 创建路由实例
const Routers = new Router({
  routers: router // （缩写）相当于 routes: routes
})
// 导出，供main.js使用
export default Routers
*/
