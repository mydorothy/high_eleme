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
  template: '<App/>',
  components: { App }
})
// 初始化时，跳转到商品
//routers.push('/goods')
