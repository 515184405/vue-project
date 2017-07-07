<template>
  <div id="ratings" class="ratings-module">
    <div class="ratings-main">
        <div class="clearfix ratings-abstract">
          <div class="left ratings-l">
              <p class="ratings-score">{{seller.score}}</p>
              <p class="ratings-zonghe">综合评分</p>
              <p class="ratings-rankRate">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="right ratings-r">
            <p class="ratings-list">
              <span class="seller-title">菜品评价</span>
              <star :score="seller.foodScore"></star>
              <span class="seller-score">{{seller.foodScore}}</span>
            </p>
            <p class="ratings-list">
              <span class="seller-title">服务态度</span>
              <star :score="seller.serviceScore"></star>
              <span class="seller-score">{{seller.serviceScore}}</span>
            </p>
            <p class="ratings-list">
              <span class="seller-title">送达时间</span>
              <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
            </p>
          </div>
        </div>
        <_line></_line>
      <evaluate :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></evaluate>
      <div class="ratings-content">
        <ul class="ratings-menu">
          <li v-show="needShow(rating.rateType,rating.text)" class="rating-list border-1px" v-for="rating in ratings">
            <div class="rating-msg">
              <span class="rating-time">{{rating.rateTime | filterTime}}</span>
              <p class="rating-user">
                <span class="rating-userName">{{rating.username}}</span>
                <img class="rating-userImg" :src="rating.avatar"/>
              </p>
            </div>
            <div class="ratings-user-score">
              <star :score="rating.score"></star>
              <span v-if="rating.deliveryTime" class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <div class="rating-txt">
              <span v-if="rating.rateType === 0" class="icon-thumb_up"></span>
              <span v-if="rating.rateType === 1" class="icon-thumb_down"></span>
              <span class="rating-content">{{rating.text}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import star from '@/components/star/star';
  import _line from '@/components/_line/_line';
  import {formatDate} from '@/common/js/formatDate';
  import evaluate from '@/components/evaluate/evaluate';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    name : 'ratings',
    data(){
      return {
        ratings:[],
        selectType: ALL,
        onlyContent:true,
      }
    },
    props:['seller'],
    components:{star,_line,evaluate},
    methods:{
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL ){
          return true;
        }else{
          return this.selectType === type;
        }
      },
    },
    filters:{
      filterTime(fmt){
        return formatDate(fmt)
      }
    },
    created(){
      this.selectType = ALL;
      this.onlyContent = true;
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          //vue中的给对象扩展属性Object.assign()
          this.ratings = response.data;
          this.$nextTick(()=>{
            this.scroll = new BScroll(ratings,{
              click:true,
            })
          })
        }
      });
    },

  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  .ratings-module{
    position:absolute;
    left:0;
    top:177px;
    bottom:50px;
    width:100%;
    overflow:hidden;
    .ratings-main{
      .ratings-abstract{
        display:block;
        .ratings-l{
          width:36.666%;
          margin:18px 0;
          border-right:1px solid rgb(147,153,159);
          text-align: center;
          box-sizing:border-box;
          .ratings-score{
            font-size: 24px;
            color:rgb(255,153,0);
            line-height: 28px;
          }
          .ratings-zonghe{
            margin-top:6px;
            font-size: 12px;
            line-height: 12px;
          }
          .ratings-rankRate{
            margin-top:6px;
            font-size: 10px;
            line-height: 10px;
            color:rgb(147,153,159);

          }
        }
        .ratings-r{
          width:63.333%;
          padding:18px 0px;
          box-sizing: border-box;
          .ratings-list{
            line-height: 18px;
            width:197px;
            display: block;
            margin:0 auto;
            margin-top:2px;

          }
          .seller-title{
            font-size: 12px;
            line-height: 12px;
          }
          .seller-score{
            font-size: 12px;
            color:rgb(255,153,0);
            line-height: 12px;
            margin-left:120px;
          }
          .delivery-time{
            font-size: 12px;
            color:rgb(147,153,159);
            line-height: 12px;
          }
          .star{
            transform:scale(0.6);
            margin-top:0;
            height:16px;
            display: inline-block;
            .star-box{
              margin-left:-10px;
            }
          }
        }
      }
    }
  .ratings-content{
    .ratings-menu{
      .rating-list{
        margin:18px;
        border-top-1px(rgba(7,17,27,0.1));
        padding-bottom:18px;
        .rating-msg{
          display:flex;
          align-items:center;
          justify-content: space-between;
        .rating-time{
          font-size: 10px;
          color:rgb(147,153,159);
        }
      }
      .rating-user{
        .rating-userName{
          font-size: 10px;
          color:rgb(147,153,159);
          line-height: 12px;
        }
        .rating-userImg{
          display: inline-block;
          width:12px;
          border-radius:5px;
          height:12px;
        }
      }
      .rating-txt{
        margin-top:6px;
        display: flex;
        align-items:center;
        .rating-content{
          font-size: 12px;
          color:rgb(7,17,27);
          margin-left:4px;
        }
        .icon-thumb_down{
          font-size: 12px;
          color:rgb(147,153,159);
        }
        .icon-thumb_up{
          font-size: 12px;
          color:rgb(0,160,220);
        }
      }
      }
      .no-rating{
        font-size: 12px;
        text-align: center;
        line-height: 40px;
      }
      }
    }
    .ratings-user-score{
      .star{
        transform:scale(0.6);
        margin-top:0;
        height:16px;
        display: inline-block;
        .star-box{
          margin-left:-10px;
        }
      }
      .delivery-time{
        font-size: 12px;
        color:rgb(147,153,159);
        line-height: 12px;
        margin-left:120px;
      }
    }
  }
</style>
