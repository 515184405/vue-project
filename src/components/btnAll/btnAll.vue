<template>
  <div class="btnAll">
    <transition name="move">
      <div class="transAll" v-show="food.count>0">
          <span @click.stop.prevent="subNum($event)" class="icon-remove_circle_outline"></span>
          <span class="order">{{food.count}}</span>
      </div>
    </transition>
    <span class="icon-add_circle" @click.stop.prevent="addNum($event)"></span>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default{
    data(){
      return {

      }
    },
    props:['food'],
    methods:{
      addNum(event){

      if(!event._constructed){
          return;
        }

      var el = document.createElement('span');
        el.className = 'ball dropUp';
        var elX = 115;
        var elY = Math.abs(event.offsetY)-10;
        el.style.left = (elX+4) + 'px';
        el.style.top = (elY+4) + 'px';
        el.style.backgroundImage = 'url('+this.food.image+')';
        document.body.appendChild(el);
        var _self = this;

        var winH = window.innerHeight;
        var winW = window.innerWidth;
        el.style.transform = 'translate3d(' + (-elX + 21) + 'px,' + (winH - elY - 47) + 'px,0)';
        el.style.wekitTransform = 'translate3d(' + (-elX + 21) + 'px,' + (winH - elY - 47) + 'px,0)';
        setTimeout(function () {
          el.parentNode.removeChild(el);
        }, 200)
        if (!_self.food.count) {
          Vue.set(_self.food, 'count', 1)
        } else {
          _self.food.count++;
        }
      },
      subNum(){
        if(!event._constructed){
          return;
        }

      (this.food.count > 0) && this.food.count--;
      },
    }
  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
    .ball{
      position: fixed;
      border-radius:50%;
      width:25px;
      height:25px;
      background-size:25px 25px;
      background-repeat: no-repeat;
      z-index: 200;
      transition: all .2s ease;
    }
    .btnAll{
      position: absolute;right:0;
      bottom:16px;
      display:flex;
      .transAll{
        display: flex;
        width:48px;
        height:24px;
        vertical-align: middle;
        font-size: 0;
        transform: translate3d(0,0,0);
        transition:all .1s ease-in;
        &.move-enter-active{
           transform: translate3d(48px,0,0);
           opacity: 1;
            .icon-remove_circle_outline{
              transform: rotate(180deg);
            }
            .order{
              opacity:0;
              transition-delay: .1s;
            }
         }
        &.move-enter, &.move-leave-active{
          opacity:0;

        }
      }
      .icon-remove_circle_outline{
        font-size: 24px;
        line-height: 24px;
        display:inline-block;
        width:24px;
        height:24px;
        color:rgb(0,160,220);
        transition:all .1s ease-in;
      }
      .order{
        color:rgb(147,153,159);
        font-size: 10px;
        line-height: 24px;
        width:24px;
        height:24px;
        text-align: center;
        display: inline-block;
        transition:all .2s ease-in;
      }
      .icon-add_circle{
        font-size: 24px;
        height:24px;
        height:24px;
        color:rgb(0,160,220);
        line-height: 24px;
        position: relative;
        z-index: 3;
      }
    }
</style>
