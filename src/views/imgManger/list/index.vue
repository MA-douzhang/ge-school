<template>
  <div id="imgList">
    <a-card>
      <a-form layout="inline">
        <a-form-item>
          <a-button  type="primary" @click="imgVisible=true">上传图片</a-button>
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

      <template #url="{ record }">
        <a-image :src="record.url" width="50px" height="50px" />
      </template>
      <template #detail="{ record }">
        <a-modal v-model:visible="detailDialogVisible" :hide-cancel="true" title="商品详情">
          <div class="goods-detail-box" v-html="goodsDetail" />
        </a-modal>
        <a-button type="primary" size="mini" @click="showDetail(record.detail)">查看详情</a-button>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doEdit(record._id)">
            更改状态
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-modal v-model:visible="imgVisible" title="上传图片" @cancel="imgVisible=false"
             @ok="handleImgOk">
      <a-form>
        <a-form-item label="上传图片">
          <a-upload
            :action="uploadPath"
            :fileList="file ? [file] : []"
            :show-file-list="false"
            @change="onChange"
            @progress="onProgress"
          >
            <template #upload-button>
              <div
                :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
              >
                <div
                  class="arco-upload-list-picture custom-upload-avatar"
                  v-if="file && file.url"
                >
                  <img :src="file.url" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-progress
                    v-if="file.status === 'uploading' && file.percent < 100"
                    :percent="file.percent"
                    type="circle"
                    size="mini"
                    :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
                  />
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
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

const imgVisible=ref<boolean>(false)
const uploadPath = ref<string>("http://47.109.132.119:9093/img/upload");
const router = useRouter();
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();
const isDeleteVisible = ref(false);
const file = ref();
const searchParams = ref<GemallGoodsQueryRequest>({
  pageSize: 8,
  current: 1
});
const detailDialogVisible = ref<boolean>(false);
const goodsDetail = ref<string>();

const getDataList = async () => {
  const res = await ImgControllerService.listUsingGet(
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
    title: "图片名",
    dataIndex: "name"
  },
  {
    title: "图片地址",
    slotName: "url"
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
const doEdit = async (ids: any) => {
  console.log(ids.$oid);
  const res = await ImgControllerService.updateStatuePost(ids.$oid);
  if (res.code === 0) {
    Message.success(`更新成功`);
    getDataList();
    file.value=null
  } else {
    Message.error(`加载失败， ${res.message}`);
  }
};
/**
 * 显示商品详情
 * @param goodsDetails
 */
const showDetail = (goodsDetails: string) => {
  detailDialogVisible.value = true;
  goodsDetail.value = goodsDetails;
};
const getObjectList: any = {
  1: { color: "#f53f3f" },
  0: { color: "#18ec00" }
};

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile
    // url: URL.createObjectURL(currentFile.file),
  };
};
const onProgress = (currentFile: any) => {
  file.value = currentFile;
};

/**
 * 参数添加
 */
const handleImgOk = () => {
  imgVisible.value = false;
};
</script>

<style scoped>
.goods-detail-box img {
  width: 100%;
}
</style>
