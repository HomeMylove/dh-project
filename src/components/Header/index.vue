<template>
  <div class="container header">
    <header>
      <div class="middle clearfix">
        <!-- 左边标题 -->
        <span class="title" @click="$router.push({path:'home'})">{{$t('message.mainName')}}</span>

        <!-- 右边导航栏 -->
        <ul ref="navBar">
          <li class="lang-change">
            <el-dropdown @command="changeLang">
              <span class="el-dropdown-link">
                {{lang}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                :command="lang"
                v-for="lang in langs"
                :key="lang.name"
                >{{lang.local}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li>
            <router-link
              to="/home"
              class="active"
              @click.native="choose($event)"
              >{{$t('message.home')}}</router-link
            >
          </li>
          <li>
            <router-link to="/search" @click.native="choose($event)"
              >{{$t('message.search')}}</router-link
            >
          </li>
          <li>
            <router-link to="/upload" @click.native="choose($event)"
              >{{$t('message.upload')}}</router-link
            >
          </li>
          <li>
            <router-link to="/discussion" @click.native="choose($event)"
              >{{$t('message.discussion')}}</router-link
            >
          </li>
          <li>
            <router-link to="/external" @click.native="choose($event)"
              >Github</router-link
            >
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
    return {
      langs:[
        {name:'cn',local:'中文'},
        {name:'en',local:'English'},
        {name:'jp',local:'日本語'}
      ],
      lang:'中文'
    };
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
     changeLang(lang) {
      this.$i18n.locale = lang.name
      this.lang = lang.local
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
      cursor: pointer;
    }
  

    ul {
      float: right;

      li {
        float: left;
        color: #0d6efd;
        // background-color: cyan;
        list-style: none;

        .el-dropdown-link {
          cursor: pointer;
          color: #409eff;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }

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
      li.lang-change {
        margin-right: 20px;
      }
    }
  }
}
</style>>
