<template>
  <div class="header">
    <img src="@/images/logo.png" alt="1" class="logo">
    <ul class="pages">
      <li class="page-item" v-for="page in pages">{{ page }}</li>
    </ul>
    <div class="login" @click="toLoginPage()">登录</div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();
const pages = ["首页", "产品特点", "ai智能", "会员中心", "智能客服", "关于我们"];
const toLoginPage = () => {
  router.push("/user/login");
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  height: 106px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 0 0 rgba(255, 171, 27, 0.36);
  border-radius: 0 0 30px 30px;

  .logo {
    width: 146px;
    height: 41px;
    align-self: center;
    margin-left: 51px;
  }
  .pages {
    cursor: pointer;
    list-style-type: none;
    display: flex;
    align-items: center;
    .page-item {
      margin-left: 72px;
      height: 45px;
      font-size: 24px;
      color: rgb(153, 153, 153);
    }
    .page-item:first-child {
      margin-left: 147px;
      color: rgb(255, 126, 0);
    }
  }
  .page-item:first-child::after {
    content: "";
    display: block;
    margin-top: 9px;
    background-color: rgb(255, 126, 0); /* 背景颜色 */
    width: 30px; /* 宽度 */
    height: 3px; /* 高度 */
    margin-left: auto;
    margin-right: auto;
    border-radius: 1.5px;
  }
  .login {
    width: 156px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(to left, rgb(255, 171, 27), rgb(251, 230, 137));
    font-size: 24px;
    color: rgb(255, 255, 255);
    line-height: 60px;
    text-align: center;
    margin-left: 495px;
    margin-top: 23px;
    cursor: pointer;
  }
}



</style>