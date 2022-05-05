<template>
  <div class="comment-container">
    <div class="comment-header">
      <h1>{{comments.length}}条评论</h1>
      <h2 class="clearfix">
        <ul>
          <li @click="changeOrder('desc')" :class="{active:order=='desc'}">时间降序</li>
          <li>|</li>
          <li @click="changeOrder('asc')" :class="{active:order=='asc'}">时间升序</li>
        </ul>
      </h2>
    </div>

    <!-- 提交评论 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :inline="true"
      class="comment-send"
    >
      <el-form-item>
        <el-input
          type="textarea"
          rows="3"
          v-model="form.comment"
          placeholder="说点儿什么"
          class="comment-input"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="comment-submit" @click="openDialog"
          >发表<br />评论</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 提交选项 -->
    <el-dialog
      title="请选择一个头像"
      :visible.sync="formVisible"
      class="choose-gender"
    >
      <el-form>
        <ul>
          <li>
            <a>
              <i
                class="iconfont icon-user-man-full"
                @click="form.gender = 'man'"
                :class="{ 'chosed-man': form.gender == 'man' }"
              ></i>
            </a>
          </li>
          <li>
            <a>
              <i
                class="iconfont icon-user-women-full"
                @click="form.gender = 'women'"
                :class="{'chosed-women': form.gender == 'women' }"
              ></i>
            </a>
          </li>
        </ul>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendComment">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示评论 -->
    <el-table 
    :data="comments" 
    class="comment-show" 
    >
      <el-table-column prop="" label="" width="width">
        <template slot-scope="{ row }">
          <div class="comment-wrapper">
            <span class="avater" v-show="row.gender=='man'">
              <i class="iconfont icon-user-man-full"></i>
            </span>
            <span class="avater" v-show="row.gender=='women'">
              <i class="iconfont icon-user-women-full"></i>
            </span>
            <div class="comment-main">
              <div class="user-name">游客{{row.id}}</div>
              <p class="text">
                {{ row.comment }}
              </p>

              <span class="comt-time">{{row.time}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: "Comments",
  data() {
    return {
      form: {
        comment: "",
        gender: "man",
      },
      formVisible: false,
      order:'desc'
    };
  },
  methods: {
    openDialog() {
      const { comment } = this.form;
      if (comment.trim() == "") {
        return this.$message({
          message: "输入不能为空",
          type: "warning",
        });
      }
      this.formVisible = true;
    },

    async sendComment() {
      // 整理数据
      const { gender, comment } = this.form;

      const data = {
        articleId: this.$route.query.articleId,
        gender,
        comment,
      };

      try {
        await this.$store.dispatch("comment/sendComment", data);
        
        this.$message({
            message:'评论成功',
            type:'success'
        })
        
        // 获取新的评论
        this.getComment()

      } catch (error) {
        console.log(error);
        this.$message({
          message: "评论失败",
          type: "warning",
        });
      }finally{
        this.form.comment = "";
        this.formVisible = false;

      }
    },

    getComment(){
        const data = {articleId:this.$route.query.articleId,order:this.order}
        this.$store.dispatch('comment/getComment',data)
    },

    changeOrder(order){
        if(this.order == order) return
        this.order = order
        this.getComment()
    }
  },

  computed:{
      ...mapState('comment',['comments'])
  },
  mounted() {
    //   获取评论
    const data = {articleId:this.$route.query.articleId,order:this.order}
    this.$store.dispatch('comment/getComment',data)
  },
};
</script>

<style lang="less" scoped>
.comment-container {
  padding: 0px 30px;
  height: 1000px;
  background-color: white;

  .comment-header {
    h1 {
      font-size: 18px;
      color: #222c62;
    }
    h2 {
      border-bottom: 1px solid #e5e9ef;
      font-size: 14px;
      //   margin-bottom: 10px;

      ul {
        padding: 0;
        margin-bottom: 5px;
        float: left;

        li {
          margin-left: 20px;
          list-style: none;
          float: left;
        }

        li:hover {
          color: #00a1d6;
          cursor: pointer;
        }

        .active {
          color: #00a1d6;
        }
      }
    }
  }

  .comment-send {
    //   border-bottom: 1px solid #e5e9ef;
    .comment-input {
      width: 700px;
    }
    .comment-submit {
      color: #fff;
      line-height: 20px;
      font-size: 14px;
      width: 70px;
      height: 72px;
      padding: 4px 15px;
    }
  }

  .choose-gender {
    ul {
      margin-top: -10px;
      margin-bottom: 20px;
      li {
        float: left;

        margin: 0px 10px;
        list-style: none;

        a {
          cursor: pointer;
          i {
            font-size: 60px;
            color: #e0e0e0;
          }

          .chosed-man {
            color: #00a1d6;
          }

          .chosed-women{
            color: pink;
          }
        }
      }
    }
  }

  .comment-show {
    width: 100%;

    .comment-wrapper {
      .avater {
        vertical-align: top;
        margin-top: 10px;
        height: 100px;
        width: 100px;
        // background-color: #f00;
        i {
          display: inline-block;
          margin-top: 10px;
          font-size: 40px;
        }
        .icon-user-man-full{
            color: #00a1d6;
        }

        .icon-user-women-full{
            color: pink;
        }
      }

      .comment-main {
        position: relative;
        display: inline-block;
        margin-left: 10px;
        //   height: 200px;
        width: 700px;
        // background-color: #ebf1fb;

        .user-name {
          color: #fb7229;
          font: 12px "Microsoft Yahei";
        }

        .text {
          padding-left: 10px;
        }

        .comt-time {
          padding-left: 10px;
          margin-top: 30px;

          font-size: 12px;
          color: #99a2aa;
        }
      }
    }
  }
}
</style>