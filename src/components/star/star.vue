<template>
    <div class="star">
      <div class="star-box">
        <div class="star-gray">
          <span v-for="n in 5" class="star-item"></span>
        </div>
        <div class="star-mask" :style={width:width}>
          <div class="star-yellow">
            <span v-for="n in 5" class="star-item"></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name : 'star',
    props:['score'],
    computed:{
      width(){
        return parseInt((this.score/5)*100)+'%';
      }
    }

  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  @import '../../common/styles/mixin.styl';
  .star{
    height:24px;
    margin-top:24px;
    position: relative;
    font-size:0;
    .star-box{
      width:220px;
      position: absolute;
      left:50%;
      top:0;
      margin-left:-110px;
    }
    .star-gray{
      width:220px;
      .star-item{
        bg-image('img/star48_off')
      }
    }
    .star-mask{
      overflow: hidden;
      position: absolute;left:0;top:0;height:100%
    }
    .star-yellow{
      height:24px;
      width:220px;
      position: absolute;left:0;top:0;
      .star-item {
        bg-image('img/star48_on')
      }
    }
    .star-item{
      display: inline-block;
      height:24px;
      width:24px;
      background-size: 24px 24px;
      margin:0 10px;
      background-repeat: no-repeat;
    }
  }
</style>
