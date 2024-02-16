<template>
  <a-layout>
    <a-layout-sider>
      <MenuComponent
        :selected-keys="selectedKeys"
        :visible-routes="visibleRoutes"
      ></MenuComponent>
    </a-layout-sider>
    <a-layout-content>
      <div class="about">
        <h1>{{ route.name }}</h1>
        <a-divider></a-divider>
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
                  <div className="image-area">
                    发布时间：
                    {{ item.create_time.$date }}
                  </div>
                </template>
                <a-list-item-meta>
                  <template #title>
                    <h3 class="item-title" style="margin-top: -5px">
                      {{ item.title }}
                    </h3>
                  </template>
                  <template #description>
                    <p
                      @click="doPost(item._id)"
                      style="cursor: pointer"
                      class="item-description"
                    >
                      {{ item.content }}
                    </p>
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
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
//展示菜单的路由
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuComponent from "@/components/MenuComponent.vue";
import { Message } from "@arco-design/web-vue";
import { PostControllerService } from "../../../generated/services/PostControllerService";
const route = useRoute();
const router = useRouter();
const visibleRoutes = computed(() => {
  return route.matched[0].children;
});
const selectedKeys = ref(["/faculty/staff"]);
const searchParams = ref({
  searchText: "",
  title: "",
  tags: [],
  partitionId: 7,
  pageSize: 10, // 设置pageSize的初始值
  current: 1,
  sortField: "thumbNum",
  sortOrder: "descend",
});

const dataList = ref<[]>([]);
const total = ref();
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
const getDataList = async () => {
  const res = await PostControllerService.listUsingGet(
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
/**
 * 初始化
 */
onMounted(() => {
  getDataList();
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const doPost = (id: any) => {
  router.push({
    path: "/post/detail",
    query: {
      id: id.$oid,
    },
  });
};
</script>

<style scoped>
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
.about {
  margin: 30px;
  width: 75%;
}
</style>
