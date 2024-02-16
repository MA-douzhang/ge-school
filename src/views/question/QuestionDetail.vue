<template>
  <div id="questionDetail">
    <div
      v-bind:style="{
        overflow: 'scroll',
        overflowX: 'hidden',
      }"
    >
      <template v-if="questionAnswer && !loading">
        <div style="margin: 16px 20px">
          <div style="display: flex">
            <a-avatar
              size="large"
              image-url="https://ts4.cn.mm.bing.net/th?id=ODLS.29da3c9d-3cf7-4e1a-8c90-5d104df2bb24&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2"
            />
            <div style="margin-left: 4px; flex: 1 1 auto">
              <div style="font-weight: 600">{{ currentUser?.username }}</div>
              <div style="font-size: 11px; color: #3c3c4399">
                {{ questionAnswer?.create_time.$date }}
              </div>
            </div>
          </div>
          <MdViewer :value="questionAnswer?.content || ''" />
          <div style="margin: 16px 20px">
            <a-skeleton paragraph="rows: 10" />
          </div>
        </div>
      </template>
    </div>
    <a-divider />
    <div style="margin-left: 30px; margin-right: 30px">
      <div style="display: flex; align-items: center">
        <icon-tag :size="15" style="margin-right: 5px; transform: scaleX(-1)" />
        <span>评论区</span>
      </div>
      <div>
        <div>
          <a-textarea
            style="
              background-color: #ffffff;
              height: 184px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto 15px;
              box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            "
            v-model:model-value="commentText"
            placeholder="请输入评论..."
          ></a-textarea>
          <div style="text-align: right">
            <a-button
              type="primary"
              status="success"
              @click="addComment(questionId)"
            >
              <icon-pen-fill />
              评论
            </a-button>
          </div>
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
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
                border-radius: 10px;
              "
            >
              <a-list-item class="list-demo-item" action-layout="vertical">
                <template #extra>
                  <div class="image-area" v-if="item.create_time">
                    发布时间
                    {{ item?.create_time.$date }}
                  </div>
                </template>
                <a-list-item-meta>
                  <template #title>
                    <h3 class="item-title" style="margin-top: -5px">
                      {{ item.create_user_name }}
                    </h3>
                  </template>
                  <template #description>
                    <p class="item-description">
                      {{ item.content }}
                    </p>
                  </template>
                  <template #avatar>
                    <a-avatar
                      shape="square"
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
                </a-list-item-meta>
              </a-list-item>
            </div>
          </template>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, withDefaults, defineProps, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import MdViewer from "@/components/MdViewer.vue";
import message from "@arco-design/web-vue/es/message";
import { QuestionCommentControllerService } from "../../../generated/services/QuestionCommentControllerService";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { useRoute } from "vue-router";

const commentText = ref<string>("");
const store = useStore();
const currentUser = store.state.user.loginUser;
const questionAnswer = ref<any>();
const loading = ref<boolean>(true);
// eslint-disable-next-line no-undef,vue/valid-define-emits
const emit = defineEmits();
const route = useRoute();
const questionId: any = route.query.id;
const dataList = ref<any>([]);

const total = ref();

const searchParams = ref<any>({
  pageSize: 10, // 设置pageSize的初始值
  current: 1,
});
const loadData = async () => {
  const res = await QuestionCommentControllerService.listUsingGet(
    questionId,
    searchParams.value.current,
    searchParams.value.pageSize
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败：" + res.message);
  }
};

watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
  } as never;
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  getQuestionSubmit();
  loadData();
});
const getQuestionSubmit = () => {
  if (questionId) {
    QuestionControllerService.getQuestionByIdGet(questionId).then((res) => {
      if (res.code === 0) {
        loading.value = false;
        questionAnswer.value = res.data;
        console.log("初始化成功", questionAnswer);
      }
    });
  }
};

const closeDetail = () => {
  console.log("关闭");
  emit("isClickIdWatch", false);
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
 * 发布评论
 */
const addComment = async (questionId: number) => {
  const res = await QuestionCommentControllerService.saveQuestionCommentPost(
    commentText.value,
    questionId
  );
  if (res.code === 0) {
    message.success("评论成功");
    loadData();
    commentText.value = "";
  } else {
    message.error("加载失败：" + res.message);
  }
};

// 点爱心
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}

.closeCss {
  color: rgb(140, 140, 140);
  cursor: pointer;

  :hover {
    color: black;
  }
}
</style>
