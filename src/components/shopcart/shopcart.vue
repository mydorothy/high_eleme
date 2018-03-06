<template>
  <!--底部购物车-->
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" v-bind:class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" @click.stop.prevent="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!--加购物车的运动轨迹-->
    <div class="ball-container">
      <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div v-for="ball in balls" v-show="ball.show" v-bind:key="ball.id" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="border-bottom-1px food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition name="fade">
      <!--弹框背景-->
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
    export default {
      name:'cart',
      components:{
        'cartcontrol':cartcontrol
      },
      data() {
        return {
          balls:[
            {
              id:0,
              show: false
            },
            {
              id:1,
              show: false
            },
            {
              id:2,
              show: false
            },
            {
              id:3,
              show: false
            },
            {
              id:4,
              show: false
            }
          ],
          dropBalls:[],// 已经下来的小球
          fold: false // 控制购物车弹框是否出现
        }
      },
      props:{
        selectFoods: {
          type:Array,
          default() {
            return [];
          }
        },
        deliveryPrice: {// 配送费
          type:Number,
          default:0
        },
        minPrice: { // 起送价
          type:Number,
          default:0
        }
      },
      computed: {
        totalPrice() { // 总价格
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount() {// 总数量
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc() { //右下角显示
          if(this.totalPrice === 0) {
            //return '￥'+this.minPrice+'元起送';
            return `￥${this.minPrice}元起送`;// es6的新写法
          } else if(this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice;
            return `还差${diff}起送`;
          } else {
            return '去结算'; // 没有变量的情况下不能用 ``反单引号，会报错
          };
        },
        payClass() {// 右下角 去结算背景色
          if(this.totalPrice >= this.minPrice) {
            return 'enough';
          } else {
            return 'not-enough';
          }
        },
        listShow() {//控制购物车弹框显示与隐藏
          if(!this.totalCount) {
            this.fold = true;
            return false;
          };
          let show = !this.fold;
          if(show) {
            this.$nextTick(() => {
              if(!this.scroll) {// 弹框内需要超出部分可滑动
                this.scroll = new BScroll(this.$refs.listContent,{
                  click:true
                })
              } else {
                this.scroll.refresh();
              };
            });

          }
          return show;
        }
      },
      methods: {
        drop(el) {
          for(let i=0;i<this.balls.length;i++) {
            let ball = this.balls[i];
            if(!ball.show) { // 取出为false的小球，保存到dropballs
              ball.show = true;
              ball.el = el;
              this.dropBalls.push(ball);
              console.log('dropballs1:',ball);
              return;
            };
          }
        },
        /*transitions:{ vue1.0写法
          drops: {
            beforeEnter(el) {
              console.log('前');

            },
            enter(el) {
              console.log('enter');
            },
            afterEnter(el) {
              console.log('afterEnter');
            }
          }
        },*/
        // JavaScript 运动钩子
        beforeEnter: function (el) {// 过渡进入// 设置过渡进入之前的组件状态
          /*eslint-disable no-unused-vars*/
          let rf = el.offsetHeight;
          console.log('beforeEnter');
          let count = this.balls.length;
          console.log('dropBalls:',this.dropBalls);
          while (count--) {
            let ball = this.balls[count];
            if(ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            };
          };
        },
        // 此回调函数是可选项的设置
        // 与 CSS 结合时使用
        enter: function (el, done) {// // 设置过渡进入完成时的组件状态
          console.log('enter');
          /*eslint-disable no-unused-vars*/
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          });
          done(); // 回调函数，告诉vue这个函数执行完成了，可以执行下一个了，防止同步执行运动效果
        },
        afterEnter: function (el) {// 设置过渡进入完成之后的组件状态
          console.log('afterEnter');
          // shift 移除数组中的第一个项并返回该项
          let balls = this.dropBalls.shift();//这个必须写在setTimeout外面（有this）
          const timeout = setTimeout(() => { //因为还在运动中，所以需要运动结束后才能隐藏
            console.log('2',balls);
            if(balls) {
              balls.show = false;
              el.style.display = 'none';
            }
            clearTimeout(timeout);
          },400);
        },
        toggleList() {// 点击显示购物车弹框
          if(!this.totalCount) {
            return;
          };
          this.fold = !this.fold;
        },
        hideList() {//隐藏购物车弹框 （listShow）
          this.fold = true;// 为true时隐藏
        },
        empty() {// 点击清空购物车
          this.selectFoods.forEach((food) => {
            food.count = 0;
          })
        },
        pay() {
          if(this.totalPrice < this.minPrice) {
            return;
          };
          alert(`需要支付${this.totalCount}元`);
        }
      }
    }
</script>

<style lang="scss">
    @import "../../css/common/mixin.scss";
  .shopcart {
    position: fixed;
    left:0;
    bottom:0;
    z-index: 50;
    width:100%;
    height:48px;
    .content {
      display:flex;
      font-size: 0;
      color:#ccc;
      background: #141d27;
      color:rgba(255,255,255,0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display:inline-block;
          position: relative;
          top:-10px;
          margin:0 12px;
          padding:6px;
          width:56px;
          height:56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background:#141d27;
          .logo {
            width:100%;
            height:100%;
            border-radius: 50%;
            background:#2b343c;
            text-align: center;
            &.highlight {
              background:rgb(0,160,220);
             .icon-shopping_cart {
               color:#fff;
             }
            }
            .icon-shopping_cart {
              font-size: 24px;
              line-height: 44px;
              color:#80858a;
            }
          }
        }
        .num {
          position: absolute;
          top:0;
          right:0;
          width:24px;
          height:16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color:#fff;
          background:rgb(240,20,20);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top:12px;
          line-height: 24px;
          padding-right:12px;
          box-sizing:border-box;
          border-right:1px solid rgba(255,255,255,0.1);
          font-size:16px;
          font-weight: 700;
          &.highlight {
            color:#fff;
          }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 10px;
        }
      }
      .content-right {
        flex:0 0 105px;
        width:105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          &.enough {
            background:#00b43c;
            color:#fff;
          }
          &.not-enough {
            background:#2b333b;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left:32px;
        bottom:22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
        .inner {
          width:16px;
          height:16px;
          border-radius: 50%;
          background:rgb(0,160,220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
      width:100%;
      transform: translate3d(0,-100%,0);
      /* 设置持续时间和动画函数 */
      &.fold-enter-active { /*进入时运动*/
        transition:all .5s;
      }
      &.fold-leave-active { /*离开时运动*/
        transition:all .5s;
      }
      &.fold-enter, &.fold-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ { /*离开*/
        transform:translate3d(0,0,0);
      }
      .list-header {
        height:40px;
        line-height:40px;
        padding:0 18px;
        background:#f3f5f7;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .title {
          float:left;
          font-size: 14px;
          color:rgb(7,17,27);
        }
        .empty {
          float:right;
          font-size: 12px;
          color:rgb(0,160,220);
        }
      }
      .list-content {
        padding:0 18px;
        max-height:217px;
        background:#fff;
        overflow: hidden;
        .food {
          position: relative;
          padding:12px 0;
          box-sizing: border-box;
          .name {
            line-height: 24px;
            font-size: 14px;
            color:rgb(7,17,27);
          }
          .price {
            position: absolute;
            right:90px;
            bottom:12px;
            line-height: 24px;
            font-size: 14px;
            font-weight:700;
            color:rgb(240,20,20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right:0;
            bottom:6px;
          }
        }
      }
    }
    .list-mask {
      position: fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: -2;
      opacity: 1;
      background: rgba(7,17,27,0.6);
      transition:all 0.5s;
      &.fade-enter,&.fade-leave-to {
        background: rgba(7,17,27,0);
      }
    }
  }
</style>
