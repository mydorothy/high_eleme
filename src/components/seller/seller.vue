<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="border-bottom-1px desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <!--收藏-->
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="border-bottom-1px content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="item in seller.supports" class="border-bottom-1px support-item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" class="pic-item">
              <img v-bind:src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="border-bottom-1px title">商家信息</h1>
        <ul>
          <li v-for="info in seller.infos" class="border-bottom-1px info-item">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import {saveToLocal,loadFromLocal} from '../../common/js/store' // 注册共用方法
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      "star": star,
      "split": split
    },
    data () {
      return {
        favorite:loadFromLocal(this.seller.id,'favorite',false) // 收藏的状态值
      }
    },
    computed: {
      favoriteText() {
        return this.favorite?'已收藏':'收藏';
      }
    },
    methods: {
      _initScroll() {// 商家介绍滚动
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {// 商家实景图片左右滚动
        if(this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';//必须要给picWrapper下的ul设置width，否则无法滚动
          this.$nextTick(() => {
            if(!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper,{
                scrollX: true,
                eventPassthrough: 'vertical' // 当横轴滚动时，如想使用系统立轴滚动并在横轴上生效，请开启  （关闭默认方向滚动（scrollY））
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite(event) {// 点击收藏按钮
        if (!event._constructed) {//防止重复点击的
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id,'favorite',this.favorite); // 将收藏的状态存储到localstorage
      }
    },
    created () {// created 这个钩子在实例被创建之后被调用, 也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() { // mounted() {} ==  vue1.0的 ready(){}。 vue2.0中不存在 ready() {}了 //这里是vue初始化完成后执行的函数
      // 每次初始化该页面时都会执行
      console.log('初始化');
      this._initScroll();
      this._initPics();
    },
    watch: {
      'seller'() {// 监听 seller这个参数是否加载完毕, 只执行一次
        console.log('监听seller');
        this._initScroll();
        this._initPics();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  @import "../../css/common/mixin.scss";
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc {
        padding-bottom: 18px;
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
             border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
           }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          font-size: 0;
          &:last-child {
            @include border-none();
          }
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-img('decrease_4')
          }
          &.discount {
            @include bg-img('discount_4')
          }
          &.guarantee {
            @include bg-img('guarantee_4')
          }
          &.invoice {
            @include bg-img('invoice_4')
          }
          &.special {
            @include bg-img('special_4')
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
               margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        &:last-child {
          @include border-none();
        }
      }
    }
  }
</style>
