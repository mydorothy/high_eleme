<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span>{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="border-bottom-1px rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import split from '../split/split.vue'
  import {formatDate} from '../../common/js/date'
  import {bus} from '../../common/js/bus.js'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    name: 'ratings',
    props:{
      seller: {
        type: Object
      }
    },
    data () {
      return {
        scroll:null,
        ratings: [],
        // 评价组件需要传递的参数
        onlyContent: false,// 控制 只看有内容的评价
        selectType: ALL,// 评价类型
        desc: { // 评价类型的描述
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    components: {// 注册组件
      "star": star,
      "ratingselect": ratingselect,
      "split": split
    },
    methods: {
      needShow(type,text) { // type:评价类型：全部、满意、吐槽，text:只看有内容的评价
        if(this.onlyContent && !text) {
          return false;
        };
        if(this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno == 0) {
          this.ratings = response.data
          console.log('ratings', response);
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings,{
              click: true
            });
          });

        }
      });
      bus.$on('ratingtype.select', (type) => { //监听子组件ratingselect.vue中是否点击了 评价类型
//        console.log('评价类型',type);
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      });
      bus.$on('content.toggle',(onlyContent) => {//监听子组件ratingselect.vue中是否点击了 只看又能容的评价
//        console.log('只看又能容的评价',onlyContent);
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      })
    },
    filters: {//过滤，把时间戳转换为时间格式
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<!--<style lang="stylus" rel="stylesheet/stylus">-->

<!--</style>-->
<style lang="scss">
  @import "../../css/ratings.scss";
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          .title {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }
          .score {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          font-size: 0;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .delivery {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            .icon-thumb_up,.icon-thumb_down, .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }
            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }

</style>
