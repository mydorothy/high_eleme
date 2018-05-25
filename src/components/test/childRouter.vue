<template>
    <div class="childRouter">
      <div>我是子路由</div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'child',
    data() {
      return {

      }
    },
    created() {
      console.log('路由111:',this.$route)
    }
  }
</script>

<style lang="scss">

</style>
