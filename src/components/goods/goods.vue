<template>
  <div class="goods">
      <div id="goodsAside" class="goods-alide">
          <ul class="alide-list">
              <li @click="selletMenu(index,$event)" class="alide-item js-alide-item border-1px" :class="{'active':currentIndex===index}" v-for="(good,index) in goods">{{good.name }}</li>
          </ul>
      </div>
      <div id="goodsBox" class="goods-box">
        <ul class="goods-list">
          <li class="gFoods-item js-gFoods-item" v-for="gFoods in goods">
              <h1 class="gFood-name">{{gFoods.name}}</h1>
              <div @click="selectedFood(gFood,$event)" class="good-item border-1px" v-for="gFood in gFoods.foods">
                  <div class="food-img"><img width="55" height="55" :src="gFood.image" alt=""/></div>
                  <div class="food-txt">
                    <h1 class="item-name">{{gFood.name}}<br/></h1>
                    <p class="item-des" v-if="gFood.description">{{gFood.description}}<br/></p>
                    <p class="item-msg">
                      <span class="msg-sell">月售{{gFood.sellCount}}份</span>
                      <span class="msg-rating">好评率{{gFood.rating}}%</span>
                    </p>
                    <div class="item-price">
                      <span class="price-num">￥{{gFood.price}}</span>
                      <s class="price-old" v-if="gFood.oldPrice">￥{{gFood.oldPrice}}</s>
                    </div>
                    <btnAll :food="gFood"></btnAll>
                  </div>
              </div>
          </li>
        </ul>
      </div>
    <shopDetail ref="foodDetailPlug" class="foodDetail" :food="food"></shopDetail>
      <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>
<script>
    import BScroll from 'better-scroll';
    import btnAll from '@/components/btnAll/btnAll';
    import shopcart from '@/components/shopcart/shopcart';
    import shopDetail from '@/components/shopDetail/shopDetail';
    const ERR_OK = 0;
    export default {
      data(){
        return {
          goods:[],
          listHeight:[],
          scrollY:0,
          order:0,
          food : "",
        }
      },
      props:['seller'],
      components:{shopcart,btnAll,shopDetail},
      created(){
        this.$http.get('/api/goods').then((response) => {
          response = response.body;
          if(response.errno === ERR_OK){
            //vue中的给对象扩展属性Object.assign()
            this.goods = response.data;
            this.$nextTick(() =>{
              this._initScroll();
              this._computeHeight();
            })
          }
        });
      },
      computed:{
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i+1];
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
              return i;
            }
          }
          return 0;
        },
        selectFoods(){
          let foods = [];
          this.goods.forEach((good) =>{
            good.foods.forEach((food) =>{
              if(food.count){
                foods.push(food)
              }
            })
          })
          return foods;
        }
      },
      methods:{
        _initScroll(){
          this.menuScroll = new BScroll(goodsAside,{
            click:true
          })
          this.goodScroll = new BScroll(goodsBox,{
            probeType:3,
            click:true
          })
          this.goodScroll.on('scroll',(pos)=>{
            this.scrollY = Math.abs(Math.round(pos.y));
          })
        },
        selletMenu(index,event){
          if(!event._constructed){
            return;
          }
          let els = document.getElementsByClassName('js-gFoods-item');
          let el = els[index];
          this.goodScroll.scrollToElement(el,300)


        },
        selectedFood(food,$event){
          if(!event._constructed){
            return;
          }
          this.food = food;
          this.$nextTick(() =>{
            this.$refs.foodDetailPlug.show();
          })
        },
        _computeHeight(){
          let els = document.getElementsByClassName('js-gFoods-item');
          let height = 0;
          this.listHeight.push(height);
          for(var i = 0;i < els.length; i++){
            let item = els[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }
      },

    }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/styles/mixin.styl";
  .goods{
      display:flex;
      .goods-alide{
        position: absolute;
        top:177px;
        left:0;
        bottom:58px;
        z-index:1;
        overflow: hidden;
        display: inline-block;
        width:80px;
        box-sizing: border-box;
        font-size: 12px;
        color:#4d555d;
        .alide-list{
          width:100%;
          .alide-item{
            border-top-1px(rgba(7,17,27,.1))
            padding:0 12px;
            display: flex;
            align-items: center;
            height:54px;
            line-height: 14px;
            background: #f3f5f7;
            &.active{
              margin-top:-1px;
               background: #fff;
               font-weight: bold;
              &:after{
                border:0;
               }
             }
          }
        }
      }
    .goods-box{
      padding-left:80px;
      width:100%;
      box-sizing: border-box;
      position: absolute;top:177px;left:0;
      overflow: hidden;
      bottom: 50px;

      .goods-list{
        overflow:hidden;
        .gFood-name{
           font-size: 12px;
           color:rgb(147,153,159);
          line-height: 26px;
          border-left:3px solid #d9dde1;
          background: #f3f5f7;
          padding-left:14px;
        }
        .good-item{
          border-top-1px(rgba(7,17,27,0.1));
          margin:18px;
          padding-bottom: 18px;
          display:flex;
          align-items: flex-start;
          &:last-child:after{
            border-top:0;
           }
           &:last-child{
              margin-bottom:0;
            }
          .food-img{
            width:55px;
            height:55px;
            img{
              border-radius:2px;
            }
          }
          .food-txt{
            width:100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-left:10px;
            .item-name{
              font-size: 14px;
              color:rgb(7,17,27);
              line-height: 14px;
              padding-bottom: 4px;
              display: inline;
            }
            .item-des{
              font-size: 10px;
              color:rgb(147,153,159);
              line-height: 18px;
              display: inline;
              height:10px;
            }
            .item-msg{
              font-size: 10px;
              color:rgb(147,153,159);
              display: inline;
              line-height: 18px;
            }
            .item-price{
              font-size: 0;
              margin-top:4px;
              line-height:14px;
              position:relative;
              .price-num{
                color:rgb(240,20,20);
                font-size: 14px;
              }
              .price-old{
                margin-left:8px;
                color:rgb(147,153,159);
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
