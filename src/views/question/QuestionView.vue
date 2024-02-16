<template>
  <div id="question">
    <div style="text-align: right; margin: 5px">
      <a-button type="primary" status="success" @click="addAnswer(questionId)">
        <icon-pen-fill />
        发布问题
      </a-button>
    </div>

    <a-list
      class="list-demo-action-layout"
      item-layout="horizontal"
      :bordered="false"
      :split="false"
      :data="dataList"
      :pagination-props="{
        bufferSize: 3,
        showJumper: true,
        showPageSize: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <template #item="{ item }">
        <div
          style="
            background-color: #ffffff;
            height: 184px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px auto 15px;
            margin-left: 30px;
            margin-right: 30px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          "
        >
          <a-list-item class="list-demo-item" action-layout="vertical">
            <template #actions>
              <span
                class="action"
                key="heart"
                @click="onLikeChange(item.id)"
                style="margin-left: 10px"
              >
                <span v-if="item.hasThumb === 1 || item.hasThumb === true">
                  <icon-thumb-up :style="{ color: '#f53f3f' }" size="15" />
                </span>
                <span v-else> <icon-thumb-up size="15" /> </span>
                {{ item.thumb_num }}
              </span>
              <span class="action" key="star">
                <span>
                  <icon-message size="15" />
                </span>
                {{ item.commentNumber }}
              </span>
            </template>
            <a-list-item-meta>
              <template #title>
                <h3 class="item-title" style="margin-top: -5px">
                  {{ item.title }}
                </h3>
              </template>
              <template #avatar>
                <a-avatar
                  shape="square"
                  style="margin-left: 15px"
                  image-url="https://ts4.cn.mm.bing.net/th?id=ODLS.29da3c9d-3cf7-4e1a-8c90-5d104df2bb24&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2"
                >
                </a-avatar>
              </template>
              <template>
                <a-pagination
                  :total="total"
                  show-total
                  show-jumper
                  show-page-size
                />
              </template>
              <template #description>
                <p
                  @click="getQuestionAnswer(item.id)"
                  style="cursor: pointer"
                  class="item-description"
                >
                  {{ item.content }}
                </p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </div>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineProps, onMounted, ref, watchEffect, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";

interface Props {
  questionId?: number;
}

const props = withDefaults(defineProps<Props>(), {
  questionId: () => 0,
});
const route = useRoute();
const router = useRouter();

interface QuestionItem {
  id: number;
  thumb_num: number;
  title: string;
  content: string;
  create_user_name: string;
  hasThumb?: number;
  commentNumber?: number;
}

const searchParams = ref<any>({
  searchText: "",
  title: "",
  tags: [],
  pageSize: 10, // 设置pageSize的初始值
  current: 1,
  sortField: "thumbNum",
  sortOrder: "descend",
});

const dataList = ref<QuestionItem[]>([]);

const total = ref();

const loadData = async () => {
  try {
    const res = await QuestionControllerService.listUsingGet(
      searchParams.value.current,
      searchParams.value.pageSize
    );
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败：" + res.message);
    }
  } catch (e) {
    message.error("请登录后查看");
  }
};

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.searchText,
  } as never;
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

// 初次获取点赞的状态
const getQuestionAnswer = async (questionId: string) => {
  router.push({
    path: "/question/detail",
    query: {
      id: questionId,
    },
  });
};

// 点爱心
const onLikeChange = async (questionId: any) => {
  const res = await QuestionControllerService.doThumbQuestionPost(questionId);
  if (res.code === 0) {
    console.log("点赞数据：", dataList.value);
    console.log("questionId：", questionId);
    const index = dataList.value.findIndex((item) => item.id === questionId);
    if (index !== -1) {
      const post = dataList.value[index];
      post.thumb_num += res.data === 1 ? 1 : -1;
      post.hasThumb = res.data === 1 ? 1 : 0;
    }
  } else {
    message.error("点赞失败：" + res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize,
  };
};

/**
 * 添加题解
 * @param questionId
 */
const addAnswer = () => {
  router.push({
    path: "/question/add",
  });
};
</script>

<style scoped>
.list-demo-action-layout .image-area {
  width: 190px;
  height: 150px;
  border-radius: 2px;
  overflow: hidden; /* 限制图片溢出容器 */
  margin-right: 18px;
  margin-top: 10px;
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.list-demo-item .item-title {
  text-align: left;
  font-weight: normal; /* 去掉加粗 */
  margin-bottom: 2px; /* 调整标题与描述之间的底部间距 */
}

.list-demo-item .item-description {
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

.item-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.list-demo-action-layout .arco-list-item {
  border-radius: 4px;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
