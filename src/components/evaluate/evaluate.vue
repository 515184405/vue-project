<template>
  <div class="evaluate">
      <div class="food-btn-all border-1px">
        <span @click="select(2,$event)" class="fb-btn" :class="{'active':selectType === 2}">{{desc.all}} <span class="fb-num">{{ratings.length}}</span></span>
        <span @click="select(0,$event)" class="fb-btn" :class="{'active':selectType === 0}">{{desc.positive}} <span class="fb-num">{{positives.length}}</span></span>
        <span @click="select(1,$event)" class="fb-btn" :class="{'active':selectType === 1}">{{desc.negative}} <span class="fb-num">{{negatives.length}}</span></span>
      </div>
    <div @click="toggleContent" :class="{'on':onlyContent}" class="only-content">
      <span class="icon-check_circle"></span>
      <span class="only-txt">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    props:{
      ratings:{
        type:Array,
        default(){
          return [];
        }
      },
      selectType:{
        type:Number,
        default : ALL
      },
      onlyContent:{
        type : Boolean,
        default : false
      },
      desc : {
        type : Object,
        default() {
          return {
            all : '全部',
            negative:'不满意',
            positive:'满意'
          }
        }
      }
    },
    computed:{
      positives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === POSITIVE;
        })
      },
      negatives(){
        return this.ratings.filter((rating)=>{
          return rating.rateType === NEGATIVE;
        })
      },
    },
    methods:{
      select(type,event){
        if(!event._constructed){
          return;
        }
        this.$parent.selectType = type;
        this.$parent.$nextTick(() => {
          this.$parent.scroll.refresh();
        })
      },
      toggleContent(){
        if(!event._constructed){
          return;
        }
        this.$parent.onlyContent = !this.$parent.onlyContent;
        this.$parent.$nextTick(() => {
          this.$parent.scroll.refresh();
        })
      }
    },
  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/styles/mixin.styl";
  .food-btn-all{
    margin:18px;
    margin-bottom: 0;
    font-size:0;
    border-top-1px(rgba(7,17,27,0.1));
    padding-bottom:18px;
    .fb-btn{
      display: inline-block;
      font-size: 12px;
      color:rgb(77,85,93);
      background: rgba(0, 160, 220,0.2);
      height:24px;
      line-height: 24px;
      padding:0 8px;
      margin-right:8px;
    &.active{
       color:#fff;
       background: rgb(0, 160, 220);
     }
    }
  }
  .only-content {
    line-height: 48px;
    height: 48px;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    display: flex;
    align-items: center;
    padding:0 18px;
    .icon-check_circle {
      font-size: 24px;
      line-height: 24px;
    }
    &.on{
      .icon-check_circle {
        color:#00c850;
      }
    }
    .only-txt {
      font-size: 12px;
      line-height: 24px;
      margin-left: 4px;
    }

  }
</style>
