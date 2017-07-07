<template>
  <div id="seller" class="seller">
      <div class="seller-content">
        <div class="overView">
           <div class="seller-floor border-1px">
             <h1 class="seller-name">{{seller.name}}</h1>
             <div class="seller-msg">
               <star class="star-scale" :score="seller.score"></star>
               <span class="ratingCount">({{seller.ratingCount}})</span>
               <span class="sellCount">月售{{seller.sellCount}}单</span>
             </div>
             <div class="favorite">
                <p><span class="icon-favorite" :class="{'active':favBool}" @click="toggleFav"></span></p>
                <span class="fav-txt">{{favTxt}}</span>
             </div>
           </div>
           <div class="seller-floor border-1px">
            <div class="seller-song">
                <div class="sell-song1">
                  <p class="song1-title">起送价</p>
                  <p><span class="song-num">{{seller.minPrice}}</span>元</p>
                </div>
                <div class="sell-song1">
                  <p class="song1-title">商家配送</p>
                  <p><span class="song-num">{{seller.deliveryPrice}}</span>元</p>
                </div>
                <div class="sell-song1">
                  <p class="song1-title">平均配送时间</p>
                  <p><span class="song-num">{{seller.deliveryTime}}</span>元</p>
                </div>
            </div>
          </div>
           <div class="seller-br"></div>
           <div class="seller-advice border-1px">
              <h1 class="advice-name">公告与活动</h1>
              <div class="advice-txt">
                {{seller.bulletin}}
              </div>
             <ul class="fav-ul">
               <li class="support border-1px" v-for="favItem in seller.supports">
                 <span class="icon" :class="classMap[favItem.type]"></span>
                 <span class="text">{{favItem.description}}</span>
               </li>
             </ul>
           </div>
          <div class="seller-br"></div>
          <div class="seller-bg">
            <h1 class="bg-name">商家背景</h1>
            <div class="pics" id="picDom">
                <ul class="pics-list" id="picsList">
                    <li class="pics-item" v-for="pic in seller.pics">
                      <img :src="pic" height="90" width="120" alt=""/>
                    </li>
                </ul>
            </div>
          </div>
          <div class="seller-br"></div>
          <div class="seller-news">
            <h1 class="bg-name">商家信息</h1>
            <ul class="fav-ul">
              <li class="support border-1px" v-for="info in seller.infos">
                <span class="text">{{info}}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
  import star from '@/components/star/star'
  import BScroll from 'better-scroll'
  import {saveLocalstorage,loadLocalStorage} from '@/common/js/storage'
  const ERR_OK = 0;
  export default {
    name : 'seller',
    props:['seller'],
    components :{star},
    data(){
      return {
        favBool:(()=>{
          return loadLocalStorage(this.seller.id,'fav',false)
        })()
      }
    },
    computed:{
      favTxt(){
        return this.favBool ? '已收藏' : '未收藏'
      }
    },
    created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee']
    },
    methods : {
      _initScroll()
      {
        if (!this.scroll) {
          this.scroll = new BScroll(seller, {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      _initPic()
      {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          picsList.style.width = width + 'px';
          this.$nextTick(()=>{
            if(!this.picScroll){
              this.picScroll = new BScroll(picDom, {
                scrollX: true,
                //eventPassthrough: 'vertical'
              })
            }else{
              this.picScroll.refresh();
            }
          }
        )
        }
      },
      toggleFav(e){
        this.favBool = !this.favBool;
        saveLocalstorage(this.seller.id,'fav',this.favBool)
      }
    },
    mounted(){
      this._initScroll();
      this._initPic();
    },
    updated(){
      this._initScroll();
      this._initPic();
    }
  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/styles/mixin.styl";
  .seller{
    position:absolute;
    left:0;
    top:174px;
    bottom:0;
    overflow:hidden;
    width:100%;
    .seller-content{
  .overView{
        .seller-bg{
          margin:18px;
          .bg-name{
            font-size: 14px;
            color:rgb(7,17,27);
            line-height: 28px;
            margin:0px 0 8px 0px;
          }
          .pics{
            padding-bottom:18px;
          overflow:hidden;
            .pics-list{
              white-space:nowrap;
              font-size:0;
              .pics-item{
                display: inline-block;
                margin-right:6px;
                &:last-child{
                  margin-right:0;
                 }
              }
            }
          }
        }
        .seller-news{
          margin:18px;
          .bg-name{
            font-size: 14px;
            color:rgb(7,17,27);
            line-height: 28px;
            margin:0px 0 8px 0px;
          }
        }
        .fav-ul{
          margin-top:16px;
        }
        .support{
          display:flex;
          padding:16px 12px;
          border-bottom-1px(rgba(7,17,27,.1));
          .icon{
            align-items: center;
            vertical-align:top;
            display:inline-block
            width:16px;
            height:16px;
            margin-right:4px;
            background-size:16px 16px;
            background-repeat:no-repeat;
          &.decrease{
           bg-image('../header/img/decrease_1')
           }
          &.discount{
           bg-image('../header/img/discount_1')
           }
          &.guarantee{
           bg-image('../header/img/guarantee_1')
           }
          &.invoice{
           bg-image('../header/img/invoice_1')
           }
          &.special{
           bg-image('../header/img/special_1')
           }
          }
          .text{
            font-size:12px;
            line-height:16px
          }
        }
      .seller-advice{
        margin:18px;
        .advice-name{
          font-size: 14px;
          color:rgb(7,17,27);
          line-height: 28px;
          margin:0px 0 8px 0px;
        }
        .advice-txt{
          font-size: 12px;
          color:rgb(240,20,20);
          line-height: 24px;
        }
      }
      .seller-br{
        height:18px;
        border-top:1px solid rgba(7,17,27,.1);
        border-bottom:1px solid rgba(7,17,27,.1);
        background: #F3F5F7;
        margin-top:-18px;
      }
      .seller-floor{
        margin:18px;
        padding-bottom: 18px;
        position:relative;
        .favorite{
          position:absolute;
          width:36px;
          text-align: center;
          right:0px;
          top:6px;
          .icon-favorite{
            font-size: 24px;
            line-height: 24px;
            color:#d4d6d9;
            margin-bottom:4px;
            &.active{
               color:rgb(240,20,20);
             }
          }
          .fav-txt{
            font-size: 10px;
            color:rgb(77,85,93);
            line-height: 10px;
          }
        }
        &:first-child{
         border-top-1px(rgba(7,17,27,.1));
         }
        .seller-song{
          font-size: 10px;
          display: flex;
          justify-content: space-around;
          text-align: center;
          .song1-title{
            font-size: 10px;
            color:rgb(147,153,159);
            line-height: 10px;
            padding-bottom: 4px;;
          }
          .song-num{
            font-size: 24px;
            line-height: 24px;
          }
        }
      }
        .seller-name{
          font-size: 14px;
          color:rgb(7,17,27);
          line-height: 28px;
          margin:0px 0 8px 0px;
        }
        .seller-msg{
          display: flex;
          align-items: center;
          align-content:flex-start;
          .ratingCount{
            margin-left:-65px;
            font-size: 12px;
            line-height: 12px;
          }
          .sellCount{
            margin-left:12px;
            font-size: 12px;
            line-height: 12px;
          }
        }
        .star-scale{
          transform:scale(0.75) translateX(-50px);
          width:220px;
          margin-top:0;
        }
      }
    }
  }
</style>
