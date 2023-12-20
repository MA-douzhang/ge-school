<template>
  <div id="order">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="goodsName" label="商品名称" style="min-width: 240px">
          <a-input v-model="searchParams.goodsName" placeholder="请输入商品名称" />
        </a-form-item>
        <a-form-item field="orderSn" label="订单编号" style="min-width: 240px">
          <a-input v-model="searchParams.orderSn" placeholder="请输入订单编号" />
        </a-form-item>
        <a-form-item field="tel" label="订单状态">
          <a-select v-model:model-value="searchParams.orderStatus" :default-value="null" :style="{width:'320px'}"
                    placeholder="是否默认地址">
            <a-option value="101" label="未付款" />
            <a-option value="201" label="未发货" />
            <a-option value="301" label="未收货" />
            <a-option value="401" label="已收货" />
            <a-option value="402" label="自动收货" />
          </a-select>
        </a-form-item>
        <a-form-item field="consignee" label="收货人名称">
          <a-input v-model="searchParams.consignee" placeholder="请输入收货人名称" />
        </a-form-item>
        <a-form-item field="address" label="收货具体地址" style="min-width: 240px">
          <a-input v-model="searchParams.address" placeholder="请输入收货具体地址" />
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
      <template #orderStatus="{ record }">
        <a-tag
          v-if="record.orderStatus!=null"
          size="large"
          :color=" orderObjectList[record.orderStatus].color"
        >
          {{ orderObjectList[record.orderStatus].text }}
        </a-tag>
      </template>
      <template #shipTime="{ record }">
        {{ record.shipTime == null ? "" : moment(record.shipTime).format("YYYY-MM-DD") }}
      </template>
      <template #confirmTime="{ record }">
        {{ record.confirmTime == null ? "" : moment(record.confirmTime).format("YYYY-MM-DD") }}
      </template>
      <template #endTime="{ record }">
        {{ record.endTime == null ? "" : moment(record.endTime).format("YYYY-MM-DD") }}
      </template>
      <template #addTime="{ record }">
        {{ record.addTime == null ? "" : moment(record.addTime).format("YYYY-MM-DD") }}
      </template>
      <template #updateTime="{ record }">
        {{ record.updateTime == null ? "" : moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space v-if="record.orderStatus===201">
          <a-button type="primary" @click="doShip(record.id)">
            发货
          </a-button>
        </a-space>
      </template>
      <template #deleted="{ record }">
        <a-space>
          <a-button type="primary" @click="doDelete(record.id)">
            删除
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="发货快递" @cancel="handleCancel" @before-ok="handleBeforeOk">
      <a-form :model="form">
        <a-form-item field="shipSn" label="快递编号">
          <a-input v-model="form.shipSn" />
        </a-form-item>
        <a-form-item field="shipChannel" label="快递公司">
          <a-select v-model:model-value="form.shipChannel">
            <a-option v-for="(ship,index) in shipChannelData" :key="index" :value="ship.code" :label="ship.name" />
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script lang="ts" setup>

import { onMounted, ref, watchEffect } from "vue";
import {
  AdminOrderControllerService, AdminVendorsVO, GemallOrderQueryRequest, GemallOrderShipRequest
} from "@/../generated";
import { Message } from "@arco-design/web-vue";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const visible = ref(false);
const form = ref<GemallOrderShipRequest>({
  shipSn: "",
  shipChannel: ""
});
const searchParams = ref<GemallOrderQueryRequest>({
  pageSize: 8,
  current: 1
});
const orderId = ref<number>();
const shipChannelData = ref<any>([]);
/**
 * 重置
 */
const doReset = () => {
  searchParams.value = {
    current: 1,
    pageSize: 8
  };
};

const getDataList = async () => {
  const res = await AdminOrderControllerService.getOrderListUsingPost(
    searchParams.value);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};
/**
 * 获取快递公司信息
 */
const getShipChannelList = async () => {
  const res = await AdminOrderControllerService.channelUsingGet();
  console.log(res.data);
  if (res.code === 0) {
    shipChannelData.value = res.data;
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
    title: "订单编号",
    dataIndex: "orderSn"
  },
  {
    title: "用户名称",
    dataIndex: "username"
  },
  {
    title: "商品名称",
    dataIndex: "goodsName"
  },
  {
    title: "收货人名称",
    dataIndex: "consignee"
  },
  {
    title: "收货人手机号",
    dataIndex: "mobile"
  },
  {
    title: "收货具体地址",
    dataIndex: "address"
  },
  {
    title: "订单状态",
    slotName: "orderStatus"
  },
  {
    title: "商品总费用",
    dataIndex: "goodsPrice"
  },
  {
    title: "订单费用",
    dataIndex: "orderPrice"
  },
  {
    title: "实付费用",
    dataIndex: "actualPrice"
  },
  {
    title: "发货开始时间",
    slotName: "shipTime"
  },
  {
    title: "用户确认收货时间",
    slotName: "confirmTime"
  },
  {
    title: "订单关闭时间",
    slotName: "endTime"
  },
  {
    title: "创建时间",
    slotName: "addTime"
  },
  {
    title: "更新时间",
    slotName: "updateTime"
  },
  {
    slotName: "optional"
  },
  {
    slotName: "deleted"
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
  getShipChannelList();
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
/**
 * 删除
 */
const doDelete = async (ids: number) => {
  const res = await AdminOrderControllerService.deleteOrderUsingPost({
    id: ids
  });
  if (res.code === 0) {
    Message.success(`删除成功`);
  } else {
    Message.error(`删除失败，${res.message}`);
  }
  getDataList();
};
/**
 * 发货
 */
const doShip = (id: number) => {
  visible.value = true;
  orderId.value = id;
};
const handleBeforeOk = async () => {
  const res = await AdminOrderControllerService.shipUsingPost({
    ...form.value,
    orderId: orderId.value
  });
  if (res.code === 0) {
    Message.success(`发货成功`);
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
  getDataList();
};
const handleCancel = () => {
  visible.value = false;
  form.value={
    shipChannel:'',
    shipSn:''
  }
};

const orderObjectList: any = {
  101: { text: `未付款`, color: "#f53f3f" },
  102: { text: `用户取消`, color: "#f53f3f" },
  103: { text: `未支付超时`, color: "#f53f3f" },
  201: { text: "未发货", color: "#ff7d00" },
  202: { text: "申请退款", color: "#ff7d00" },
  203: { text: "退款成功", color: "#18ec00" },
  301: { text: "未收货", color: "#ff7d00" },
  401: { text: "已收货", color: "#18ec00" },
  402: { text: "自动收货", color: "#18ec00" }

};
</script>

<style scoped>

</style>
