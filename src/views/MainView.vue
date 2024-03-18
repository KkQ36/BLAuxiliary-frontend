<template>
  <div class="chat-container">
    <div class="version">
      <div :class="{'version-text-selected': selectedVersion == 1, 'version-text': selectedVersion == 2}" @click="changeVersion(1)">GLM-3</div>
      <div :class="{'version-text-selected': selectedVersion == 2, 'version-text': selectedVersion == 1}" @click="changeVersion(2)">CLM-4</div>
    </div>
    <div class="container">
      <div class="hello-text">
        <div class="icon" />
        <div class="text">
          <div class="text1">你好！我是百灵辅诊</div>
          <div class="text2">借助最先进的技术，我们为您提供精准的诊断服务</div>
          <div class="text3">试试说下以下例子：</div>
          <div class="case">
            <div class="case1" v-for="introduce in introduces" :key="introduce.text">
              <div class="choose">{{introduce.text}}</div>
              <div class="subscribe">{{introduce.subscribe}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="message" v-for="(message, index) in chatHistory" :key="index" >
        <div :class="{'avatar-user': index % 2 == 0, 'avatar-bot': index % 2 != 0}" />
        <div class="user-message" v-html="message.text">
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea class="chat-input-text" v-model="userInput" @keyup.enter="sendMessage" placeholder="请输入你的问题" />
      <div class="submit"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

interface Message {
  text: string,
}
const selectedVersion = ref(1);
const changeVersion = (index : number) => {
  selectedVersion.value = index;
}
interface Introduce {
  text: string;
  subscribe: string;
}
const introduces = ref<Introduce[]>([
  {text: '虚拟宠物健康助手', subscribe: '随时随地关爱宠物健康! 通过用户提供的宠物健康数据和症状描述，虚拟宠物健康助手能够快速识别潜在的健康问题，并提供初步的诊断建议。' },
  {text: '宠物疾病即时查询', subscribe: '快速准确，了解您宠物的健康状况: 允许直接查询病症相关信息，即时查询并能够迅速匹配并提供详细的疾病信息、症状描述、推荐的\n' +
        '行动方案以及预防措施。' },
  {text: '宠物健康教育与咨询服务', subscribe: '提升宠物主人的健康意识和知识，提供丰富的宠物健康和护理知识库，包括常见疾病的症状、预防和治疗方法等。宠物主人还可以通过平台\n' +
        '与兽医或宠物健康专家进行实时咨询，获得专业的建议和支持。'}
]);
const chatHistory = ref<Message[]>([]);
const userInput = ref<string>('');
const getBotResponse = async (input: string) => {
  try {
    const content = JSON.stringify({prompt: input});
    return await fetch('https://bb8f-111-202-60-158.ngrok-free.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: content,
        }
    );
  } catch (error) {
    console.log(error);
  }
}
function setCursorStatus(dom, status) {
  const classList = {
    loading: 'typing blinker',
    typing: 'typing',
    end: '',
  }
  dom.className = classList[status]
}
const sendMessage = () => {
  const reply = '很抱歉听到您的宠物生病了。在这种情况下，您可能需要尽快采取一些措施来帮助它。首先，您应该尽快联系兽医，描述您的宠物的症状并尽快安排一个预约。兽医将能够提供专业的建议和治疗方案。\n' +
      '\n' +
      '在等待就医的过程中，您可以确保您的宠物有足够的水和舒适的环境休息。如果它不愿意吃东西，不要强迫它，但确保它有食物可供选择。\n' +
      '\n' +
      '请记住，对宠物的健康问题要尽早处理，这通常可以帮助它们更快地康复。祝您的宠物早日康复！'
  const formattedReply = reply.replace(/\n/g, '<br>');
  if (userInput.value.trim() === "") return;

  chatHistory.value.push({ text: userInput.value});

  const resp = getBotResponse(userInput.value);
  chatHistory.value.push({text: formattedReply})
  const index = chatHistory.value.length / 2;
  const bot = document.getElementsByClassName(`bot-message:nth-child(${index})`);
  userInput.value = "";
}
</script>

<style scoped lang="scss">
.chat-container {
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    height: 765px;
    width: 50vw;
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
        background-image: url("@/images/hello_icon.png");
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
      .user-message {
        overflow: hidden;
        font-weight: 500;
        font-size: 20px;
        white-space: nowrap;
        animation: typing 3s forwards;
        margin-top: 5px;
        margin-left: 50px;
        border-radius: 15px;
        padding: 20px;
      }
      .avatar-bot {
        background-image: url("@/images/hello_icon.png");
        align-self: start;
        width: 45px;
        height: 45px;
        border-radius: 45px;
        margin-left: 5px;
      }
      .bot-message {
        margin-top: 5px;
        width: 100%;
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
    .submit {
      width: 47px;
      height: 47px;
      border-radius: 47px;
      background-color: rgb(255, 171, 27);
      background-image: url("@/images/submit_icon.png");
      background-repeat: no-repeat;
      background-position: center ;
      margin-left: 100px;
      cursor: pointer;
    }
  }
}

</style>
