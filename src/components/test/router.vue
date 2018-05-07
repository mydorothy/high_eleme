<template>
    <div class="router">
      <div>我是父路由</div>
      <div>{{$route.name}}</div>
      <div>{{msg}}</div>
      <router-link to="/routerHtml/childRouter">点击跳转到child子路由</router-link>
      <router-link to="/routerHtml/test">点击跳转到test子路由</router-link>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'route',
    data() {
      return {
        msg:'hello world'
      }
    }
  }
</script>

<style lang="scss">

</style>
