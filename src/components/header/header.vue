<template>
  <div class="headers">
   	   <div class="content-wrapper">
   	   		<div class="avatar">
   	   			<img :src="seller.avatar" width="64" height="64" alt="">
   	   		</div>
   	   		<div class="content">
   	   			<div class="title">
   	   				<span class="brand"></span>
   	   				<span class="name">{{seller.name}}</span>
   	   			</div>
   	   			<div class="description">
   	   				{{seller.description}}/{{seller.deliveryTime}}分钟送达
   	   			</div>
   	   			<div v-if="seller.supports" class="support">
   	   				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
   	   				<span class="text">{{seller.supports[0].description}}</span>
   	   			</div>
   	   		</div>
         <div @click="showDetail" class="support-count" v-if="seller.supports">
           <span class="count">{{seller.supports.length}}个</span>
           <i class="icon-keyboard_arrow_right"></i>
         </div>

   	   </div>
   	   <div @click="showDetail" class="bulletin-wrapper">
          <span class="advice_icon"></span><span class="advice_txt">{{seller.bulletin}}</span>
         <i class="icon-keyboard_arrow_right"></i>
       </div>
       <div class="background">
         <img :src="seller.avatar" width="100%" height="100%" alt=""/>
       </div>
       <div v-show="detailShow" class="detail">
         <div class="detail-wrapper clearfix">
           <div class="detail-main">
             <h1 class="name">{{seller.name}}</h1>
             <star :score="seller.score"></star>
             <div class="fav-title">
               <div class="favorable">
                 <span class="favorable-line"></span>
                 <h2 class="favorable-title">优惠信息</h2>
                 <span class="favorable-line"></span>
               </div>
               <div class="fav-msg">
                  <ul class="fav-ul">
                    <li class="support" v-for="favItem in seller.supports">
                       <span class="icon" :class="classMap[favItem.type]"></span>
                       <span class="text">{{favItem.description}}</span>
                    </li>
                  </ul>
               </div>
               <div class="favorable">
                 <span class="favorable-line"></span>
                 <h2 class="favorable-title">商家公告</h2>
                 <span class="favorable-line"></span>
               </div>
               <div class="fav-advice">
                 {{seller.bulletin}}
               </div>
             </div>
           </div>
         </div>
         <div class="detail-close">
           <i @click="hideDetail" class="icon-close"></i>
         </div>
       </div>
  </div>
</template>
<script>
  import star from '@/components/star/star'
  export default{
    name : 'headers',
    props : ['seller'],
    data(){
      return{
        detailShow:false
      }
    },
    components:{star},
    methods:{
      showDetail:function(){
        this.detailShow = true;
      },
      hideDetail:function(){
        this.detailShow = false;
      }
    },
    created(){
    	this.classMap = ['decrease','discount','special','invoice','guarantee']
    }
  }
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/styles/mixin.styl";
	.headers{
    background:rgba(7,17,27,0.5);
    color:#fff;
    overflow: hidden;
    position:relative;

    .support{
      .icon{
        vertical-align:top;
        display:inline-block
      width:12px;
        height:12px;
        margin-right:4px;
        background-size:12px 12px;
        background-repeat:no-repeat;
      &.decrease{
       bg-image('img/decrease_1')
       }
      &.discount{
       bg-image('img/discount_1')
       }
      &.guarantee{
       bg-image('img/guarantee_1')
       }
      &.invoice{
       bg-image('img/invoice_1')
       }
      &.special{
       bg-image('img/special_1')
       }
      }
      .text{
        font-size:10px;
        line-height:12px
      }
    }
		.content-wrapper{
      position: relative;
			font-size:0;
			padding:24px 12px 18px 24px;
			.avatar{
				display:inline-block
				vertical-align:top
				img{
					border-radius:2px;
				}
			}
			.content{
				display:inline-block
				margin-left:16px;
				.title{
					margin:2px 0 8px 0
					.brand{
						display:inline-block
						vertical-align:top;
						width:30px
						height:18px
						bg-image('img/brand')
						background-size:30px 18px
						background-repeat:no-repeat
					}
					.name{
						margin-left:6px
						font-size:16px
						line-height:18px;
						font-weight:bold
					}
				}
				.description{
					margin-bottom:10px;
					line-height:12px;
					font-size:12px
				}
			}
      .support-count{
        position: absolute;
        right:12px;
        bottom:14px;
        padding:0 8px;
        height:24px;
        line-height: 24px;
      border-radius:14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count{
          font-size: 10px;
          vertical-align: top;

        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          line-height: 24px;
          margin-left:2px;
        }
      }
		}
    .bulletin-wrapper{
        position: relative;
        height:28px;
        padding:0 22px 2px 12px;
        line-height: 28px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
          .advice_icon{
            vertical-align: top;
            margin-top:7px;
            display: inline-block;
            height:12px;
            width:22px;
            bg-image('img/bulletin')
            background-size:22px 12px ;
          }
          .advice_txt{
            font-size: 10px;
            vertical-align: top;
            margin:0 4px;
          }
          .icon-keyboard_arrow_right {
            position: absolute;
            right:12px;
            top:9px;
            font-size:10px;
          }
    }
    .background{
      position: absolute;
      top:0;
      width:100%;
      left:0;
      height:100%;
      z-index: -1;
      filter:blur(10px);
    }
    .detail{
      position: fixed;
      top:0;
      left:0;
      z-index: 100;
      width:100%;
      height:100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      .detail-wrapper{
        min-height:100%;
        width:100%;
        .detail-main{
          margin-top:64px;
          padding-bottom:64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .fav-msg{
            .fav-ul{
              margin-top:24px;
            }
            .support{
              display: flex;
              align-items: center;
              margin-bottom:12px;
              .icon{
                margin-left:16px;
                height:16px;
                width:16px;
                background-size: 16px 16px;
              }
              .text{
                margin-left:2px;
              }
            }
          }
          .fav-title{
            padding: 0 36px;
            .fav-advice{
              padding:24px 12px;
              line-height: 24px;
              font-size: 12px;
            }
            .favorable {
              margin-top: 23px;
              display: flex;
              align-items: center;
            .favorable-line {
              flex: 1;
              border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            }
            .favorable-title {
              font-weight: 700;
              font-size: 14px;
              padding: 0 12px;
            }

            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height:32px;
        margin:-64px auto 0 auto;
        clear: both;
        font-size: 32px;;
      }
    }
	}
</style>
