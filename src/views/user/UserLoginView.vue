<template>
  <div class="content">
    <div class="login-form">
      <div class="tab">
        <div :class="{ active: activeTab === 1, normal: activeTab != 1 }" @click="changeActive(1)">
          测试码登录
        </div>
        <div :class="{ active: activeTab === 2, normal: activeTab != 2 }" @click="changeActive(2)">
          账号密码登录
        </div>
      </div>
      <form class="form" v-if="activeTab == 2">
        <div class="form-element">
          <div class="title">用户名</div>
          <div class="input">
            <input v-model="form.name" placeholder="用户名/邮箱/手机号" />
          </div>
        </div>
        <div class="form-element">
          <div class="title">密码</div>
          <div class="input">
            <input v-model="form.password" placeholder="请输入密码" />
          </div>
        </div>
        <div class="button" @click="handleSubmit(0)">登录</div>
        <router-link class="register" to="/user/register">注册</router-link>
      </form>
      <form class="form" v-else>
        <div class="form-element">
          <div class="title" >测试码登录</div>
          <div class="input">
            <input v-model="form.invitation" placeholder="请输入测试码" />
          </div>
        </div>
        <div class="button" @click="handleSubmit(1)">登录</div>
      </form>
      <img src="@/images/title.png" class="image" alt="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { UserService } from '@/action/UserService'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const activeTab = ref(2)
const form = reactive({
  name: '',
  password: '',
  invitation: '',
  isRead: false
})
const router = useRouter();
const changeActive = (index: number) => {
  activeTab.value = index
}
const handleSubmit = (choose : number) => {
  let res;
  if (choose === 0) res = UserService.login(form.name, form.password, "");
  else if (choose === 1) res = UserService.login("", "", form.invitation);
  console.log(res)
  if ((res as boolean)) router.push("/user/chat");
  else Message.warning("登录失败");
}
</script>

<style scoped lang="scss">
input {
  border: none;
  outline: none;
}
.content {
  height: 100vh;
  background-image: url('@/images/userLoginBackground.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: center;
}
.tab {
  height: 90px;
  display: flex;
  font-size: 24px;
  text-align: center;
  line-height: 90px;
  justify-content: center;
  cursor: pointer;

  .normal {
    height: 90px;
    width: 330px;
    color: rgb(153, 153, 153);
    background-color: rgba(255, 226, 119, 0.26);
  }
  .active {
    height: 127px;
    width: 330px;
    margin-top: -12px;
    border-radius: 18px;
    background-color: white;
  }
}
.login-form {
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 718px;
  width: 644px;
  margin-right: 50px;
  border-radius: 68px;
  box-shadow: 7px 7px 5px 0 rgba(0, 0, 0, 0.16);
  .image {
    width: 128px;
    height: 36px;
    margin-left: 250px;
    margin-top: auto;
    margin-bottom: 33px;
  }
}
.form-element {
  margin-left: 61px;
  margin-top: 41px;

  .title {
    height: 29px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 19px;
  }
  .input {
    width: 501px;
    height: 63px;
    display: flex;
    align-items: center;
    padding-left: 21px;
    border: 1px solid #f3f3f3;
    border-radius: 10px;
    .get-code {
      margin-left: 250px;
      text-decoration: none;
      color: rgb(255, 171, 27);
    }
    .get-code:visited {
      color: rgb(255, 171, 27);
    }
  }
}
input::placeholder {
  color: #bbbbbb;
}
.button {
  width: 501px;
  height: 74px;
  background: linear-gradient(to left, rgb(255, 171, 27), rgb(251, 230, 137));
  border-radius: 37px;
  font-size: 26px;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 74px;
  margin-bottom: 12px;
  margin-top: 94px;
  margin-left: 61px;
  cursor: pointer;
}
.form .register {
  margin-left: 282px;
  text-decoration: none;
  color: rgb(255, 171, 27);
}
.register:visited {
  color: rgb(255, 171, 27);
}
</style>
