<template>
  <div id="address">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="name" label="收货人名称" style="min-width: 240px">
          <a-input v-model="searchParams.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item field="tel" label="手机号码" style="min-width: 240px">
          <a-input-tag v-model="searchParams.tel" placeholder="请输入手机号码" />
        </a-form-item>
        <a-form-item field="tel" label="是否默认地址" style="min-width: 240px">
            <a-select v-model:model-value="searchParams.isDefault" :default-value="null" :style="{width:'320px'}" placeholder="是否默认地址">
              <a-option value="true" label="是默认地址"/>
              <a-option value="false" label="不是默认地址"/>
            </a-select>
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
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #isDefault="{ record }">
        {{ record.isDefault?'默认':'不是默认' }}
      </template>
      <template #addTime="{ record }">
        {{ moment(record.addTime).format("YYYY-MM-DD") }}
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
import {
  AdminAddressControllerService,
  AdminUserControllerService,
  GemallAddressQueryRequest,
  GemallUserQueryRequest
} from "@/../generated";
import { Message } from "@arco-design/web-vue";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const isDefault = ref<boolean>();
const searchParams = ref<GemallAddressQueryRequest>({
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
const getDataList = async () => {
  const res = await AdminAddressControllerService.getAddressListUsingPost(
    searchParams.value);
  if (res.code === 0) {
    dataList.value = res.data.records;
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
    title: "收货人名称",
    dataIndex: "name"
  },
  {
    title: "用户ID",
    dataIndex: "userId"
  },
  {
    title: "用户名称",
    dataIndex: "username"
  },
  {
    title: "行政区域省",
    dataIndex: "province"
  },
  {
    title: "行政区域市",
    dataIndex: "city"
  },
  {
    title: "行政区域县",
    dataIndex: "county"
  },
  {
    title: "详细收货地址",
    dataIndex: "addressDetail"
  },
  {
    title: "地区编码",
    dataIndex: "areaCode"
  },
  {
    title: "手机号码",
    dataIndex: "tel"
  },
  {
    title: "是否默认地址",
    slotName: "isDefault"
  },
  {
    title: "创建时间",
    slotName: "addTime"
  },
  {
    slotName: "optional"
  }
];
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  getDataList();
});

/**
 * 页面第一次加载
 */
onMounted(() => {
  getDataList();
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
