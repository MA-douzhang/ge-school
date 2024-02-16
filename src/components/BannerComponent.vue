<template>
  <div id="banner" class="banner">
    <a-carousel
      :style="{
        width: '100%',
        height: '460px',
        position: 'relative',
      }"
      :auto-play="true"
      indicator-type="dot"
      show-arrow="hover"
    >
      <a-carousel-item v-for="record in images" :key="record">
        <img
          :src="record.url"
          :style="{
            width: '100%',
            height: '100%',
            position: 'relative',
          }"
        />
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ImgControllerService } from "../../generated/services/ImgControllerService";

const images = ref([
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp",
  "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp",
]);

/**
 * 页面第一次加载
 */
onMounted(() => {
  getImgList();
});
const getImgList = async () => {
  const res = await ImgControllerService.listUsingGet();
  images.value = res.data;
};
</script>
<style scoped></style>
