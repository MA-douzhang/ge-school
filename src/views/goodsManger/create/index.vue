<template>
  <div id="create">
    <a-card>
      <a-form  :rules="rules" :model="form.goods">
        <a-form-item field="goodsSn" label="商品编号">
          <a-input :style="{width:'320px'}" v-model="form.goods.goodsSn" placeholder="请输入商品编号" />
        </a-form-item>
        <a-form-item field="name" label="商品名称">
          <a-input :style="{width:'320px'}" v-model="form.goods.name" placeholder="请输入商品名称" />
        </a-form-item>
        <a-form-item field="counterPrice" label="市场售价">
          <a-input :style="{width:'320px'}" v-model="form.goods.counterPrice" type="number" placeholder="0.00">
            <template #append>元</template>
          </a-input>
        </a-form-item>
        <a-form-item field="isNew" label="是否新品">
          <a-radio-group v-model="form.goods.isNew">
            <a-radio value="true">新品</a-radio>
            <a-radio value="false">非新品</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="isHot" label="是否热门">
          <a-radio-group v-model="form.goods.isHot">
            <a-radio value="false">普通</a-radio>
            <a-radio value="true">热门</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="isOnSale" label="是否在售">
          <a-radio-group v-model="form.goods.isOnSale">
            <a-radio value="true">在售</a-radio>
            <a-radio value="false">未售</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="商品图片">
          <a-upload
            :action="uploadPath"
            :headers="headers"
            :show-file-list="false"
            :onSuccess="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <template #upload-button>
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="form.goods && form.goods.picUrl"
              >
                <a-image :src="form.goods.picUrl" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
              </div>
              <div class="arco-upload-picture-card" v-else>
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">Upload</div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-form-item>
        <a-form-item label="宣传画廊">
          <a-upload
            :default-file-list="form.goods.gallery"
            :action="uploadPath"
            :limit=5
            :headers="headers"
            :onSuccess="handleGalleryUrl"
            :on-before-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
          >
            <IconPlus />
          </a-upload>
        </a-form-item>
        <a-form-item label="商品单位">
          <a-input :style="{width:'320px'}" v-model="form.goods.unit" placeholder="件/个/盒" />
        </a-form-item>
        <a-form-item label="所属分类">
          <a-cascader :style="{width:'320px'}" :options="categoryList" expand-trigger="hover" clearable
                      @change="handleCategoryChange" />
        </a-form-item>
        <a-form-item label="商品介绍">
          <a-input :style="{width:'320px'}" v-model="form.goods.brief" />
        </a-form-item>
      </a-form>
    </a-card>
    <a-card class="box-card">
      <h3>商品规格</h3>
      <a-table :data="specifications">
        <template #columns>
          <a-table-column data-index="specification" title="规格名" />
          <a-table-column data-index="value" title="规格值">
            <template #cell="{record}">
              <a-tag color="blue">
                {{ record.value }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column data-index="picUrl" title="规格图片">
            <template #cell="{record}">
              <img v-if="record.picUrl" :src="record.picUrl" width="40">
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-card class="box-card">
      <h3>商品库存</h3>
      <a-table :data="products">
        <template #columns>
          <a-table-column data-index="specifications" title="规格值">
            <template #cell="{record}">
              <a-tag v-for="tag in record.specifications" :key="tag" color="blue">
                {{ tag }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column data-index="price" title="货品售价" />
          <a-table-column data-index="number" title="货品数量" />
          <a-table-column data-index="url" title="货品图片">
            <template #cell="{record}">
              <img v-if="record.url" :src="record.url" width="40">
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{record}">
              <a-button size="mini" @click="handleProductShow(record)">操作</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-modal v-model:visible="productVisiable" title="货品设置" @cancel="handleCancel" @ok="handleBeforeOk">
        <a-form :model="products">
          <a-form-item field="price" label="货品售价">
            <a-input v-model:model-value="products[0].price" />
          </a-form-item>
          <a-form-item field="number" label="货品数量">
            <a-input v-model:model-value="products[0].number" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
    <a-card class="box-card">
      <h3>商品参数</h3>
      <a-button type="primary" @click="attributesVisiable=true">添加</a-button>
      <a-table :data="attributes">
        <template #columns>
          <a-table-column data-index="attribute" title="参数名称" />
          <a-table-column data-index="value" title="参数值" />
          <a-table-column title="操作">
            <template #cell="{record}">
              <a-button status="danger" size="mini" @click="handleAttributeDelete(record)">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-modal v-model:visible="attributesVisiable" title="商品参数" @cancel="attributesVisiable=false"
               @ok="handleAttributesOk">
        <a-form :model="attributeForm">
          <a-form-item field="attribute" label="参数名称">
            <a-input v-model:model-value="attributeForm.attribute" />
          </a-form-item>
          <a-form-item field="value" label="参数值">
            <a-input v-model:model-value="attributeForm.value" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>

    <div class="op-container">
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  AdminGoodsControllerService,
  CatVO,
  GemallGoodsAddRequest, GemallGoodsAttribute, GemallGoodsProduct, GemallGoodsSpecification
} from "../../../../generated";
import { getToken } from "@/utils/auth";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const uploadPath = ref<string>("http://localhost:9090/api/storage/upload");
const headers = ref<any>({
  "X-Gemall-Token": getToken()
});
const router = useRouter();
const productVisiable = ref<boolean>(false);
const categoryList = ref<CatVO[]>();
const attributesVisiable = ref<boolean>(false);
const attributeForm = ref({ attribute: "", value: "" });
const form = ref<GemallGoodsAddRequest>({
  goods: {
    picUrl: "",
    gallery: [],
    isHot: false,
    isNew: true,
    isOnSale: true
  }
});
/**
 * 规格
 */
const specifications = ref<GemallGoodsSpecification[]>(
  [{
    specification: "规格", value: "标准", picUrl: ""
  }]);
/**
 * 商品
 */
const products = ref<GemallGoodsProduct[]>(
  [{ id: 0, specifications: ["标准"], price: 0.00, number: 0, url: "" }]
);
/**
 *规格
 */
const attributes = ref<GemallGoodsAttribute[]>([]);
const rules = {
  goodsSn: [{ required: true, message: "商品编号不能为空" }],
  name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }]
};
const submit = async () => {
  form.value={
    ...form.value,
    specifications:specifications.value,
    attributes:attributes.value,
    products:products.value,
  }
  console.log(form.value);
  const res = await AdminGoodsControllerService.createGoodsUsingPost(form.value)
  if (res.code === 0) {
    router.push("goodList")
  } else {
    Message.error(`添加失败，${res.message}`);
  }
};
/**
 * 上传商品图片
 */
const uploadPicUrl = (response: any) => {
  const res = JSON.parse(JSON.stringify(response.response));
  // console.log(res);
  if (res.errno === 0) {
    Message.success("上传成功");
    form.value.goods = {
      ...form.value.goods,
      picUrl: res.data.url
    };
  }else {
    Message.error("添加失败")
  }


};
/**
 * 上传图片
 */
const handleGalleryUrl = (response: any, file: any, fileList: any) => {
  const res = JSON.parse(JSON.stringify(response.response));
  const imgUrl =res.data.url;
  if (res.errno === 0) {
    form.value.goods?.gallery?.push(imgUrl);
    console.log(form.value.goods?.gallery)
  }else {
    Message.error("添加失败")
  }
};
const handleRemove = (file: any) => {
  console.log("删除");
  const n: any = form.value.goods?.gallery?.length;
  let i: number;
  for (i = 0; i < n; i += 1) {
    // 这里存在两种情况
    // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
    //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
    // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
    let url;
    if (file.response === undefined) {
      url = file.url;
    } else {
      url = file.response.data.url;
    }
    const urls: any = JSON.parse(JSON.stringify(form.value.goods?.gallery));
    console.log(urls)
    if (urls[i] === url) {
      form.value?.goods?.gallery?.splice(i, 1);
    }
  }
  console.log(form.value);

};
const getCategoryList = async () => {
  const res = await AdminGoodsControllerService.getCatListUsingGet();
  if (res.code === 0) {
    categoryList.value = res.data;
  } else {
    Message.error(`获取失败，${res.message}`);
  }
};
const handleCategoryChange = (value: number) => {
  form.value.goods = {
    ...form.value.goods,
    categoryId: value
  };
};
/**
 * 货品设置
 */
const handleProductShow = () => {
  productVisiable.value = true;
};
const handleBeforeOk = () => {
  products.value[0] = {
    ...products.value[0]
  };
  console.log(products.value);
};
const handleCancel = () => {
  productVisiable.value = false;
};
/**
 * 删除
 */
const handleAttributeDelete = (record: any) => {
  const index: any = attributes.value?.indexOf(record);
  attributes.value?.splice(index, 1);
};
/**
 * 参数添加
 */
const handleAttributesOk = () => {
  attributes.value?.unshift(attributeForm.value);
  attributesVisiable.value = false;
  console.log(attributes.value);
};
/**
 * 初始化
 */
onMounted(() => {
  getCategoryList();
});
</script>

<style scoped>
.op-container {
  display: flex;
  justify-content: left;
  margin: 10px;
}
</style>
