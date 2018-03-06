<template>
    <!--评价组件 筛选评价条件-->
    <div class="ratingselect">
      <div class="border-bottom-1px rating-type">
        <span @click="select(2,$event)" class="block positive" :class="{'active':selectTypes==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
        <span @click="select(0,$event)" class="block positive" :class="{'active':selectTypes==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span @click="select(1,$event)" class="block negative" :class="{'active':selectTypes==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div class="switch" :class="{'on':onlyContents}" @click="toggleContent">
        <span class="icon-check_circle"></span>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  import {bus} from '../../common/js/bus.js'

  export default {
    name:'ratingselect',
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType:{
        type:Number,
        default:ALL
      },
      onlyContent:{
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data() {
      return {
        selectTypes: ALL,
        onlyContents: false
      }
    },
    computed: {
      positives() { // 过滤 评价中吐槽的评价个数
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives() { // 过滤 评价中推荐的评价个数
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    methods: {
      select(type,event) {// 点击评价类型：全部、满意、吐槽
        if (!event._constructed) {
          return;
        };
        this.selectTypes = type; // 在vue2.0中，props从父组件传递过来的selectType，不能直接写 this.selectType,需要在data()中重新声明变量赋值。vue1.0中无需在data()中声明变量,可以直接在html中使用
        bus.$emit('ratingtype.select',type); // 触发自定义事件，用来将参数传递给父组件，让父组件做相应的操作
      },
      toggleContent() { // 点击只看有内容的评价
        if (!event._constructed) {
          return;
        };
        this.onlyContents = !this.onlyContents;
        bus.$emit('content.toggle',this.onlyContents); // 触发自定义事件， 用来将参数传递给父组件
      }
    }
  }
</script>

<style lang="scss">
  @import "../../css/common/mixin.scss";

  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        &.active {
          color: #fff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
