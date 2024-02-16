<template>
  <div id="questionList">
    <a-card>

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

      <template #_id="{ record }">
        {{ record._id.$oid }}
      </template>
      <template #statue="{ record }">
        <a-tag
          v-if="record.statue!=null"
          size="large"
          :color="getObjectList[record.statue].color"
        >
          {{ record.statue === 0 ? "启用" : "已禁用" }}
        </a-tag>
      </template>

      <template #content="{ record }">
        <p class="item-description">
          {{ record.content }}
        </p>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doStatue(record._id)">
            更改状态
          </a-button>
          <a-button type="primary" @click="doEdit(record._id)">
            编辑
          </a-button>
          <a-button type="primary" status="danger" @click="doDelete(record._id)">
            删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>

</template>

<script lang="ts" setup>

import { onMounted, ref, watchEffect } from "vue";
import {
  AdminGoodsControllerService,
  AdminOrderControllerService, GemallGoodsQueryRequest, GemallOrderShipRequest, OpenAPI
} from "@/../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { ImgControllerService } from "../../../../generated/services/ImgControllerService";
import { PostControllerService } from "../../../../generated/services/PostControllerService";
import { PartitionControllerService } from "../../../../generated/services/PartitionControllerService";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../../generated/services/QuestionControllerService";

const imgVisible = ref<boolean>(false);
const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const isDeleteVisible = ref(false);
const searchParams = ref({
  pageSize: 8,
  current: 1,
});
const partitionList = ref([]);
const getDataList = async () => {
  const res = await QuestionControllerService.listUsingAdminGet(
    searchParams.value.current,
    searchParams.value.pageSize
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList.value);
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};
const columns = [
  {
    title: "_id",
    dataIndex: "_id",
    slotName: "_id"
  },
  {
    title: "标题",
    dataIndex: "title",
    slotName: "title"
  },
  {
    title: "内容",
    dataIndex: "content",
    slotName: "content"
  },
  {
    title: "点赞数",
    dataIndex: "thumb_num",
    slotName: "thumb_num"
  },
  {
    title: "创建账户",
    dataIndex: "create_user_name",
    slotName: "create_user_name"
  },
  {
    title: "状态",
    slotName: "statue",
    dataIndex: "statue"
  },
  {
    slotName: "optional"
  },
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

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  };
};


const handleCancel = () => {
  isDeleteVisible.value = false;
};
/**
 * 更改状态
 */
const doStatue = async (ids: any) => {
  console.log(ids.$oid);
  const res = await QuestionControllerService.updateStatuePost(ids.$oid);
  if (res.code === 0) {
    Message.success(`更新成功`);
    getDataList();
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};

const getObjectList: any = {
  1: { color: "#f53f3f" },
  0: { color: "#18ec00" }
};


const doEdit = (_id: any) => {
  router.push({
    path: "/questionManager/edit",
    query: {
      id: _id.$oid,
    },
  });
};

const doDelete = async (ids: any) => {
  const res = await QuestionControllerService.deleteQuestionByIdPost(ids.$oid);
  if (res.code === 0) {
    Message.success(`删除成功`);
    getDataList();
  } else {
    Message.error(`删除失败， ${res.message}`);
  }
};
</script>

<style scoped>
.goods-detail-box img {
  width: 100%;
}
.item-description {
  max-width: 800px;
  height: 48px;
  text-align: left;
  margin-top: -2px; /* 调整上边距为负值 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 最大显示行数 */
  line-clamp: 2; /* 最大显示行数 */
  color: #3c3c4399;
}
</style>
