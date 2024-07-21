<template>
  <div class="content">
     用户注册
  </div>
</template>

<script setup lang="ts">
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
