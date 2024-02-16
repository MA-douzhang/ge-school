<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
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
