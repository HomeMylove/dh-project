<template>
  <div>
    <div class="show-article" v-show="true">
      <h1>{{ article["title"] }}</h1>
      <el-button @click="copyUrl" class="share-btn" icon="el-icon-share">
        分享
        <!-- <i class="iconfont icon-fuzhi"></i> -->
      </el-button>
      <h2>
        <router-link
          :to="`/details/?authorId=${article['authorId']}`"
          :style="{ 'text-decoration': 'none' }"
        >
          {{ article["authorName"] }}
        </router-link>
      </h2>
      <pre>{{ article["text"] }}</pre>
    </div>

    <Comments />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Comments from "@/pages/Comments";

export default {
  name: "Read",
  components: {
    Comments,
  },
  methods: {
    copyUrl() {
      var oInput = document.createElement("input"); //创建隐形input
      oInput.value = window.location.href; // window.location.href 浏览器URL
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.remove();
      this.$message({
        type:'success',
        message:'复制到粘贴板'
      })
    },
  },

  mounted() {
    this.$store.dispatch("read/getArticle", this.$route.query.articleId);
  },
  computed: {
    ...mapState("read", ["article"]),
  },
};
</script>

<style lang='less' scoped>
.show-article {
  position: relative;
  .share-btn {
    position: absolute;
    right: 0;
  }
  h1,
  h2 {
    width: 100%;
    text-align: center;
  }
  h2 {
    margin-top: 40px;
    margin-bottom: -20px;
  }
  pre {
    white-space: pre-wrap;
    font-size: 20px;
    line-height: 30px;
  }
}
</style>