<template>
  <div id="postDetail">
    <a-card title="文章">
      <a-card :style="{ marginBottom: '20px' }">
        <div style="text-align: center">
          <H1>{{ post.title }}</H1>
          <p>发布时间 {{ post.create_time.$date }}</p>
        </div>
      </a-card>
      <a-card class="mdView">
        <a-divider></a-divider>
        <div style="margin: 16px 20px; align-items: center">
          <MdViewer :value="post.content"></MdViewer>
        </div>
      </a-card>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { PostControllerService } from "../../../generated/services/PostControllerService";
import { onMounted, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
const route = useRoute();
const post = ref({
  content: "123",
  create_time: "2020",
});
/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const ids = route.query.id;
  const res = await PostControllerService.getPostByIdGet(ids as any);
  console.log("res", res);
  if (res.code === 0) {
    post.value = res.data;
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};
/**
 * 初始化
 */
onMounted(() => {
  loadData();
});
</script>
<style scoped>
.mdView {
  display: flex;
  margin-left: 15%;
  margin-right: 15%;
}
</style>
