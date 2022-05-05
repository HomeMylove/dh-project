<template>
  <div class="row">
    <h4>Welcome to Digital Humainty Project</h4>
    <button class="btn btn-info" @click="$router.push({ path: '/search' })">
      <span style="color: white">点击</span> &nbsp;搜索
    </button>

    <el-container>
      <el-header>最新</el-header>
      <el-main class="new-book clearfix">
        <el-table
          :show-header="false"
          :data="newArticle"
          style="width: 100%"
          stripe
        >
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            width="100px"
          >
          </el-table-column>
          <el-table-column width="140px">
            <template slot-scope="{ row }">
              <router-link
                :to="`/details/?authorId=${row.authorId}`"
                :style="{ 'text-decoration': 'none' }"
                >{{ row.authorName }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column width="width">
            <template slot-scope="{ row }">
              <router-link
                :to="`/read/?articleId=${row.articleId}`"
                :style="{ 'text-decoration': 'none' }"
                >{{ row.title }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="time" width="180"> </el-table-column>
        </el-table>
      </el-main>

      <el-header>推荐</el-header>
      <el-main class="subrow clearfix">
        <div class="column" v-for="r in recommend" :key="r.title">
          <h4 class="title">{{ r.title }}</h4>
          <router-link :to="`/read/?articleId=${r.articleId}`">
            <img :src="r.imgUrl" alt="" />
          </router-link>
        </div>
      </el-main>
    </el-container>

    <!-- 展示区 -->
    <!-- <div class="subrow clearfix"> -->

    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("home/getRecommend");
    this.$store.dispatch("home/getNewArticle");
  },
  computed: {
    ...mapState("home", ["recommend", "newArticle"]),
  },
};
</script>

<style scoped lang="less">
.row {
  margin-top: -80px;
  h4 {
    display: block;
    text-align: center;
    font-size: 1.5rem;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .btn {
    width: 100%;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
  }

  .btn-info {
    margin-top: -25px;
    color: #000;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
    transition: all 0.5s;
  }

  .btn-info:hover {
    background-color: #31d2f2;
  }

  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    margin-bottom: 40px;
  }

  .new-book {
    // background-color: #f00;
    // text-align: center;
  }

  .subrow {
    // width: 900px;
    box-sizing: border-box;
    margin-top: -10px;
    padding: 20px 15px;
    // padding-top: 20px;
    // padding-bottom: 20px;
    // background-color: red;
    width: 100%;
    max-width: 100%;

    .column {
      margin-bottom: 20px;
      box-sizing: border-box;
      float: left;
      width: 310px;
      padding: 5px;
      text-align: center;
      // background-color: green;
      // border: 1px solid black;

      .title {
        height: 100px;
        font-size: 28px -apple-system;
        margin: 0px 0px 8px;
      }

      a {
        img {
          width: 250px;
          height: 370px;
          transition: 0.5s;
        }

        img:hover {
          transform: translateX(5px) translateY(-5px);
          box-shadow: 0 10px 9px rgba(0, 0, 0, 0.35);
        }
      }
    }
  }
}
</style>