<template>
  <div id="video" class="banner">
    <a-row :gutter="20" :style="{ marginBottom: '10px' }">
      <a-col :span="6">
        <a-card
          title="C语言介绍"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <video controls width="250">
            <source
              src="https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/c.mp4"
              type="video/mp4"
            />
          </video>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="Java语言介绍"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <video controls width="250">
            <source
              src="https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/java.mp4"
              type="video/mp4"
            />
          </video>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="GO语言介绍"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <video controls width="250">
            <source
              src="https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/go.mp4"
              type="video/mp4"
            />
          </video>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="Python语言介绍"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <video controls width="250">
            <source
              src="https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/python.mp4"
              type="video/mp4"
            />
          </video>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ImgControllerService } from "../../generated/services/ImgControllerService";

const images = ref([
  "https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/张建视频介绍.mp4",
  "https://geschool-bucket.oss-cn-chengdu.aliyuncs.com/张建视频介绍.mp4",
]);

/**
 * 页面第一次加载
 */
onMounted(() => {
  // getImgList();
});
const getImgList = async () => {
  const res = await ImgControllerService.listUsingGet();
  images.value = res.data;
};
</script>
<style scoped></style>
