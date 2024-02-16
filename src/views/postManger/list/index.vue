<template>
  <div id="postList">
    <a-card>
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="tel" label="文章分区" style="min-width: 240px">
          <a-select v-model:model-value="searchParams.partitionId" :default-value="null" :style="{width:'320px'}"
                    placeholder="文章分区">
            <a-option v-for="item in partitionList" :key="item.pid_id" :value="item.pid_id" :label="item.name" />
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

      <template #_id="{ record }">
        {{ record._id }}
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
      <template #partitionId="{ record }">
        <p>
          {{getPartitionName(record.partition_id)}}
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
        </a-space>
      </template>
    </a-table>
    <a-modal v-model:visible="imgVisible" title="上传图片" @cancel="imgVisible=false"
             @ok="handleImgOk">
      <a-form>
        <a-form-item label="新增文章">
        </a-form-item>
      </a-form>
    </a-modal>

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

const imgVisible = ref<boolean>(false);
const uploadPath = ref<string>("http://47.109.132.119:9093/img/upload");
const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const isDeleteVisible = ref(false);
const searchParams = ref({
  pageSize: 8,
  current: 1,
  partitionId: 0
});
const partitionList = ref([]);
const getDataList = async () => {
  const res = await PostControllerService.listUsingAdminGet(
    searchParams.value.partitionId,
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
const getPartitionList = async () => {
  const res = await PartitionControllerService.listUsingGet();
  if (res.code === 0) {
    partitionList.value = res.data;
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
    title: "分区",
    dataIndex: "partition_id",
    slotName: "partitionId"
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
    title: "创建时间",
    slotName: "create_time"
  },
  {
    title: "更新时间",
    slotName: "update_time"
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
  getPartitionList();
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
  const res = await PostControllerService.updateStatuePost(ids.$oid);
  if (res.code === 0) {
    Message.success(`更新成功`);
    getDataList();
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};

/**
 * 更改状态
 */
const getPartitionName = (id: any) => {
 const name:any =partitionList.value.find(item=>item!.pid_id===id)?.name
  return name
};
const getObjectList: any = {
  1: { color: "#f53f3f" },
  0: { color: "#18ec00" }
};

/**
 * 参数添加
 */
const handleImgOk = () => {
  imgVisible.value = false;
};

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
/**
 * 重置
 */
const doReset = () => {
  searchParams.value = {
    partitionId: 0,
    current: 1,
    pageSize: 8
  };
};

const doEdit = (_id: any) => {
  router.push({
    path: "/postManager/edit",
    query: {
      id: _id.$oid,
    },
  });
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
