<template>
  <div id="postEdit" style="margin-left: 20px">
    <h2>帖子编辑</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="partitionId" label="文章分区">
        <a-select v-model:model-value="form.partitionId" :default-value="null" :style="{width:'320px'}"
                  placeholder="文章分区">
          <a-option v-for="item in partitionList" :key="item.pid_id" :value="item.pid_id" :label="item.name" />
        </a-select>
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
        >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>

import { useRoute, useRouter } from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import { onMounted, ref } from "vue";
import { PartitionControllerService } from "../../../../generated/services/PartitionControllerService";
import { Message } from "@arco-design/web-vue";
import { PostControllerService } from "../../../../generated/services/PostControllerService";

const route = useRoute();
const router = useRouter();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("edit");
const partitionList = ref([]);
const form = ref({
  title: "",
  content: "",
  partitionId:0
});
const getPartitionList = async () => {
  const res = await PartitionControllerService.listUsingGet();
  if (res.code === 0) {
    partitionList.value = res.data;
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};
/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const ids=route.query.id
  if (!ids) {
    return;
  }
  const res = await PostControllerService.getPostByIdGet(
    ids as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    form.value.partitionId=res.data.partition_id
    console.log("form",form)
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
}
onMounted(()=>{
  loadData()
  getPartitionList()
})
const onContentChange = (value: string) => {
  form.value.content = value;
};
const doSubmit= async ()=>{
  const ids=route.query.id
  console.log(form.value);
  // 区分更新还是创建
  if (updatePage) {
    const res = await PostControllerService.updatePostPost(
      ids as any,
      form.value.title,
      form.value.content,
      form.value.partitionId
    );
    if (res.code === 0) {
      Message.success("更新成功");
      router.push({
        path: "/postManager/postList",
        replace: true,
      });
    } else {
      Message.error(`更新失败， ${res.message}`);
    }
  } else {
    const res = await PostControllerService.savePostPost(
      form.value.title,
      form.value.content,
      form.value.partitionId
    );
    if (res.code === 0) {
      Message.success("创建成功");
      router.push({
        path: "/postManager/postList",
        replace: true,
      });
    } else {
      Message.error(`创建失败， ${res.message}`);
    }
  }
}
</script>

<style scoped>

:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>
