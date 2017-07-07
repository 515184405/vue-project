<template>
  <transition name="clip">
  <div id="shopDetail" v-show="foodDetail" class="shopDetail">
      <div class="shopBox">
        <span @click="back" class="back icon-arrow_lift"></span>
        <div class="sd-img">
          <img :src="food.image" height="375" width="100%" alt=""/>
        </div>
        <div class="sd-msg">
          <h1 class="sd-title">{{food.name}}</h1>
          <p class="sd-data">
            <span class="sd-sales">月售{{food.sellCount}}份</span>
            <span class="sd-score">好评率{{food.rating}}%</span>
          </p>
          <div class="sd-main">
            <p class="sd-money">
              <span class="sd-m1">￥{{food.price}}</span>
              <s class="sd-m2" v-if="food.oldPrice">￥{{food.oldPrice}}</s>
            </p>
            <div @click="addFirst" class="sd-btn" v-if="!food.count || food.count===0">加入购物车</div>
            <btnAll v-show="food.count > 0" class="btnAll" :food="food"></btnAll>
          </div>
        </div>
        <_line></_line>
        <div class="sd-intro">
          <h1 class="intro-title">商品介绍</h1>
          <p class="intro-txt">{{food.info}}</p>
        </div>
        <_line></_line>
        <div class="food-eval">
          <h1 class="intro-title">商品评价</h1>
        </div>
        <evaluate :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></evaluate>
        <div class="ratings">
          <ul class="ratings-menu">
             <li v-show="needShow(rating.rateType,rating.text)" class="rating-list border-1px" v-for="rating in food.ratings">
                <div class="rating-msg">
                   <span class="rating-time">{{rating.rateTime | filterTime}}</span>
                   <p class="rating-user">
                     <span class="rating-userName">{{rating.username}}</span>
                     <img class="rating-userImg" :src="rating.avatar"/>
                   </p>
                </div>
                <div class="rating-txt">
                   <span v-if="rating.rateType === 0" class="icon-thumb_up"></span>
                   <span v-if="rating.rateType === 1" class="icon-thumb_down"></span>
                   <span class="rating-content">{{rating.text}}</span>
                </div>
             </li>
            <li class="no-rating"  v-show="!food.ratings || !food.ratings.length">暂无评论</li>
          </ul>
        </div>
      </div>
    </div>
    </transition>

</template>
<script>
  import _line from '@/components/_line/_line';
  import BScroll from 'better-scroll';
  import btnAll from '@/components/btnAll/btnAll';
  import evaluate from '@/components/evaluate/evaluate';
  import {formatDate} from '@/common/js/formatDate';
  import Vue from 'vue';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    data(){
      return {
        foodDetail:false,
        desc :{
          all:'全部',
          positive:'推荐',
          negative:'吐槽'
        },
        selectType :ALL,
        onlyContent : true,
      }
    },
    props:['food'],
    components:{_line,btnAll,evaluate},

    methods:{
      show(){
        this.foodDetail = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(shopDetail,{
              click:true
            })
          }else{
            this.scroll.refresh();
          }
        })
      },
      back(){
        if(!event._constructed){
          return;
        }
        this.foodDetail = false;
      },
      addFirst(event){
        if(!event._constructed){
          return;
        }
        Vue.set(this.food,'count',1);
      },
      needShow(type,text,event){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL ){
          return true;
        }else{
          return this.selectType === type;
        }
      }
    },
    filters:{
      filterTime(fmt){
        return formatDate(fmt)
      }
    }
  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/styles/mixin.styl";
  .shopDetail{
    position: fixed;
    left:0;
    top:0;
    bottom:50px;
    z-index: 9;
    background: #fff;
    width:100%;
    overflow:hidden;
    transition:all .3s ease-out;
    &.clip-enter-active{
       transform:translate3d(0,0,0);
     }
    &.clip-enter,&.clip-leave-active{
       transform:translate3d(100%,0,0);
     }
    .shopBox{
      .back{
        font-size: 12px;
        position: fixed;
        left:15px;
        top:15px;
        color:#fff;
        display: block;
        z-index: 10;
        height:25px;
        width:25px;
        text-align: center;
        line-height: 25px;
        border-radius:50%;
        background: rgba(117, 127, 127, .5);
      }
    }
    .sd-img{
      height:375px;
      width:100%;
    }
    .sd-msg{
      margin:18px;
      .sd-title{
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .sd-data{
        margin-top:8px;
        font-size: 0px;
        color:rgb(147,153,159);
        .sd-sales{
          font-size: 10px;
        }
        .sd-score{
          margin-left:12px;
          font-size: 10px;
        }
      }
      .sd-main{
        margin-top:18px;
        display: flex;
        justify-content: space-between;
        position:relative;
        .sd-btn{
          font-size: 10px;
          height:24px;
          color:#fff;
          padding:0 12px;
          background: rgb(0, 160, 220);
          border-radius: 24px;
          line-height: 24px;

        }
        .btnAll{
          bottom:0;
        }
      }
      .sd-money{
        font-size: 0px;
        .sd-m1{
          font-size: 14px;
          font-weight: 700;
          color:rgb(240,20,20);
          line-height: 24px;
        }
        .sd-m2{
          font-size: 10px;
          font-weight: 700;
          color:rgb(147,153,159);
          line-height: 24px;
          margin-left:12px;
        }
      }
    }
    .sd-intro,.food-eval{
      margin:18px;
      .intro-title{
        font-size: 14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .intro-txt{
        font-size: 12px;
        line-height: 24px;
        color:rgb(77,85,93);
        margin-top:12px;
      }
    }
    .food-eval{
      margin-bottom: 0;

    }
    .ratings{
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
  }
</style>
