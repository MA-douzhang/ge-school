<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 32px">账户密码注册</h2>
    <a-form
      :model="form"
      size="large"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 320px; margin: 0 auto"
    >
      <a-form-item
        field="username"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 4, message: '账号长度不能少于4位' },
          { maxLength: 16, message: '账号长度不能超过16位' },
        ]"
      >
        <a-input v-model="form.username" placeholder="账号 (4~16位)" />
      </a-form-item>
      <a-form-item
        field="password"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 6, message: '密码长度不能少于6位' },
          { maxLength: 16, message: '密码长度不能超过16位' },
        ]"
      >
        <a-input-password v-model="form.password" placeholder="密码 (6~16位)" />
      </a-form-item>
      <a-form-item
        field="jobNumber"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 6, message: '学号长度不能少于6位' },
          { maxLength: 16, message: '学号长度不能超过16位' },
        ]"
      >
        <a-input v-model="form.jobNumber" placeholder="学号 (6~16位)" />
      </a-form-item>
      <a-form-item field="email" :validate-trigger="['change', 'input']">
        <a-input v-model="form.email" placeholder="邮箱" />
      </a-form-item>
      <div>
        <a
          style="
            float: right;
            margin-bottom: 16px;
            cursor: pointer;
            color: #1677ff;
          "
          @click="toLogin"
          >已有账号，去登陆!</a
        >
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 320px"
          >注 册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import {
  AdminUserControllerService,
  UserControllerService,
} from "../../../generated";
const form = reactive({
  username: "",
  password: "",
  jobNumber: "",
  email: "",
} as any);

const router = useRouter();

// 去登录页面
const toLogin = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};

/**
 * 提交表单
 *
 */
const handleSubmit = async (values: any, errors: any) => {
  if (values.errors) {
    return;
  }
  if (form.userAccount == "") {
    Message.error("请输入账号！");
    return;
  }
  if (form.userPassword == "") {
    Message.error("请输入密码！");
    return;
  }
  const res = await AdminUserControllerService.registerPostPost(form);
  if (res.code === 0) {
    // 注册成功，跳转到登录页
    router.push({
      path: "/user/login",
      replace: true,
    });
    Message.success("注册成功，请登录！");
  } else {
    Message.error("注册失败，" + res.message);
  }
};
</script>
