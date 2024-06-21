<template>
  <div>
    <div class="shopContainer">
      <a-card v-for="item in data" :key="item.src" hoverable class="shopCards">
        <a-image width="100%" :src="item.src" class="shopImage" />
        <a-card-meta class="shopCardDescription">
          <template #description>
            <p class="title">{{ item.title }}</p>
            <p class="description">{{ item.description }}</p>
            <div class="shopArea">
              <p class="price">预估价：￥{{ item.price }}</p>
              <a :href="item.shopHref" class="buyBtn">立即购买</a>
            </div>
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
    text-align: left;
    font-size: 20px;
    .description {
      color: #aaa;
      font-size: 15px;
    }
    .shopArea {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .price {
        font-size: 15px;
      }
      .buyBtn {
        width: 5em;
        color: white;
        font-size: 12px;
        text-align: center;
        background-color: rgba(248, 76, 0, 0.7);
        border-radius: 5px;
      }
    }
  }
}
</style>
