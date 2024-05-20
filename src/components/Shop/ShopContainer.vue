<template>
  <div>
    <div class="shopContainer">
      <a-card v-for="item in data" :key="item.src" hoverable class="shopCards">
        <a-image width="100%" :src="item.src" class="shopImage" />
        <a-card-meta class="shopCardDescription">
          <template #description>
            {{ item.title }}<br />
            {{ item.description }}<br />
            <p>
              ￥{{ item.price }} <span>售出{{ item.saledNum }}件</span>
            </p>
          </template>
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue'
const props = defineProps(['data'])
const data = toRef(props, 'data')
// watch(props, () => {
//   console.log('props', props.data[0].title)
//   console.log('data', data.value[0].title)
// })
</script>

<style lang="scss" scoped>
.shopContainer {
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100rem;
  font-size: 24px;
  gap: 1rem;

  .shopCards {
    width: 15%;
  }

  .shopCardDescription {
    font-size: 24px;
    p {
      font-size: 24px;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
