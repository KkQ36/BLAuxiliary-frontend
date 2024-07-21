<template>
  <div class="chat-container">
    <div class="version">
      <div
        :class="{
          'version-text-selected': selectedVersion == 1,
          'version-text': selectedVersion == 2
        }"
        @click="changeVersion(1)"
      >
        疾病咨询
      </div>
      <div
        :class="{
          'version-text-selected': selectedVersion == 2,
          'version-text': selectedVersion == 1
        }"
        @click="changeVersion(2)"
      >
        学习模式
      </div>
    </div>
    <div class="container" ref="scrollContainer">
      <div class="hello-text">
        <div class="icon" @click='toHome()' style='cursor: pointer'/>
        <div class="text">
          <div class="text1">你好！我是百灵辅诊</div>
          <div class="text2">借助最先进的技术，我们为您提供精准的诊断服务</div>
          <div class="text3">试试说下以下例子：</div>
          <div class="case">
            <div class="case1" v-for="introduce in s" :key="introduce.text">
              <div class="choose">{{ introduce.text }}</div>
              <div class="subscribe">{{ introduce.subscribe }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="message" v-for="(message, index) in chatHistory" :key="index">
        <div :class="{ 'avatar-user': index % 2 == 0, 'avatar-bot': index % 2 != 0 }" />
        <div class="user-message" v-html="message"></div>
      </div>
    </div>
    <div class="chat-input">
      <textarea
        class="chat-input-text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="请输入你的问题"
        :disabled="sendMessageNow"
      />
      <div class="submit"></div>
    </div>
    <a-button @click='showWindow()'>导出宠物病例单</a-button>
    <ExportContainer v-model:visible="showFloatingWindow" @close="closeFloatingWindow"/>

  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { Ref } from 'vue'
import { BotService } from '@/action/BotService'
import { introduces } from '@/assets/text.json'
import { useRouter } from 'vue-router'
import ExportContainer from '@/components/chat/ExportContainer.vue'

const s = introduces // 页面上的数据
const scrollContainer: Ref<HTMLDivElement | null> = ref(null)
const sendMessageNow = ref(false) // 记录当前是否正在发送消息
const router = useRouter();
const showFloatingWindow = ref(false);
const showWindow = () => {
  showFloatingWindow.value = true;
}
const scrollToBottom = () => {
  // 滚动到底部
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}
const closeFloatingWindow = () => {
  showFloatingWindow.value = false;
}
const toHome = () => {
  router.push("/");
}
const selectedVersion = ref(1)
const changeVersion = (index: number) => {
  selectedVersion.value = index
}
const chatHistory = ref<string[]>([])
const userInput = ref<string>('')
const sendMessage = async () => {
  sendMessageNow.value = true
  chatHistory.value.push(userInput.value)
  let reply = await BotService.getBotMessage(userInput.value)
  const formattedReply = (reply as string).replace(/\n/g, '<br>')

  // 打字机效果
  let index = 0
  chatHistory.value.push('')
  const intervalId = setInterval(() => {
    if (index < formattedReply.length) {
      chatHistory.value[chatHistory.value.length - 1] += formattedReply[index]
      index++
      nextTick(() => {
        scrollToBottom()
      })
    } else {
      clearInterval(intervalId)
      sendMessageNow.value = false
    }
  }, 30)

  // 清空 user 输入
  userInput.value = ''
}
</script>

<style scoped lang="scss">
.chat-container {
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  .version {
    width: 440px;
    height: 65px;
    background-color: rgb(249, 249, 249);
    border-radius: 32.5px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .version-text-selected {
      width: 209px;
      height: 48px;
      font-size: 24px;
      line-height: 48px;
      color: rgb(255, 255, 255);
      border-radius: 24px;
      text-align: center;
      background: linear-gradient(to right, rgb(255, 171, 27), rgb(251, 230, 137));
    }
    .version-text {
      width: 209px;
      font-size: 24px;
      line-height: 48px;
      text-align: center;
      color: rgb(153, 153, 153);
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 55vh;
    width: 60vw;
    margin-top: 47px;
    overflow-y: auto;
    scrollbar-width: thin; /* 设置滚动条的宽度 */
    scrollbar-color: #888 #f5f5f5; /* 设置滚动条的颜色 */
    .hello-text {
      user-select: none;
      display: flex;
      width: 90%;
      height: 493px;
      border: rgb(225, 225, 225) solid 1px;
      box-shadow: 11px 13px 28px 0 rgba(0, 0, 0, 0.03);
      border-radius: 30px;
      padding: 33px;
      .icon {
        width: 45px;
        height: 45px;
        background-image: url('@/images/hello_icon.png');
      }
      .text {
        margin-left: 17px;
        width: 854px;
        .text1 {
          font-size: 24px;
        }
        .text2 {
          margin-top: 16px;
          font-size: 18px;
        }
        .text3 {
          font-size: 18px;
          margin-top: 45px;
        }
        .case {
          .case1 {
            .choose {
              font-size: 16px;
              color: rgb(51, 51, 51);
              margin-bottom: 10px;
              margin-top: 33px;
            }
            .subscribe {
              font-size: 14px;
              color: rgb(255, 171, 27);
            }
          }
        }
      }
    }
    .message {
      margin-top: 30px;
      margin-bottom: 20px;
      display: inline-block;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      width: 90%;

      .avatar-user {
        background-color: cyan;
        width: 45px;
        height: 45px;
        border-radius: 45px;
        margin-left: 5px;
      }
      .avatar-user::after {
        margin-left: 70px;
        content: '我';
        font-weight: 600;
        font-size: 18px;
        line-height: 40px;
      }
      .user-message {
        overflow: hidden;
        font-weight: 500;
        font-size: 20px;
        animation: typing 3s forwards;
        margin-top: 5px;
        margin-left: 50px;
        padding: 10px;
      }
      .avatar-bot {
        background-image: url('@/images/hello_icon.png');
        align-self: start;
        width: 45px;
        height: 45px;
        border-radius: 45px;
        margin-left: 5px;
      }
      .bot-message {
        margin-top: 5px;
        margin-left: 50px;
        font-size: 18px;
        box-shadow: 11px 13px 28px 0 rgba(0, 0, 0, 0.03);
        border: rgb(225, 225, 225) solid 1px;
        border-radius: 15px;
        padding: 20px;
      }
    }
  }
  .chat-input {
    margin-bottom: 53px;
    margin-top: 100px;
    padding-top: 17px;
    display: flex;
    align-items: center;
    width: 1092px;
    height: 99px;
    border-radius: 10px;
    padding-left: 23px;
    padding-bottom: 3px;
    border: 1px rgb(225, 225, 225) solid;
    box-shadow: 11px 13px 28px 0 rgba(0, 0, 0, 0.03);
    .chat-input-text {
      border: none;
      width: 80%;
      height: 100%;
      resize: none;
      font-size: 18px;
    }
    .chat-input-text::placeholder {
      font-size: 18px;
    }
    .chat-input-text:focus {
      outline: none;
      border: none;
    }
    /* 修改输入框滚动条样式 */
    .chat-input-text::-webkit-scrollbar {
      width: 5px;
    }

    .chat-input-text::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .chat-input-text::-webkit-scrollbar-thumb {
      background: rgb(255, 171, 27);
      border-radius: 5px;
    }
    .chat-input-text:disabled {
      background-color: white;
    }
    .submit {
      width: 47px;
      height: 47px;
      border-radius: 47px;
      background-color: rgb(255, 171, 27);
      background-image: url('@/images/submit_icon.png');
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 100px;
      cursor: pointer;
    }
  }
}
</style>
