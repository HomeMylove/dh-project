<template>
  <div class="external-container">
    <h1 class="link-title">本项目已上传</h1>
    <ul class="links">
      <li>
        <a href="https://github.com/HomeMylove/CHINO">Github <i class="el-icon-link"></i></a>
      </li>
      <li>
        <a href="javascript:;">Gitee <i class="el-icon-link"></i></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "External",
};
</script>

<style lang="less" scoped>
.external-container {
  text-align: center;
  position: relative;
  .links{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      li{
          list-style: none;
          a{    
              display: block;
            //   background-color: #f00;
              height: 60px;
              width: 200px;
              font-size: 30px;
              line-height: 60px;
              text-decoration: none;
              color:black;
          }

          a:hover{
              color:#0d6efd;
          }
      }
  }
}
</style>