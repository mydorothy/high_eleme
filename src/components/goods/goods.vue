<template>
  <!--商品列表-->
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="item-list" v-for="(item,index) in goods" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-bottom-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li class="border-bottom-1px food-item" v-for="food in item.foods" @click="selectFood(food)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcarts" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'

  import {bus} from '../../common/js/bus.js'
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    components: { //注册组件
      "shopcart": shopcart,
      "cartcontrol": cartcontrol,
      "food":food
    },
    data () {
      return {
        goods: [],
        listHeight:[],
        scrollY:0,
        selectedFood:{}
      }
    },
    created () {
      // 利用on和emit的事件来实现 利用父组件(goods.vue中间人)实现子组件(cartcontrol.vue)与子组件(shopcart)之间的通讯 即：当点击cartcontrol.vue中加购物车按钮时，需要从“加”到“底部购物车按钮”有个贝塞尔运动，所以当点击加购物车按钮时，需要让shopcart.vue组件中的标签运动起来（让shopcart.vue知道点击了加按钮）
      // 监听子组件中的 cart.add（自定义事件）是否触发，触发执行
      bus.$on('cart.add', (target) => {
        this._drop(target); // 调用父组件goods.vue方法
        console.log(target);
      });
      // 活動icon
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        // 0.9版本及之前版本 response.json()是对象，1版本改成了promise
        response = response.body
        if (response.errno == 0) {
          this.goods = response.data
          console.log('goods:', this.goods)
          this.$nextTick(() => { // 与DOM相关操作写在该函数回调中，确保DOM已渲染 dom完全加载后执行
            this._initScroll();
            this._calculateHeight();
          })
        }
      });
    },
    computed:{// 计算属性
      currentIndex() {// 计算 滚动到哪个区间范围内，哪个左侧行被选中
        for(let i = 0;i<this.listHeight.length;i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() { //筛选出所有选择的商品，传递给子组件shopcart.vue,用于底部显示、计算
        let foods = [];
        this.goods.forEach((good) => { // 循环所有分类
          good.foods.forEach((food) => {// 循环所有分类下的商品
            if(food.count) {// 如果count存在（cartcontrol.vue），说明选中了该商品
              foods.push(food); // 把选中的商品组合成一个数组
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu (index,event) {//点击左侧菜单
        console.log(index,event);
        // 当是better-scroll 触发的点击事件时：_constructed为true，原声点击事件没有_constructed这个属性
        if(!event._constructed) {//pc端会触发两次点击事件：1次better-scroll,1次原生点击（此项目不会出现这种情况，课程里有这种情况，可能是版本问题  ：better-scroll:^1.8.0,课程版本：better-scroll:^0.1.7）
          return false;
        };
        let goodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = goodsList[index];
        // https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/api.html
        // this.foodsScroll.scrollTo(0,-(this.listHeight[index]),300);//滚动到指定的位置 scrollTo(x, y, time, easing)
        this.foodsScroll.scrollToElement(el,300);//滚动到指定的目标元素。 scrollToElement(el, time, offsetX, offsetY, easing)
      },
      _initScroll () {//初始化 better-scroll
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click:true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
          click:true,
          probeType: 3
          // 类型：Number，默认值：0，可选值：1、2、3，作用：有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype
        });
        //监听滚动
        this.foodsScroll.on('scroll', (pos) => {  //probeType参数必须设置，scroll事件才生效
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {//将每个分类 所在的高度记录在数组中
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');// 获取所有分类盒子
        let height = 0;
        this.listHeight.push(height);
        for(let i=0;i<foodsList.length;i++) {
          let item = foodsList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      addFood (target) {
        this._drop(target);
      },
      _drop(target) { // 一般来说 _drop 带下划线的方法是内部私有的，不带下划线的可以被外部父组件调用，这是一种编程习惯
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcarts.drop(target); // 调用子组件shopcart.vue 的方法
        });
      },
      selectFood(food) {// 点击商品行 出现商品详情页
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }/*,
    events: { // vue1.0这么写，2.0以丢弃 events、$dispatch 和 $broadcast
      'cart.add'(target) {
        console.log('target1',target);
        this._drop(target);
      }
    }*/
  }
</script>

<style lang="scss" type="text/scss">
  @import '../../css/common/mixin';
  .goods {
    display:flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width:100%;
    overflow: hidden;
    .menu-wrapper {
      flex:0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .item-list {
        display: table;
        height: 54px;
        width: 100%;
        padding:0 12px;
        margin: 0 auto;
        line-height: 14px;
        font-size: 12px;
        text-align: left;
        cursor:pointer;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text {
            @include border-none();
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
        }
        .icon {
          display:inline-block;
          vertical-align: middle;
          width:12px;
          height: 12px;
          background-size:100%;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img("decrease_3");
          }
          &.discount {
            @include bg-img("discount_3");
          }
          &.special {
            @include bg-img("decrease_3");
          }
          &.invoice {
            @include bg-img("invoice_3");
          }
          &.guarantee {
            @include bg-img("guarantee_3");
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left:14px;
        height:26px;
        line-height: 26px;
        border-left:2px solid #d9dde1;
        font-size: 12px;
        color:rgb(147,153,159);
        background: #f3f5f7;
      }
      .food-item {
        display:flex;
        margin:18px;
        padding-bottom:18px;
        &:last-child {
          @include border-none()
          margin-bottom:0;
        }
        .icon {
          flex:0 0 57px;
          margin-right:10px;
        }
        .content {
          flex: 1;
          .name {
            margin:2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color:rgb(7,17,27);
          }
          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color:rgb(147,153,159);
          }
          .desc {
            line-height: 12px;
            margin-bottom:8px;
          }
          .extra {
            .count {
              margin-right:12px;
            }
          }
          .price {
            line-height:24px;
            font-weight:700;
            .now {
              margin-right:8px;
              font-size: 14px;
              color:rgb(240,20,20);
            }
            .old {
              text-decoration:line-through;
              font-size: 10px;
              color:rgb(147,153,159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right:0;
            bottom:12px;
          }
        }
      }
    }
  }
</style>

