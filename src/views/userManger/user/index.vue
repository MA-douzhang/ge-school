<template>
  <div id="user">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="nickname" label="工号" style="min-width: 240px">
          <a-input v-model="searchParams.jobNumber" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doSubmit">提交</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="doReset">重置</a-button>
        </a-form-item>
      </a-form>

    </a-card>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="userList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #_id="{ record }">
        {{ record._id }}
      </template>
      <template #optional>
        <a-space>
          <a-button type="primary" @click="doStatue(record._id)">
            更改状态
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>

</template>

<script lang="ts" setup>

import { onMounted, ref, watchEffect } from "vue";
import { AdminUserControllerService, GemallUserQueryRequest } from "@/../generated";
import { Message } from "@arco-design/web-vue";
import moment from "moment";

const userList = ref([]);
const total = ref<number>(0);
const tableRef = ref();

const searchParams = ref<any>({
  pageSize: 8,
  current: 1,
  jobNumber: ""
});
/**
 * 重置
 */
const doReset = () => {
  searchParams.value = {
    current: 1,
    pageSize: 8,
    jobNumber: ""
  };
};
const getUserList = async () => {
  const res = await AdminUserControllerService.getUserListUsingPost(
    searchParams.value.jobNumber,
    searchParams.value.current,
    searchParams.value.pageSize);
  if (res.code === 0) {
    userList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    slotName: "_id"
  },
  {
    title: "名称",
    dataIndex: "username"
  },
  {
    title: "工号",
    dataIndex: "job_number"
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    slotName: "optional"
  }
];
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  getUserList();
});

/**
 * 页面第一次加载
 */
onMounted(() => {
  getUserList();
});

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1
  };
};
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  };
};

</script>

<style scoped>

</style>
