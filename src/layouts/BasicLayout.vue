<template>
  <div class="basic">
    <a-layout style="height: 1100px">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
.basic {
  background-image: url("@/images/indexBackgournd.png");
  background-size: cover;
  height: 100%;
  width: 100vw;
}
.content {
  margin-top: 0;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
