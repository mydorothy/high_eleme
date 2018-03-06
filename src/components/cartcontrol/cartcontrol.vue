<template>
  <!--加减按钮组件-->
    <div class="cartcontrol">
      <transition name="slide-fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <i class="icon-remove_circle_outline inner"></i>
      </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="icon-add_circle cart-add" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {bus} from '../../common/js/bus.js'
  export default {
    name:'cartcontrol',
    props: {
      food: {
        type: Object
      }
    },
    methods:{
      addCart(event) { //商品右侧 加
        if(!event._constructed) {// 不是 better-scroll 派发的事件 return,防止重复点击
          return false;
        };
        console.log('click');
        if(!this.food.count) {
          Vue.set(this.food,'count',1);//当要给 food这个对象增加一个不存在的属性count（自定义的属性）时，需要用  Vue.set()这个方法才可以
          //this.food.count = 0;
        } else {
          this.food.count++;
        };
        //this.$dispatch('cart.add',event.target); //vue2中$dispatch 和 $broadcast 已经被弃用。
        bus.$emit('cart.add',event.target); // 触发自定义事件
      },
      decreaseCart(event) {//商品右侧 减小
        if(!event._constructed) {
          return false;
        };
        if(this.food.count) {
          this.food.count--;
        }
      }
    },
    created() {
      //console.log(this.food);
    }
  }
</script>

<style lang="scss">
  .cartcontrol {
    .cart-decrease {
      display:inline-block;
      padding:6px;
      transform: translate3d(0, 0, 0);
      & .inner {
        display:inline-block; /*要旋转rotate(180deg)的话必须设置为块元素*/
        line-height: 24px;
        font-size: 24px;
        color:rgb(0,160,220);
        transform: rotate(0deg);
        transition: all .5s ease;
      }
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active { /*进入时运动*/
      transition: all .5s ease;
    }
    .slide-fade-leave-active { /*离开时运动*/
      transition: all .5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
      /* .slide-fade-leave-active for below version 2.1.8 */ { /*离开*/
      transform: translate3d(24px, 0, 0);
      opacity: 0;
      & .inner {
        transform: rotate(180deg);
        transition:all .5s ease;
      }
    }

    .cart-count {
      display:inline-block;
      vertical-align: top;
      width:12px;
      padding-top:6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color:rgb(147,153,159);
    }
    .cart-add {
      display:inline-block;
      padding:6px;
      line-height: 24px;
      font-size: 24px;
      color:rgb(0,160,220);
    }
  }
</style>
