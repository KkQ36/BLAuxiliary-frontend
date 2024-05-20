<template>
  <div class="chat-container">
    <div class="version">
      <div :class="{'version-text-selected': selectedVersion == 1, 'version-text': selectedVersion == 2}" @click="changeVersion(1)">疾病咨询</div>
      <div :class="{'version-text-selected': selectedVersion == 2, 'version-text': selectedVersion == 1}" @click="changeVersion(2)">学习模式</div>
    </div>
    <div class="container"  ref="scrollContainer">
      <div class="hello-text">
        <div class="icon"/>
        <div class="text">
          <div class="text1">你好！我是百灵辅诊</div>
          <div class="text2">借助最先进的技术，我们为您提供精准的诊断服务</div>
          <div class="text3">试试说下以下例子：</div>
          <div class="case">
            <div class="case1" v-for="introduce in s" :key="introduce.text">
              <div class="choose">{{introduce.text}}</div>
              <div class="subscribe">{{introduce.subscribe}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="message" v-for="(message, index) in chatHistory" :key="index" >
        <div :class="{'avatar-user': index % 2 == 0, 'avatar-bot': index % 2 != 0}" />
        <div class="user-message" v-html="message">
        </div>
      </div>
    </div>
    <div class="chat-input">
      <textarea
          class="chat-input-text"
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="请输入你的问题"
          :disabled="sendMessageNow"/>
      <div class="submit"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref} from 'vue';
import type { Ref } from 'vue';
import {BotService} from "@/action/BotService";
import {introduces} from '@/assets/text.json';

const s = introduces; // 页面上的数据
const scrollContainer: Ref<HTMLDivElement | null> = ref(null);
const sendMessageNow = ref(false); // 记录当前是否正在发送消息

const scrollToBottom = () => {
  // 滚动到底部
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

const selectedVersion = ref(1);
const changeVersion = (index : number) => {
  selectedVersion.value = index;
}
const chatHistory = ref<string[]>([]);
const userInput = ref<string>('');

const fakeData = [
  "你好,我是由百灵辅诊团队开发的百灵 AI,致力于辅助兽医诊断和帮助主人了解爱宠病症。", 
  "您好,您的狗除了没有精神之外还有没有伴随其他症状呢？比如发热,呕吐,呼吸困难等其他症状,这有助于我更好地诊断病情。",
  "好的,除了发热和精神不振,您的狗是否还出现了流口水,牙龈出血等症状呢？",
  "经过我的分析,您的狗应该患上了口炎,原发性口炎多由机械损伤造成(如骨头、鱼刺等异物刺伤,"+
  "或牙齿生长不规则等),其次是物理和化学刺激(如口服浓度过高或过热的刺激性物质等)," + 
  "继发性口炎常见于犬瘟热、甲状腺及甲状旁腺机能亢进、VB缺乏等。",
  "1、首先要消除犬口炎的病因。检查清洁狗狗的口腔,如果有黏膜存在刺或骨头等异常,就要将其拔出,"+
  "如果是狗狗的牙齿比较尖锐导致,则就要帮它修整锐齿,主人要暂停给狗狗服用刺激性药物。\n" + 
  "2、加强狗狗的口腔护理。主人在狗狗治疗期间,要以流质食物给它喂食,多让它喝水,每次狗狗进食之后用清水给它清洗口腔等。\n" + 
  "3、使用药物治疗。犬口炎的治疗要先清洗，然后上药，之后要给at做好口腔护理。对于清洗患犬的口腔，主人可以用1%生理盐水溶液、"+
  "2% ~ 3%硼酸溶液或碳酸氢钠溶液来进行，每日给它清洗2 ~ 3次。对于出现严重恶臭的病例，可另外添加0.1%的高锰酸钾溶液给患犬清洗。"+
  "如果患犬流口水的症状很严重，可用1%明矾或鞣酸液帮它缓解。要是狗狗的口腔黏膜或舌部还出现糜烂或溃疡，主人在清洗了患犬的口腔之后"+
  "需用碘甘油、2%龙胆紫或1%硫酸甘油乳剂其中一种药物涂在患犬的溃疡处，每天需涂2~3次。如果患犬的口炎非常严重,"+
  "则就需要用到磺胺矾合剂或者中药青黛散来治疗,这些药物对治疗犬口炎可起到很好的效果。"
]; // 假数据
let step = 0; // 假数据步数
// 点击发送之后执行的逻辑
const sendMessage = async () => {
  sendMessageNow.value = true;
  chatHistory.value.push(userInput.value); // 用户输入
  // let reply = await BotService.getBotMessage(userInput.value);
  let reply = fakeData[step++];
  userInput.value = "";
  const formattedReply = (reply as string)
      .replace(/\n/g, '<br>');
  // 打字机效果
  let index = 0;
  chatHistory.value.push("");
  const intervalId = setInterval(() => {
    if (index < formattedReply.length) {
      chatHistory.value[chatHistory.value.length - 1] += formattedReply[index];
      index++;
      nextTick(() => {
        scrollToBottom()
      });
    } else {
      clearInterval(intervalId);
      sendMessageNow.value = false;
    }
  }, 30)
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
        background-image: url("@/images/hello_icon.png");
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
      background-image: url("@/images/submit_icon.png");
      background-repeat: no-repeat;
      background-position: center ;
      margin-left: 100px;
      cursor: pointer;
    }
  }
}

</style>
