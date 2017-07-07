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
   	   				<span class="icon"></span>
   	   				<span class="text">{{seller.supports[0].description}}</span>
   	   			</div>
   	   		</div>
   	   </div>
   	   <div class="bulletin-wrapper"></div>
  </div>
</template>
<script>
  export default{
    name : 'headers',
    props : ['seller']
  }
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/styles/mixin.styl";
	.headers{
		color:#fff;
		background:#000;
		.content-wrapper{
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
				.support{
					.icon{
						display:inline-block
						width:12px;
						height:12px;
					}
				}
			}
		}
	}
</style>
