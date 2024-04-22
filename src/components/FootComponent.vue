<template>
  <div id="footer" class="footer">
    <div class="footone">
      <ul class="fl">
        <li>
          <a href="https://cd.guc.edu.cn/">鸡哥学院</a>
          <a href="https://jw.guc.edu.cn/yethan/UserAction?setAction=userLogin"
            >教学教务系统</a
          >
          <a href="http://tusdt.xuetangx.com/about">慕课平台</a>
        </li>
        <li>
          <a href="http://www.cnipa.gov.cn/">国家知识产权局</a>
          <a href="https://isisn.nsfc.gov.cn/egrantweb/"
            >国家自认科学基金委员会</a
          >
          <a href="https://www.sc.gov.cn/"> 四川省人民政府 </a>
        </li>
        <li>
          <a href="http://www.moe.gov.cn/">中华人民共和国教育部 </a>
          <a href="http://program.most.gov.cn/">国家科技计划项目申报中心</a>
          <a href="https://edu.sc.gov.cn/"> 四川省教育厅 </a>
        </li>
      </ul>
      <div class="ftonr_r fl">
        <h2>联系我们</h2>
        <p>微信：dingdoingmie</p>
        <p>电话：2024-44-4027</p>
      </div>
      <div class="ftonr_r fl">
        <img src="../assets/yxtx/foot_logo.png" alt="" />
      </div>
    </div>
    <div class="footbottom">
      <div class="foot">
        <p>吉世界 版权所有</p>
      </div>
    </div>
  </div>
</template>

<script></script>
<style lang="less" scoped>
.footer {
  clear: both;
  width: 100%;
  background: #74b4eb;
  margin-top: 40px;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  .fl {
    float: left;
  }
  .footone {
    width: 1190px;
    padding: 0 5px;
    margin: 0 auto;
    height: 158px;
    ul li {
      float: left;
      margin-top: 36px;
      margin-right: 20px;
      padding-left: 20px;
      border-left: 1px solid #fff;
      height: 105px;
      a {
        display: block;
        color: #fff;
        font-size: 14px;
        line-height: 26px;
        padding-bottom: 12px;
      }
      a:hover {
        color: #ffcf46;
      }
    }
    .ftonr_r {
      font-size: 14px;
      color: #fff;
      margin-left: 19px;
      padding-bottom: 10px;
      h2 {
        font-size: 24px;
        font-weight: normal;
        padding-top: 20px;
        margin: 0px;
      }
      p {
        margin: 10px 0px;
      }
      img {
        width: 120px;
        height: 120px;
        margin-top: 25px;
      }
    }
  }
  .footbottom {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #282a2e;
    color: #ababac;
    font-size: 14px;
    .foot {
      width: 1190px;
      margin: 0 auto;
      height: auto;
      overflow: hidden;
    }
  }
}
</style>
