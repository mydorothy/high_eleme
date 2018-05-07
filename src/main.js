// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import VueResource from 'vue-resource'
import store from './store/vuex'
import axios from 'axios'
Vue.prototype.$axios = axios //Vue.prototype 为注册全局方法  其他任何组件都可引用

Vue.use(VueResource)

// import './css/common/common.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  store,
  /*template: '<App/>',//模板，App就是import过来的App,,,vue1.0写法
  components: { App } // 组件的全局定义 vue1.0写法 */
  render:x => x(App) // 2.0新增，，render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
})
// 初始化时，跳转到商品
//routers.push('/goods')
