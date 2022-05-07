<template>
  <div class="container-search">
    <form action="#">
      <h4>{{ $t("message.searchHip") }}</h4>

      <!-- 输入框 -->
      <div class="input-search clearfix">
        <el-select
          v-model="choice"
          placeholder="请选择"
          style="width: 100px"
          class="choose-mode"
          @change="keyword = ''"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="form-control">
          <input
            @keyup.enter="getInfo"
            type="text"
            placeholder="search for..."
            v-model="keyword"
          />
        </div>
        <button @click.prevent="getInfo">{{ $t("message.search") }}</button>
      </div>

      <!-- 展示 -->
      <div class="show">
        <h2>{{ info.length }} {{ $t("message.searchResults") }}</h2>

        <!-- 结果列表 作者 -->
        <div v-show="ifShowAuthor">
          <el-table :data="info" border style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              :label="$t('message.number')"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="prop"
              :label="$t('message.authorName')"
              width="180"
            >
              <template slot-scope="{ row }">
                <router-link
                  :to="`/details/?authorId=${row.authorId}`"
                  :style="{ 'text-decoration': 'none' }"
                  >{{ row.authorName }}</router-link
                >
              </template>
            </el-table-column>
            <el-table-column prop="about" :label="$t('message.introduction')">
            </el-table-column>
          </el-table>
        </div>

        <div v-show="ifShowBook">
          <el-table :data="info" border style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              :label="$t('message.number')"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="authorName"
              :label="$t('message.authorName')"
              width="180"
            >
              <template slot-scope="{ row }">
                <router-link
                  :to="`/details/?authorId=${row.authorId}`"
                  :style="{ 'text-decoration': 'none' }"
                  >{{ row.authorName }}</router-link
                >
              </template>
            </el-table-column>
            <el-table-column prop="title" :label="$t('message.title')">
              <template slot-scope="{ row }">
                <router-link
                  :to="`/read/?articleId=${row.articleId}`"
                  :style="{ 'text-decoration': 'none' }"
                  >{{ row.title }}</router-link
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      options: [
        {
          value: "author",
          label: "作者",
        },
        {
          value: "book",
          label: "书名",
        },
      ],
      choice: "author",
      keyword: "",
      data: [],
    };
  },
  methods: {
    getInfo() {
      if (this.keyword == "") {
        return this.$message({
          message: "输入不能为空",
          type: "warning",
        });
      }
      this.$store.dispatch("search/getInfo", {
        choice: this.choice,
        keyword: this.keyword,
      });
    },
  },
  computed: {
    ...mapState("search", ["info"]),
    ifShowAuthor() {
      return this.choice == "author" && this.info.length > 0;
    },
    ifShowBook() {
      return this.choice == "book" && this.info.length > 0;
    },
  },
};
</script>


<style lang="less" scoped>
.container-search {
  margin-top: -80px;
  form {
    h4 {
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-weight: 500;
      line-height: 1.2;
      display: block;
      margin-block-start: 1.33em;
      margin-block-end: 1.33em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    .input-search {
      margin-top: -10px;
      width: 100%;
      // background-color: #f00;
      height: 40px;
      .choose-mode {
        float: left;
      }

      input {
        outline-color: #c2dbfe;
        width: 760px;
        border-radius: 4px;
        border: 2px solid #ced4da;
        padding-left: 20px;
        box-sizing: border-box;
        float: left;
        font-size: 20px;
        line-height: 36px;
        height: 40px;
      }

      button {
        width: 100px;
        cursor: pointer;
        font-size: 18px;
        border-color: #0d6efd;
        color: white;
        background-color: #0d6efd;
        border-radius: 8px;
        box-sizing: border-box;
        float: right;
        height: 40px;
      }

      button:hover {
        background-color: #0b5ed7;
      }
    }

    .show {
      width: 900px;
      margin: 0 30px;

      h2 {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>