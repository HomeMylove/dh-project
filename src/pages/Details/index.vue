<template>
  <div class="row">
    <h1>{{ authorInfo.authorName }}</h1>

    <div class="introduction">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">作者简介</div></el-col
        >
      </el-row>

      <div class="show">
        {{ authorInfo.about }}
      </div>
    </div>

    <div class="articles">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">主要作品</div></el-col
        >
      </el-row>

      <template>
        <el-table :data="articles" stripe :style="{width: '60%','margin-left':'20%'}">
          <el-table-column type="index" align="center" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="" align="center" label="作品名称" width="width">
            <template slot-scope="{row}">
             <router-link :to="`/read/?articleId=${row.articleId}`" :style="{'text-decoration':'none'}"> {{row.title}}</router-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Deatil",

  mounted() {
    this.$store.dispatch("details/getAuthorInfo", this.$route.query.authorId);
  },

  computed: {
    ...mapState("details", ["authorInfo"]),
    ...mapGetters("details", ["articles"]),
  },
};
</script>

<style lang="less" scoped>
.row {
  margin-top: -80px;
  //   background-color: #f00;
  h1 {
    display: block;
    text-align: center;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .grid-content {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    color: white;
    text-align: center;
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .introduction {
    .show {
      margin-top: 30px;
      margin-left: 20%;
      min-height: 100px;
      width: 60%;
      //   background-color: #0f0;
      color: black;
    }
  }

  .articles {
    margin-top: 30px;
    .show {
      margin-top: 30px;
      margin-left: 20%;
      width: 60%;
      //   background-color: #0f0;
      color: red;
    }
  }
}
</style>