<template>
  <div id="goodsList">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="name" label="商品名称" style="min-width: 240px">
          <a-input v-model="searchParams.name" placeholder="请输入商品名称" />
        </a-form-item>
        <a-form-item field="isOnSale" label="是否上架">
          <a-select v-model:model-value="searchParams.isOnSale" :default-value="null" :style="{width:'320px'}"
                    placeholder="是否上架">
            <a-option value="true" label="上架" />
            <a-option value="false" label="下架" />
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
      <template #isOnSale="{ record }">
        <a-tag
          v-if="record.isOnSale!=null"
          size="large"
          :color="getObjectList[!record.isOnSale].color"
        >
          {{ record.isOnSale? "已经上架" : "已经下架" }}
        </a-tag>
      </template>
      <template #isNew="{ record }">
        <a-tag
          v-if="record.isNew!=null"
          size="large"
          :color="getObjectList[!record.isOnSale].color"
        >
          {{ record.isNew? "新品" : "非新品" }}
        </a-tag>
      </template>
      <template #isHot="{ record }">
        <a-tag
          v-if="record.isHot!=null"
          size="large"
          :color="getObjectList[!record.isHot].color"
        >
          {{ record.isHot?  "普通":"火热" }}
        </a-tag>
      </template>
      <template #picUrl="{ record }">
        <a-image :src="record.picUrl" width="50px" height="50px" />
      </template>
      <template #detail="{ record }">
        <a-modal v-model:visible="detailDialogVisible" :hide-cancel="true"  title="商品详情">
          <div class="goods-detail-box" v-html="goodsDetail" />
        </a-modal>
        <a-button type="primary" size="mini" @click="showDetail(record.detail)">查看详情</a-button>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doEdit(record.id)">
            编辑
          </a-button>
        </a-space>
      </template>
      <template #deleted="{ record }">
        <a-space>
          <a-button  type="primary" status="danger" @click="showDelete(record.id)">
            删除
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-modal v-model:visible="isDeleteVisible" @ok="doDelete" @cancel="handleCancel">
      是否删除？
    </a-modal>
  </div>

</template>

<script lang="ts" setup>

import { onMounted, ref, watchEffect } from "vue";
import {
  AdminGoodsControllerService,
  AdminOrderControllerService, GemallGoodsQueryRequest, GemallOrderShipRequest
} from "@/../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const isDeleteVisible = ref(false);
const deleteId = ref<number>();
const searchParams = ref<GemallGoodsQueryRequest>({
  pageSize: 8,
  current: 1
});
const detailDialogVisible = ref<boolean>(false);
const goodsDetail = ref<string>();
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
  const res = await AdminGoodsControllerService.getGoodsListUsingPost(
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
    title: "商品名称",
    dataIndex: "name"
  },
  {
    title: "商品图片",
    slotName: "picUrl"
  },
  {
    title: "商品详细",
    slotName: "detail"
  },
  {
    title: "是否上架",
    slotName: "isOnSale"
  },

  {
    title: "是否新品首发",
    slotName: "isNew"
  },
  {
    title: "是否人气推荐",
    slotName: "isHot"
  },
  {
    title: "专柜价格",
    dataIndex: "counterPrice"
  },
  {
    title: "零售价格",
    dataIndex: "retailPrice"
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
const showDelete = (ids: number) => {
  isDeleteVisible.value=true;
  deleteId.value = ids;
};
/**
 * 删除
 */
const doDelete = async () => {
  const res = await AdminGoodsControllerService.deleteGoodsUsingPost({
    id: deleteId.value
  });
  if (res.code === 0) {
    Message.success(`删除成功`);
  } else {
    Message.error(`删除失败，${res.message}`);
  }
  getDataList();
};
const handleCancel = ()=>{
  isDeleteVisible.value = false
}
/**
 * 编辑
 */
const doEdit = (ids: number) => {
  router.push({
    path:'goodEdit',
    query: {
      id: ids,
    },
  })
};
/**
 * 显示商品详情
 * @param goodsDetails
 */
const showDetail=(goodsDetails:string)=>{
  detailDialogVisible.value=true;
  goodsDetail.value=goodsDetails;
}
const getObjectList: any = {
  false: { color: "#f53f3f" },
  true: { color: "#18ec00" }
};
</script>

<style scoped>
.goods-detail-box img{
  width: 100%;
}
</style>
