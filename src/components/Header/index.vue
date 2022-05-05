<template>
  <div class="container header">
    <header>
      <div class="middle clearfix">
        <!-- 左边标题 -->
        <span class="title">Library of Japanese Literature</span>

        <!-- 右边导航栏 -->
        <ul ref="navBar">
          <li>
            <router-link to="/home" class="active" @click.native="choose($event)"
              >Home</router-link
            >
          </li>
          <li>
            <router-link to="/search" @click.native="choose($event)">Search</router-link>
          </li>
          <li>
            <router-link to="/upload" @click.native="choose($event)">Upload</router-link>
          </li>
          <li>
            <router-link to="/discussion" @click.native="choose($event)">Discussion</router-link>
          </li>
          <li>
            <router-link to="/external" @click.native="choose($event)">Github</router-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },

  methods: {
    choose(e) {
      const li = e.target.parentNode;
      const lis = this.$refs.navBar.children;

      for (let i = 0; i < lis.length; i++) {
        lis[i].children[0].classList.remove("active");
        if (lis[i] == li) {
          lis[i].children[0].classList.add("active");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
header {
  width: 960px;
  height: 74px;
  // background-color: red;
  margin: 0px 0px 24px;
  padding: 16px 0;

  .middle {
    width: 100%;
    position: relative;
    // padding-top: 10px;
    height: 60px;
    // line-height: 60px;
    border-bottom: 1px solid #f1f2f4;

    .title {
      position: absolute;
      top: 10px;
      color: #212529;
      font: 24px -apple-system;
    }

    ul {
      float: right;

      li {
        float: left;
        color: #0d6efd;
        // background-color: cyan;
        list-style: none;

        a {
          color: #0d6efd;
          text-decoration: none;
          padding: 8px 16px;
        }

        a.active {
          color: white;
          background-color: #0d6efd;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>>
