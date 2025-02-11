<template>
  <div class="h-screen flex flex-col p-10px">
   
  <ul class="w100 list p-1">
    <li class="ub ub-ac w100" @click="handleGame(1)">
      <div class="img-icon">
        <img src="@/assets/images/phone.png" alt="">
      </div>
      <div class="ub ub-f1 game-name ml-1">
        手机尾号评分
      </div>
    </li>
  </ul> 
</div>
</template>

<script setup lang="ts">
import router from '@/router';

defineOptions({
  name: 'GamePage',
})
const handleGame = (type:number)=>{
  router.push({name:'phone'})
}
</script>

<style scoped lang="less">
.list{
  background-color:#fff;
  box-sizing: border-box;
  li{
    cursor: pointer;
  }
}
.img-icon{
  width:40px;
  height:40px;
  img{
    width:100%;
    height:100%;
    vertical-align: top;
  }
}
.game-name{
  font-size:20px;
}
</style>
