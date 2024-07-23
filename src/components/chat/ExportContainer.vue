<template xmlns='http://www.w3.org/1999/html'>
  <div v-show="visible" class="floating-window">
    <div class="floating-window-content">
      <div class='title'>导出宠物病例单</div>
      <div class='context'>
        宠物基本信息：<br /><br />

        姓名：__________________<br /><br />
        年龄：__________________<br /><br />
        品种：__________________<br /><br />
        性别：__________________<br /><br />
        体重：__________________<br /><br />
        疫苗接种记录：_____________________________________________<br /><br />
        主诉：
        消化不良、
        食欲不振、
        站立困难、
        精神抑郁
        <br />
        详细症状描述：<br />
        消化不良：狗狗出现消化不良的症状。<br />
        食欲不振：狗狗的食欲下降，不愿意进食。<br />
        站立困难：狗狗在站立时表现出困难，可能影响其行走能力。<br />
        精神抑郁：狗狗表现出精神沉郁，行为异常。<br />
        <br />
        饮食习惯变化：<br /><br />

        最近饮食结构调整：____________________________<br /><br />
        可能的诊断：<br />

        伺楼病：<br />
         根据狗狗的症状，可能患有伺楼病（维生素D缺乏性佝偻病）。这是一种由于维生素D摄入不足或吸收障碍导致的钙磷代谢紊乱，可能影响骨骼发育和神经系统功能。<br /><br />
        治疗方案：<br />
        补充维生素D：通过口服维生素D3补充剂来增加体内钙磷水平，如鱼肝油、钙片等。剂量需要根据狗狗的体重和病情来调整，最好在兽医指导下进行。<br />
        饮食调整：确保狗狗的食物富含钙和磷，如专门为宠物设计的钙磷平衡食品，以及富含钙的肉类和蔬菜。<br />
        增加户外活动：尽可能让狗狗多晒太阳，因为紫外线可以帮助身体合成维生素D。但要注意避免中午阳光强烈时段，防止皮肤灼伤。<br />
        治疗伴随症状：对于肌肉无力和神经症状，可能需要药物治疗，如镇静剂、抗抽搐药等。<br />
        定期检查：定期带狗狗去兽医那里做血液检查，检测维生素D和钙磷水平，以及骨骼状况，以便调整治疗方案。<br /><br />
        注意事项： 早期发现并治疗伺楼病效果最佳，因此预防非常重要。如果你怀疑你的狗狗可能患有伺楼病，应立即咨询兽医。<br /><br />
        兽医签名： _________<br />
        日期： _________<br />
        ____________________________________________________________________________________________<br />
        请根据实际情况填写相关信息，并咨询专业兽医获取更准确的诊断和治疗建议。<br /><br />
      </div>
      <div class='button-group'>
        <a-button shape='round' type='primary' @click="closeWindow">导出</a-button>
        <a-button shape='round' type='primary' status='danger' @click="closeWindow">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  },
  emits: ['update:visible'],
  methods: {
    closeWindow() {
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped>
.floating-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-window-content {
  background: white;
  padding: 90px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  text-align: center;
  max-width: 600px;
  .title {
    margin: auto;
    font-size: 30px;
  }
  .context {
    text-align: start;
  }
}

.button-group {
  display: flex;
  justify-content: space-around;
}
</style>