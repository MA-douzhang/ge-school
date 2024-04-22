<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <!--        头部-->
        <GlobalHeader />
      </a-layout-header>
      <!--      内容-->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      脚步-->
      <a-layout-footer class="footer">
        <FootComponent></FootComponent>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
<script>
import FootComponent from "@/components/FootComponent";
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader, FootComponent },
};
</script>
