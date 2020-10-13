<template>
  <main class="container">
    <header class="header">
      <div class="logo"></div>
      <div class="header_right">
        <div class="header_right_manage">
          <span>帮助中心</span>
        </div>
        <a-divider type="vertical" />
        <div class="header_right_user">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              超级管理员<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </header>
    <main class="body">
      <nav class="nav">
        <a-menu
          mode="inline"
          :default-open-keys="['/market']"
          style="width: 100%"
          theme="dark"
          @click="handleClick"
        >
          <template v-for="v in menu">
            <a-sub-menu :key="v.key" v-if="v.children" @titleClick="titleClick">
              <span slot="title">{{ v.title }}</span>
              <a-menu-item v-for="value in v.children" :key="value.key">{{
                value.title
              }}</a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="v.key" v-else>{{ v.title }}</a-menu-item>
          </template>
        </a-menu>
      </nav>
      <main class="body_right">
        <router-view></router-view>
      </main>
    </main>
  </main>
</template>

<script>
import { menu } from "@/utils/name.js";
export default {
  name: "homePage",
  props: {},
  data() {
    return {
      menu,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(e) {
      console.log("click", e);
      this.$router.push(e.key)
    },
    titleClick(e) {
      console.log("titleClick", e);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background: white;
    padding: 0 20px;
    box-shadow: 4px 0px 10px rgba(65, 106, 115, 1);
    .header_right {
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header_right_manage {
        color: rgba(199, 199, 199, 1);
        height: 50px;
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
  .body {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding-top: 50px;
    .nav {
      width: 15%;
      height: 100%;
      background-color: #001529;
      // box-shadow: 4px 0px 10px rgba(65, 106, 115, 1);
    }
    .body_right {
      width: 85%;
      height: 100%;
      background: rgba(65, 106, 115, 0.1);
      padding: 24px;
    }
  }
}
</style>
