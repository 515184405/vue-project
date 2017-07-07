<template>

  <div class="shopcart" :class="{'colorHighLight':totalPrice>0}">
     <div class="content">
        <div class="shop-left">
          <div class="shop-cart">
              <div @click="carDetailShow" class="shop-cart-bg" :class="{'highLight':totalCount>0}">
                  <span class="icon-shopping_cart"></span>
              </div>
              <div class="count" v-if="totalCount">{{totalCount}}</div>
          </div>
          <span class="shop-l-money">￥{{totalPrice}}</span>
          <span class="shop-l-shipping">另需配送费￥<span class="shipping-num">{{deliveryPrice}}</span>元</span>
        </div>
        <div @click="pay" class="shop-right" :class="{'highLight':totalPrice >= minPrice}">
           <span class="shop-r-price">{{totalTxt}}</span>
        </div>
     </div>
    <transition name="fade" mode="out-in">
      <div v-show="isShow" @click="carDetailShow" class="shopcartDetail-bg"></div>
    </transition>
    <transition name="top" mode="out-in">
      <div v-show="isShow" class="shopcartDetail">
        <div class="sd-header clearfix border-1px">
          <span class="sd-car left">购物车</span>
          <span @click="clearFood" class="sd-clear right">清空</span>
        </div>
        <div id="sdContent" class="sd-content">
          <ul>
              <li class="food-list border-1px" v-for="food in selectFoods">
                  <span class="food-name">{{food.name}}</span>
                  <div class="food-all">
                      <span class="food-price">￥{{food.price*food.count}}</span>
                      <btnAll class="btn-all" :food="food"></btnAll>
                  </div>
              </li>
          </ul>
        </div>
      </div>
    </transition>+

  </div>
</template>
<script>
  import btnAll from '@/components/btnAll/btnAll';
  import BScroll from 'better-scroll';
  export default {
    data(){
      return{
        isShow:false
      }
    },
    props:{
      selectFoods:{
        type:Array,
        default(){
          return [

          ];
        }
      },
      deliveryPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      }
    },
    components:{btnAll},
    computed:{
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        })
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food)=>{
            count += food.count;
        })
        return count;
      },
      totalTxt(){
        if(this.totalPrice == 0){
          var txt = '￥'+this.minPrice+'起送';
        }
        if(this.totalPrice > 0 && this.totalPrice < this.minPrice){
          txt = '还差￥'+(this.minPrice-this.totalPrice)+'元可送';
        }else if(this.totalPrice >= this.minPrice){
          txt = '去结算'
        }
        return txt;
      },
    },
    watch:{
      totalCount(){
        if(this.totalCount <= 0){
          this.isShow = false;
        }
      }
    },
    methods:{
      carDetailShow(){
        if(this.totalCount > 0){
          this.isShow = !this.isShow;
        }else{
          this.isShow = false;
        }
        if(this.isShow){
          this.$nextTick(()=>{
            if(!this.scroll) {
              this.scroll = new BScroll(sdContent, {
                click: true
              })
            }else{
              this.scroll.refresh();
            }
          })
        }
      },
      clearFood(){
        this.isShow = false;
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      pay(){
        if(this.minPrice > this.totalPrice){
          return;
        }
        alert('需要支付'+(this.totalPrice+4)+"元")
      }
    }
  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/styles/mixin.styl";
  .shopcartDetail-bg{
    position: fixed;left:0;top:0;
    z-index: 9;
    width:100%;height:100%;
    background:rgba(7,17,27,0.6);
    filter:blur(10px);
    transition:all .3s linear;
    &.fade-enter-active{
        opacity: 1;
     }
     &.fade-enter,&.fade-leave-active{
      opacity:0;
     }
  }
  .shopcartDetail{
    max-height:305px;
    position: fixed;
    bottom:50px;
    left:0;
    width:100%;
    background: #fff;
    z-index: 9;
    padding-bottom:15px;
    box-sizing:border-box;
    transition:all .3s linear;
    &.top-enter-active{
       transform:translate3d(0,0px,0);
     }
    &.top-enter,&.top-leave-active{
      transform:translate3d(0,305px,0);
    }
    .sd-header{
      height:40px;
      line-height:40px;
      width:100%;
      padding:0 18px;
      background:#f3f5f7;
      box-sizing:border-box;
      border-top-1px(rgba(7,17,27,0.1));
      .sd-car{
        color:rgb(7,17,27);
      }
      .sd-clear{
        color:rgb(0,160,220);
      }
    }
    .sd-content{
      max-height:245px;
      margin:0 18px;
      box-sizing:border-box;
    overflow:hidden;
      .food-list{
        height:48px;
        border-top-1px(rgba(7,17,27,0.1));
        display:flex;
        justify-content: space-between;
        align-items:center;
        .food-name{
          font-size: 14px;
          color:rgb(7,17,27);
          line-height: 24px;
        }
        .food-all{
          .food-price{
            color:rgb(240,20,20);
            font-size: 14px;
            font-weight: 700;
            margin-right:84px
          }
          .btn-all{
            width:72px;
            top:12px;
          }
        }
      }
    }
  }
  .shopcart{
    position: fixed;
    left:0;
    bottom:0;
    z-index:9;
    height:50px;
    width:100%;
    color:rgba(255,255,255,0.4);
    &.colorHighLight{
       color:#fff;
     }
    .content{
      height:100%;
      position:relative;
      z-index:11;
      background:#141d27;

    }
    .shop-left{
      width:100%;
      padding-right:105px;
      box-sizing: border-box;

      .shop-l-money{
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin-right:12px;
        padding-right:12px;
        border-right:1px solid rgba(255,255,255,0.1);

      }
      .shop-l-shipping{
        font-size:12px;
        line-height: 24px;
        .shipping-num{
          font-size: 16px;
        }
      }
      .shop-cart{
        margin:0 12px;
        margin-top:-8px;
        display: inline-block;
        width:44px;
        height:44px;
        padding:6px;
        background:#141d27;
        border-radius: 50%;
        position:relative;
        .count{
          position:absolute;
          left:35px;
          top:0;
          background-color:rgb(240,20,20);
          line-height: 14px;
          font-size: 9px;
          color:#fff;
          box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
          font-weight: 700;
          padding:2px 6px;
          border-radius:9px;
        }
        .shop-cart-bg{
          width:44px;
          height:44px;
          border-radius: 50%;
          background:rgba(150,150,150,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          &.highLight{
              background:rgb(0,160,220)
           }
          .icon-shopping_cart{
            font-size: 24px;
            line-height: 24px;

          }
        }
      }
    }
    .shop-right{
      position: absolute;
      right:0;
      bottom: 0;
      width:105px;
      z-index: 12;
      align-items: center;
      justify-content: center;
      background:rgba(150,150,150,0.5);
      height:100%;
      display:flex;
      &.highLight{
        background:#00b43c;
      }
      .shop-r-price{
        font-size: 12px;
        font-weight: bold;
        line-height: 28px;
      }
    }
  }
  @media screen and (max-width:360px) {
    .shopcart{
      .shop-right{
        width:70px;
      }
      .shop-left{
        padding-right:70px;
      }
    }
  }
</style>
