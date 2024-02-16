<template>
  <div id="questionAdd" style="margin-left: 20px">
    <h2>问题编辑</h2>
    <a-divider></a-divider>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
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
import { useRouter } from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { ref } from "vue";

const router = useRouter();
// 如果页面地址包含 update，视为更新页面
const form = ref({
  title: "",
  content: "",
});
/**
 * 根据题目 id 获取老的数据
 */
const onContentChange = (value: string) => {
  form.value.content = value;
};
const doSubmit = async () => {
  const res = await QuestionControllerService.saveQuestionPost(
    form.value.title,
    form.value.content
  );
  if (res.code === 0) {
    Message.success("创建成功");
    router.push({
      path: "/question",
      replace: true,
    });
  } else {
    Message.error(`创建失败， ${res.message}`);
  }
};
</script>

<style scoped>
:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>
