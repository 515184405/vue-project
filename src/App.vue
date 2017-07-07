<template>
    <div class="app">
      <vHeader :seller="seller"></vHeader>
      <div class="tab border-top-1px">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to="/seller">商家</router-link></div>
      </div>
      <div class="conent"><keep-alive><router-view :seller="seller"></router-view></keep-alive></div>
    </div>
</template>

<script>
  import vHeader from './components/header/header';
  import {urlParse} from './common/js/util';
  const ERR_OK = 0;
  export default {
    data(){
      return {
        seller : {
          id:(()=>{
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        response = response.body;
        if(response.errno === ERR_OK){
          //vue中的给对象扩展属性Object.assign()
          this.seller = Object.assign({},this.seller,response.data);
        }
      });
    },
    components :{vHeader},
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/styles/mixin.styl";
  .app{
    .tab{
      display:flex;
      width:100%;
      height:40px;
      line-height:40px;
      border-bottom:1px solid rgba(7,17,27,0.1)
      /*border-top-1px(rgba(7,17,27,0.1));*/
      .tab-item{
        flex:1;
        text-align: center;
        & > a{
              display: block;
              font-size: 14px;
              color:rgb(77,85,93);
              &.router-link-active{
                  color:rgb(240,20,20)
               }
            }
      }
    }
  }

</style>
