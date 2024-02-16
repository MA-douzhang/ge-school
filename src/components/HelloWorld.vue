<template>
  <div>
    <a-calendar v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";

const value = ref(new Date("2023-01-01"));
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
