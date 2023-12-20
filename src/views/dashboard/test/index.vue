<template>
  <div id="test">
    <h1>{{ str }}</h1>
    <a-input v-model:model-value="str"></a-input>
    <a-button type="primary" @click="getStr">请求</a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { AdminControllerService } from "../../../../generated";

const str = ref<string>();

const getStr = async () => {
  const res = await AdminControllerService.getTestUsingGet(str.value);
  console.log(res)
  str.value = res.data;
};

</script>

<style scoped>

</style>
