// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// import './css/common/common.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: routers,
  template: '<App/>',
  components: { App }
})
// 初始化时，跳转到商品
//routers.push('/goods')
