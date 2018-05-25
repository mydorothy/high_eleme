import Vue from 'vue'
import Router from 'vue-router'
import VueTitle from 'vue-wechat-title'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
// @和 @component 都是在webpack.base.conf.js中配置的路径变量
import Seller from '@component/seller/seller'

import Vuetest from '@component/vuextest'
import RouterHtml from '../components/test/router'
import childRouter from '../components/test/childRouter'
import routerGroup from '../components/test/routerGroup.vue'

Vue.use(Router)
const router = new Router({
  mode:'history',//模式
  //base:__dirname, //__dirname:node里面的当前目录
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
      component: Goods,
      meta: {
        title:'商品详情页'
      }
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller,
      meta: {
        title:'商家介绍'
      }
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    //以下路由为测试
    {
      path: '/vuextest',
      name: 'vuextest',
      component: Vuetest
    },
    {//子路由
      path:'/routerHtml',
      name:'routerHtml',
      component:RouterHtml,
      children: [{
        path:'childRouter',//子路由中 path路径不能加/
        name:'childRouter',
        component:childRouter
      },
      {
        path:'test',
        name:'test',
        component:{template: `<div><div>我是test页面</div></div>`}
      },
      {
        path:'/',
        name:'content',
        component:{template:`<div>我是默认显示的内容</div>`}
      }]
    },
    {//路由组 一个页面多个路由同时显示
      path:'/routerGroup/:id', // 用正则表示 :id(\\d+)
      name:'routerGroup',
      components: {
        default: routerGroup,
        left: {template:`<div>我是路由组中的左边</div>`},//left: router-view的name属性
        right: {template:`<div>我是路由组中的右边</div>`}
      }
    }
  ]
});
//路由跳转前改变页面抬头
//静态修改两种方式：1、使用document.title。2、使用vue-wechat-title组件，，
/*router.beforeEach((to,from,next) => {
  console.log('befroeEach这个值：',to,'from:',from,'next:',next);
  if(to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '饿了么'
  }
  next();
})*/
Vue.use(VueTitle)
//动态修改：1、title的值从vuex的store里面读。2、注册一个全局指令来实现。3、给title标签加id,在路由钩子函数beforeEach()中修改document.getElementById(id).innerHTML =
/*router.beforeEach((to,from,next) => {
  console.log('这是怎么了')
  document.getElementById('title').innerHTML = '标题';
  next();
})*/


export default router

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
