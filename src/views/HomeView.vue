<template>
  <div class="home">
    <!--    图片滚屏-->
    <BannerComponent />
    <!-- 主体部分一 -->

    <div class="mainOne">
      <div class="wrap">学院简介</div>
      <a-divider />
      <div class="text">
        智能科技学院致力于培养未来的计算机人才，提供全面的学术教育和专业技能培训。该学院拥有一支资深的教师团队，他们在计算机科学和相关领域具有丰富的教学和研究经验。学院的课程设置涵盖了计算机科学的各个领域，包括编程、算法、人工智能、数据科学等，旨在培养学生在科技领域的创新能力和解决问题的能力。通过实践项目和实习机会，学生将能够应用所学知识，积累丰富的实践经验。智能科技学院致力于为学生提供优质的教育资源和学习环境，助力他们成为业界和学术界的领军人才。
      </div>
    </div>
    <div class="mainOne">
      <div class="wrap">视频介绍</div>
      <a-divider />
      <div class="text">
        <VideoComponent />
      </div>
    </div>
    <a-row :gutter="20" :style="{ marginBottom: '10px' }">
      <a-col :span="6">
        <a-card
          title="计算机科学与技术"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <a
            href="https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%E4%B8%8E%E6%8A%80%E6%9C%AF/663582"
          >
            <img src="../assets/yxtx/qcc3_i1.png" />
          </a>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="虚拟现实技术"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <a
            href="https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E7%8E%B0%E5%AE%9E/207123"
          >
            <img src="../assets/yxtx/qcc3_i2.png" alt="" />
          </a>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="数据科学与大数据技术网"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <a
            href="https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E7%A7%91%E5%AD%A6%E4%B8%8E%E5%A4%A7%E6%95%B0%E6%8D%AE%E6%8A%80%E6%9C%AF/24582820"
          >
            <img src="../assets/yxtx/qcc3_i3.png" alt="" />
          </a>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card
          title="网络工程"
          :bordered="false"
          :style="{ width: '100%', textAlign: 'center' }"
        >
          <a
            href="https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%B7%A5%E7%A8%8B/3558682"
          >
            <img src="../assets/yxtx/qcc3_i5.png" alt="" />
          </a>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import BannerComponent from "@/components/BannerComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue"; // @ is an alias to /src
</script>
<style lang="less" scoped>
.mainOne {
  width: 100%;
  background: url("../assets/yxtx/main_bg.jpg") no-repeat center;
  background-size: cover;
  margin-top: 60px;
  .wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
    font-size: large;
  }
  .text {
    margin: 5px 40px;
    font-size: 20px;
  }
}
</style>
