<template>
  <div id="user">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="nickname" label="名称" style="min-width: 240px">
          <a-input v-model="searchParams.nickname" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item field="username" label="账户" style="min-width: 240px">
          <a-input-tag v-model="searchParams.username" placeholder="请输入账户" />
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
      <template #gender="{ record }">
        {{ record.gender==1?'男':'女' }}
      </template>
      <template #userLevel="{ record }">
        {{ record.userLevel==0?'普通用户':'VIP用户' }}
      </template>
      <template #status="{ record }">
        {{ record.status==0?'可用':'禁用' }}
      </template>
      <template #lastLoginTime="{ record }">
        {{ moment(record.lastLoginTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)">
            查看
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

const searchParams = ref<GemallUserQueryRequest>({
  pageSize: 8,
  current: 1
});
/**
 * 重置
 */
const doReset = ()=>{
  searchParams.value = {
    current: 1,
    pageSize: 8,
  };
}
const getUserList = async () => {
  const res = await AdminUserControllerService.getUserListUsingPost(
    searchParams.value);
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
    dataIndex: "id"
  },
  {
    title: "名称",
    dataIndex: "username"
  },
  {
    title: "昵称",
    dataIndex: "nickname"
  },
  {
    title: "用户等级",
    slotName: "userLevel"
  },
  {
    title: "手机号",
    dataIndex: "mobile"
  },
  {
    title: "性别",
    slotName: "gender"
  },
  {
    title: "状态",
    slotName: "status"
  },
  {
    title: "最新登录时间",
    slotName: "lastLoginTime"
  },
  {
    title: "最新登录ip",
    dataIndex: "lastLoginIp"
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
