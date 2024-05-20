<template>
  <div class="home">
    <img src="@/images/indexTitle.png" alt="1" class="title" />
    <div class="slog">
      <div class="text1">让沟通更简单</div>
      <div class="text2">借助最先进的技术，我们为您提供精准的诊断服务</div>
    </div>
    <div class="text">高效 易于集成 准确</div>
    <div class="icons">
      <router-link class="start" to="/user/login">立即使用</router-link>
      <router-link class="test" to="/user/chat">免费试用</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home {
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    width: 877px;
    height: 88px;
    margin-top: 120px;
  }
  .slog {
    display: flex;
    width: 875px;
    background: linear-gradient(to left, rgba(255, 171, 27, 0.3), rgba(251, 230, 137, 0.3));
    margin-top: 105px;
    border-radius: 33px;
    align-items: center;

    .text1 {
      width: 209px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 22px;
      background: linear-gradient(to left, rgb(255, 171, 27), rgb(251, 230, 137));
      border-radius: 24px;
      color: rgb(255, 255, 255);
      margin-left: 10px;
    }
    .text2 {
      width: 484px;
      height: 32px;
      color: rgb(255, 126, 0);
      margin-left: 54px;
      font-size: 22px;
    }
  }
  .text {
    font-size: 40px;
    width: 374px;
    height: 58px;
    margin-top: 60px;
    color: rgb(51, 51, 51);
  }
  .icons {
    display: flex;
    margin-top: 67px;
    .start {
      width: 279px;
      height: 93px;
      background-image: url('@/images/startBackground.png');
      font-size: 40px;
      color: rgb(255, 255, 255);
      line-height: 93px;
      text-align: center;
      cursor: pointer;
    }
    .start::after {
      content: '';
      display: inline-block;
      margin-top: 9px;
      width: 33px; /* 宽度 */
      height: 33px; /* 高度 */
      margin-right: auto;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 33px;
      background-image: url('@/images/icon.png');
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 17px;
    }
    .test {
      background-image: url('@/images/icon2.png');
      width: 279px;
      height: 93px;
      font-size: 40px;
      color: rgb(255, 171, 27);
      text-align: center;
      line-height: 93px;
      margin-left: 50px;
      cursor: pointer;
      position: relative;
    }
    .test::after {
      content: ' ';
      position: absolute;
      top: -10px;
      right: -10px;
      background-image: url('@/images/hot.png');
      width: 45px;
      height: 51px;
    }
  }
}
</style>
