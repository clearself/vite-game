<template>
  <div class="h-screen flex flex-col detail-page">
  <img class="bird" src="@/assets/images/bird.gif" alt="">
  <img class="ship1" src="@/assets/images/ship1.gif" alt="">
  <img class="title" src="@/assets/images/phone-title.png" alt="">
   <div class="game-main">
    <div class="w100 ub ub-ac ub-pc search-box">
      <van-field type="digit" autocomplete="off"  maxlength="4" v-model="searchVal"  @keyup.enter="evaluateScore"  />
    </div>
    <div class="w100 list mt-2">
      <div class="w100 ub ub-ac list-header ">
        <div class="ub ub-f1 ub-pc header-item">
          手机尾号
        </div>
        <div class="ub ub-f1 ub-pc header-item">
          分数
        </div>
        <div class="ub ub-f1 ub-pc header-item">
          等级
        </div>
        <div class="ub ub-f1 ub-pc header-item"></div>
      </div>
      <div class="list-body mt-1">
        <div class="w100 ub ub-ac list-body-item my-1" v-for="(item,index) in list" :key="item.id">
          <div class="ub ub-f1 ub-pc list-body-content phone-number">
            {{ item.phone }}
          </div>
          <div class="ub ub-f1 ub-pc list-body-content score" :class="{'heigh':item.score>=90}">
            {{ item.score }}
          </div>
          <div class="ub ub-f1 ub-pc list-body-content level">
            {{ item.level }}
          </div>
          <div class="ub ub-f1 ub-pc list-body-content desc">
            {{ item.desc }}
          </div>
        </div>
      </div>

    </div>
   </div>
  </div>
</template>

<script setup lang="ts">
import { evaluatePhoneTail } from './evaluate'

import { createStorage } from '@/utils/Storage'
const Storage = createStorage({ storage: localStorage })
defineOptions({
  name: 'PhonePage',
})
interface IList {
  id: number
  phone: string
  score: number
  level: string
  desc: string
}
const searchVal = ref('')
const gameList = Storage.get('phoneNumberList')
const _phoneNumberList = gameList?JSON.parse(gameList):[]
const list = ref<IList[]>(_phoneNumberList)
const evaluateScore = () => {
  const res:IList = evaluatePhoneTail(searchVal.value)
  list.value.unshift(res)
  if(list.value.length>12){
  list.value.pop()
  }
  Storage.set('phoneNumberList',JSON.stringify(list.value))
  searchVal.value = ''
}
</script>

<style scoped lang="less">
.detail-page{
  position: relative;
  background-image:url('@/assets/images/bgc1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.game-main{
  width:100%;
  height:72vh;
  position: absolute;
  left:0;
  top:28vh;
  z-index: 2;
}
.bird{
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 28vh;
  z-index: 1;
}
.ship1{
  position: absolute;
  left:50%;
  top:75%;
  width: 80px;
  height: 80px;
  transform: translate(-50%);
  z-index: 1;
}
.title{
  position: absolute;
  left:50%;
  top:calc(28vh - 55px);
  width: 250px;
  height: 40px;
  transform: translate(-50%);
  z-index: 1;
}
.search-box ::v-deep(.van-cell) {
  width:60%;
  border-radius:30px;
  background: transparent;
  background-color: rgba(255,255,255,.4);
  .van-field__control {
    text-align: center;
    font-size:20px;
    font-weight:600;
    letter-spacing: 2px;
  }
}
.header-item{
  font-size:16px;
  text-align: center;
  font-weight: 600;
}
.list-body-item{
  .phone-number,.score{
    font-size:22px;
    font-weight: 600;
  }
  .phone-number{
    color:#0000FF	;
  }
  .score{
    color:#0000FF;
    &.heigh{
      color:red;
    }
  }
  .level{
    font-size:18px;
  }
  .desc{
    color:red;
    font-size:18px;
    font-weight: 600;
  }
}
</style>
