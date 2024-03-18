<template>
  <template v-if="isAnotherPage">
    <router-view />
  </template>
  <template v-else>
    <BasicLayout />
  </template>
</template>
<script setup lang="ts">
import {computed} from "vue";
import {useRouter} from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
const route = useRouter();
const isAnotherPage = computed(() => {
  return (
      route.currentRoute.value.path.startsWith("/user") ||
      route.currentRoute.value.path.startsWith("/question")
  );
});
</script>
<style scoped>
.p {
  background-color: red;
}

</style>
