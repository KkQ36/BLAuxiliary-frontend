<template>
  <div class="basic">
    <a-layout style="">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style>
.basic {
  background-image: url('@/images/indexBackgournd.png');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}
</style>
