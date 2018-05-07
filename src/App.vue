<template>
  <div id="app">
    <!--vue-wechat-title组件指定title标题-->
    <div v-wechat-title="$route.meta.title"></div>
    <headers v-bind:seller="seller"></headers>
    <div class="nav">
      <ul class="border-bottom-1px">
        <li>
          <router-link to="/goods">商品</router-link>
        </li>
        <li>
          <router-link to="/ratings">评论</router-link>
        </li>
        <li>
          <router-link to="/seller">商家</router-link>
        </li>
      </ul>
    </div>
    <!-- 路由出口 -->
    <!-- <router-view>路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view v-bind:seller="seller"></router-view>
    </keep-alive>
    <!-- <keep-alive> 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。(加上后route切换时会保留组件状态) ，vue1.0写法：<router-view keep-alive></router-view> -->

    <footers></footers>

  </div>
</template>

<script type="text/ecmascript-6">
/* import header from './components/header'
import footer from './components/footer  /*import {apiObj} from './js/api.js'
apiObj.index();
apiObj.cart()();
export default {
  name: 'app',
  components:{
    header,
    footer
  }
} */


import headers from './components/header/header.vue'
import footer from './components/footer.vue'

import {urlParse} from './common/js/util'
export default {
  components: {
    headers,
    'footers': footer
  },
  data () {
    return {
      seller: {
        id: (function () {
          return urlParse().id;
        })() // 从url中取出id
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id='+this.seller.id).then((response) => { //将从url中获取的商家id传递给后台获取数据
      response = response.body;
      console.log(this.seller);
      if (response.errno == 0) {
        //this.seller = response.data;
        // http://blog.csdn.net/qq_30100043/article/details/53422657
        // es6 Object.assign方法用于对象的合并，Object.assign(target, source1, source2,……):将源对象(source)的所有可枚举属性，复制到目标对象(target)
        // 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
        //给对象扩展属性,将 this.seller和response.data 合并起来赋值给 {}空对象，返回给 =左边this.seller
        this.seller = Object.assign({},this.seller,response.data);
      }
    })






    //测试使用 axios :用来做ajax接口请求，vue2.0后推荐使用 axios,vue-resource不更新了
//    axios不支持jsonp，所以不能解决跨域问题，像楼上就是用的CORS(跨域资源共享)方案解决的跨域问题。
    this.$axios.get('https://api.yya.gs/dwz_create',{params:{
      api: "sina",
      url: 'http://www.baidu.com'
    }}).then((data) => {
      console.log('data:',data);
    }).catch((err) => {
      console.log('err:',err);
    })
    // 一次性并发多个请求
    let a = () => {
      return this.$axios.get('http://datainfo.duapp.com/shopdata/getclass.php')
    }
    let b = () => {
      return this.$axios.get('http://datainfo.duapp.com/shopdata/getclass.php')
    }
    this.$axios.all([a(),b()]).then(data => {
      //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
      console.log('全部执行完成：',data);
    }).catch(err => {
      console.log('错误：',err);
    })
    //axios可以通过配置（config）来发送请求
    this.$axios({
      method:'GET',
      url:'/api/seller',
      data:{
        id:'123'
      }
    }).then((data) => {
      console.log('通过配置来发送请求',data);
    })
    // 请求方式的别名,注意：当使用别名方法的时候，url,method,data这几个参数不需要在配置中声明
    /*axios.request(config);
    axios.get(url[,config]);
    axios.delete(url[,config]);
    axios.head(url[,config]);
    axios.post(url[,data[,config]]);
    axios.put(url[,data[,config]])
    axios.patch(url[,data[,config]])*/
    //设置默认配置，对所有请求都有效   全局默认配置
    this.$axios.defaults.baseURL = 'http://api.exmple.com';
    //当创建实例的时候配置默认配置
    var instance = this.$axios.create({
      baseURL: 'https://api.example.com'
    });


    /*this.$axios({
      url:'http://datainfo.duapp.com/shopdata/getclass.php',
      method:'GET',
      data:{S
        api: "sina",
        url: 'http://www.baidu.com'
      }
    }).then((data) => {

    }).catch(err => {
      console.log('err1:',err);
    })*/
  },
  mounted() {

  }
}
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">
  stylus 预编译我配置好了，但在此项目中未使用
 .nav
  flex: 1
</style>-->
<style lang="scss">
  /*在这里引入的css 此页面的子组件都会受到影响，子组件与子组件之间不同时显示在页面上时，不受影响*/
  @import './css/common/mixin';
  @import './css/common/common';
  @import './css/main.scss';
</style>
