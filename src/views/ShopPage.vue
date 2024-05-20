<template>
  <div class="container">
    <ShopContainer v-model:data="curData"></ShopContainer>
    <div class="paginationArea">
      <a-pagination
        :total="data.length"
        :page-size="pageSize"
        show-total
        size="large"
        v-model:current="curPage"
        class="pagination"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ShopContainer from '@/components/Shop/shopContainer.vue'
import data from '@/assets/shopData.json'
const pageSize = ref(18)
const curPage = ref(1)
let curData = computed(() => {
  return data.slice((curPage.value - 1) * pageSize.value, curPage.value * pageSize.value)
})
</script>

<style lang="scss">
.container {
  text-align: center;
}
.paginationArea {
  display: inline-block;
  margin-top: 10px;
  .arco-pagination-item {
    font-size: 24px;
    height: 36px;
    width: 36px;
    line-height: 36px;
  }
}
</style>
