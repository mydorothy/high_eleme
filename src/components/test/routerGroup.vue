<template>
    <div>
      <div>
        hello,我是路由组 默认显示的内容
        <p>
          {{$route.params}}
        </p>
        <pre>
          <code>
            {{ JSON.stringify($route.params,null,2) }}
          </code>
        </pre>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'routerGroup',
    data() {
      return {
        msg:'a'
      }
    },
    created() {
      console.info('路由aaa:',this.$router)
      this.$nextTick(() => {

      });
    }
  }
</script>

<style lang="scss">

</style>
