<template>
  <div class="header">
    <img src="@/images/logo.png" alt="logo" class="logo" />
    <div class="navBar">
      <router-link
        :class="{ navItem: true, actived: router.currentRoute.value.path === item.to }"
        v-for="item in navList"
        :to="item.to"
        :key="item.name"
      >
        <span>{{ item.name }}</span>
      </router-link>
    </div>
    <router-link class="login" to="/user/login">登录</router-link>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const navList = [
  { name: '首页', to: '/home' },
  // { name: '产品特点', to: 'product' },
  { name: '百灵商城', to: '/shop' },
  // { name: 'AI智能', to: 'AI' },
  // { name: '会员中心', to: 'vip' },
  // { name: '智能客服', to: 'service' },
  { name: '关于我们', to: 'about' }
]
let router = useRouter()
</script>

<style lang="scss" scoped>
.header {
  height: 8vh;
  margin: 0 auto;
  max-width: 100rem;
  border-radius: 0 0 30px 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 0 0 rgba(255, 171, 27, 0.36);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 146px;
    height: 41px;
    align-self: center;
    margin-left: 51px;
  }
  .navBar {
    display: flex;
    flex: 1;
    margin-left: 40px;
    align-items: center;

    .navItem {
      cursor: pointer;
      margin: 10px;
      font-size: 24px;
      text-align: center;
      align-items: center;
      color: rgb(153, 153, 153);
    }
    .actived span {
      color: rgb(255, 171, 27);
      border-bottom: 2px solid rgb(255, 171, 27);
    }
  }
  .login {
    cursor: pointer;
    width: 156px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(to left, rgb(255, 171, 27), rgb(251, 230, 137));
    font-size: 24px;
    line-height: 60px;
    color: rgb(255, 255, 255);
    text-align: center;
    margin: 5px;
  }
}
</style>
