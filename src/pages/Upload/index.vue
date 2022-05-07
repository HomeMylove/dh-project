<template>
  <div class="upload-container">
    <div class="upload-choice">
      <el-button
        :type="uploadMode == 0 ? 'primary' : ''"
        @click="changeMode(0)"
        round
        >{{$t('message.uploadAuthor')}}</el-button
      >
      <el-button
        :type="uploadMode == 1 ? 'primary' : ''"
        @click="changeMode(1)"
        round
        >{{$t('message.uploadWork')}}</el-button
      >
    </div>

    <div class="upload-author" v-show="uploadMode == 0">
      <el-form ref="form" :model="formAuthor" label-width="120px">
        <el-form-item :label="$t('message.authorName')">
          <el-input
            type="text"
            v-model="formAuthor.name"
            @input="checkAuthorName"
            class="author-input"
            :class="{ warning: nameExist }"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.introduction')">
          <el-input
            type="textarea"
            v-model="formAuthor.description"
            rows="6"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="uploadAuthor">{{$t('message.submit')}}</el-button>
          <el-button @click="resetAuthorForm">{{$t('message.reset')}}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="upload-article" v-show="uploadMode == 1">
      <el-form ref="form" :model="formArticle" label-width="120px">
        <el-form-item :label="$t('message.authorName')">
          <el-input
            type="text"
            v-model="formArticle.name"
            @input="getAuthorId"
            class="author-input"
            :class="{ warning: authorId == -1 }"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.title')">
          <el-input v-model="formArticle.title"> </el-input>
        </el-form-item>

        <el-form-item :label="$t('message.mainText')">
          <el-input
            type="textarea"
            v-model="formArticle.text"
            rows="6"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="uploadArticle">{{$t('message.submit')}}</el-button>
          <el-button @click="resetArticleForm">{{$t('message.reset')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      formAuthor: {
        name: "",
        description: "",
      },
      formArticle: {
        name: "",
        title: "",
        text: "",
      },
      uploadMode: 0,
      nameExist: false,
      authorId: -1,
    };
  },
  methods: {
    async uploadAuthor() {
      let { name, description } = this.formAuthor;
      name = name.trim();
      description = description.trim();
      if (!(name && description)) {
        return this.$message({
          message:this.$t('message.warningNull'),
          type: "warning",
        });
      } else if (this.nameExist) {
        return this.$message({
          message: this.$t('message.authorExists'),
          type: "warning",
        });
      }

      try {
        await this.$store.dispatch("upload/uploadAuthor", {
          name,
          description,
        });
        this.$message({
          message: this.$t('message.uploadSucceed'),
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: $t('message.uploadFailed'),
          type: "warning",
        });
      } finally {
        this.resetAuthorForm();
      }
    },
    resetAuthorForm() {
      this.formAuthor = {
        name: "",
        description: "",
      };
    },
    async checkAuthorName() {
      const { name } = this.formAuthor;

      try {
        const result = await this.$store.dispatch(
          "upload/checkAuthrName",
          name.trim()
        );
        // true 表示存在
        this.nameExist = result;

        if (result) {
          this.$message({
            message: this.$t('message.authorNotExists'),
            type: "warning",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    changeMode(num) {
    this.resetAuthorForm()
    this.resetArticleForm()
    this.uploadMode = num;
    },
    async getAuthorId() {
      // 获取作者id
      const { name } = this.formArticle;

      try {
        const result = await this.$store.dispatch(
          "upload/getAuthorId",
          name.trim()
        );

        this.authorId = result;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadArticle() {
      let { title, text } = this.formArticle;

      title = title.trim();
      text = text.trim();

      if (!(title && text)) {
        return this.$message({
          message: this.$t('message.warningNull'),
          type: "warning",
        });
      } else if (this.authorId == -1) {
        return this.$message({
          message: this.$t('message.authorNotExists'),
          type: "warning",
        });
      }

      try {
         await this.$store.dispatch("upload/uploadArticle", {
          title,
          text,
          author_id: this.authorId,
        });
        this.$message({
          message: this.$t('message.uploadSucceed'),
          type: "success",
        });
      } catch (error) {
          this.$message({
              message:this.$t('message.uploadFailed'),
              type:'warning'
          })
      }finally{
          this.resetArticleForm()
      }
    },

    resetArticleForm() {
        this.formArticle ={
        name: "",
        title: "",
        text: "",
      }
    },
  },
};
</script>

<style lang="less" scoped>
.upload-container {
  height: 1000px;
  //   background-color: gray;
  padding: 30px 200px;

  .upload-choice {
    text-align: center;
    margin-bottom: 40px;
  }

  .upload-author {
    .author-input {
      border: 1px transparent solid;
      border-radius: 3px;
    }

    .warning {
      border: 1px red solid;
      border-radius: 3px;
    }
  }
  .upload-article {
    .author-input {
      border: 1px transparent solid;
      border-radius: 3px;
    }

    .warning {
      border: 1px red solid;
      border-radius: 3px;
    }
  }
}
</style>