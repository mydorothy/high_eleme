<template>
  <header class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="activity" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="activity-num" v-if="seller.supports" @click="showDetial">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetial">
      <span class="img"></span>
      <span class="text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" alt="">
    </div>
    <!--弹框-->
    <transition name="fade">
    <div v-show="detailShow" class="modal-detail">
      <div class="content">
        <h3>{{seller.name}}</h3>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="item in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="close" @click="hideDetail">
        <span class="icon-close"></span>
      </div>
    </div>
    </transition>
  </header>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'star': star
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetial () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="scss" >
  @import '../../css/common/mixin';
  .header {
    color:#fff;
    position: relative;
    overflow: hidden;
    background:rgba(7,17,27,0.5);
    .content-wrapper {
      padding:24px 12px 18px 24px;
      font-size: 0;
      position: relative;
      .avatar,.content {
        display:inline-block;
        vertical-align: middle;
        font-size: 14px;
      }
      .avatar {
        img {
          border-radius:2px;
        }
      }
      .content {
        margin-left:16px;
        .title {
          padding:2px 0 8px;
          .brand {
            display:inline-block;
            vertical-align: top;
            width:30px;
            height:18px;
            @include bg-img('brand');
            background-size:100%;
            background-repeat: no-repeat;
          }
          .name {
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
            padding-left:6px;
          }
        }
        .description {
          font-size: 12px;
          line-height: 12px;
          margin-bottom:10px;
        }
        .activity {
          .icon {
            display:inline-block;
            vertical-align: middle;
            width:12px;
            height: 12px;
            background-size:100%;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-img("decrease_1");
            }
            &.discount {
              @include bg-img("discount_1");
            }
            &.special {
              @include bg-img("decrease_1");
            }
            &.invoice {
              @include bg-img("invoice_1");
            }
            &.guarantee {
              @include bg-img("guarantee_1");
            }
          }
          .text {
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .activity-num {
        height: 24px;
        line-height: 24px;
        padding:0px 8px;
        position: absolute;
        bottom:18px;
        right:12px;
        background: rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 12px;
        .count {
          font-size: 10px;
          vertical-align: top;
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          line-height: 24px;
          margin-left:2px;
        }
      }
    }
    .bulletin-wrapper {
      padding:0 22px 0 12px;
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: rgba(7,17,27,0.2);
      font-size: 10px;
      position: relative;
      .img {
        display:inline-block;
        width:22px;
        height: 12px;
        @include bg-img('bulletin');
        background-size: 100%;
        vertical-align: middle;
      }
      .text {
        margin:0 4px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        right:12px;
        top:calc(50% - 6px);
      }
    }
    .bg {
      position: absolute;
      top:0;
      left:0;
      z-index: -1;
      width:100%;
      height:100%;
      overflow: hidden;
      filter:blur(10px);
    }
    /*vue css过渡 弹框过渡动画*/
    /*fade： <transition>的name名字*/
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .modal-detail {
      position: fixed;
      top:0;
      left: 0;
      width:100%;
      height:100%;
      overflow: auto;
      z-index: 100;
      -webkit-backdrop-filter: blur(10px);// 会让背景底下的内容模糊，只适用于ios 安卓无法实现， 优雅降级
      background-color: rgba(7,17,27,0.8);

      // 如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。
      // 以下两种写法：
      /*display:flex;
      flex-flow:column;
      .content {
        flex:1;
      }
      .close {
        flex: 0.1;
      }*/
      /*.content {
        width: 100%;
        min-height: 100%;
        padding-top: 64px;
        padding-bottom: 64px;
      }
      .close {
        position:relative;
        width:32px;
        height:32px;
        clear:both;
        margin-top:-64px;
      }*/

      .content {
        width: 100%;
        min-height: 100%;
        padding-top: 64px;
        padding-bottom: 64px;
        h3 {
          text-align: center;
          font-size: 16px;
          line-height: 16px;
          font-weight: 800;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          text-align: center;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            height: 2px;
            position: relative;
            top: 6px;
            background: rgba(255,255,255,0.2);
          }
          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          width: 80%;
          margin:0 auto;
          li {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0
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
                @include bg-img("decrease_2");
              }
              &.discount {
                @include bg-img("discount_2");
              }
              &.special {
                @include bg-img("decrease_2");
              }
              &.invoice {
                @include bg-img("invoice_2");
              }
              &.guarantee {
                @include bg-img("guarantee_2");
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width:80%;
          margin:0 auto;
          p {
            padding: 0 12px;
            line-height: 24px;
            font-size: 12px;
          }
        }
      }
      .close {
        position:relative;
        width:32px;
        height:32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }

    }
  }
</style>

<style  lang="stylus" rel="stylesheet/stylus">

  .header
    /*background-color:#999;*/
</style>
