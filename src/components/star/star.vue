<template>
  <div class="star" :class="starSize">
    <span class="star-item" v-for="item in itemCla" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const ON = 'on'
  const OFF = 'off'
  const HALF = 'half'
  export default {
    name:'star',
    props: {
      size: {
        type: Number
      },
      score: {// 评分
        type: Number
      }
    },
    computed: {// computed计算属性
      starSize () {
        return 'star-' + this.size
      },
      itemCla () {
        let arr = []
        let onArr = Math.floor(this.score)
        for (let i = 0; i < onArr; i++) {
          arr.push(ON)
        }
        let point = String(this.score).split('.')[1]
        if (point >= 5) {
          arr.push(HALF)
        }
        if (arr.length < LENGTH) {
          arr.push(OFF)
        };
        return arr
      }
    },
    components: {

    }
  }
</script>

<style lang="scss">
  @import "../../css/common/mixin";
  .star {
    font-size: 0;
    .star-item {
      display:inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('star48_on');
        }
        &.half {
          @include bg-img('star48_half');
        }
        &.off {
          @include bg-img('star48_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-img('star36_on');
        }
        &.half {
          @include bg-img('star36_half');
        }
        &.off {
          @include bg-img('star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0
        }
        &.on {
          @include bg-img('star24_on');
        }
        &.half {
          @include bg-img('star24_half');
        }
        &.off {
          @include bg-img('star24_off');
        }
      }
    }
  }
</style>

<style lang="stylus" rel="stylesheet/stylus">

</style>
