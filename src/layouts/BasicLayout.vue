<template>
  <main class="container">
    <header class="header">
      <div class="logo">
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
      <div class="header_right">
        <div class="header_right_manage">
          <span>帮助中心</span>
        </div>
        <a-divider type="vertical" />
        <div class="header_right_user">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              {{ userInfo.name }}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="loginOut">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </header>
    <main class="body">
      <nav class="nav" :style="[{ width: collapsed ? '6%' : '15%' }]">
        <a-menu
          mode="inline"
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
          :inline-collapsed="collapsed"
          style="width: 100%"
          theme="dark"
          @click="handleClick"
          @openChange="handleOpen"
        >
          <template v-for="v in menu">
            <a-sub-menu :key="v.path" v-if="v.children && !v.isChildMenu">
              <span slot="title"
                ><a-icon type="appstore" /><span>{{ v.meta.title }}</span></span
              >
              <a-menu-item v-for="value in v.children" :key="value.path">
                <a-icon type="pie-chart" />
                <span>{{ value.meta.title }}</span>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="v.path" v-else>
              <a-icon type="desktop" />
              <span>{{ v.meta.title }}</span></a-menu-item
            >
          </template>
        </a-menu>
      </nav>
      <main class="body_right">
        <transition name="fade-page" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </main>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "BasicLayout",
  props: {},
  data() {
    return {
      roles: "",
      menu: [],
      collapsed: false,
      selectedKeys: [],
      openKeys: [],
    };
  },
  computed: {
    ...mapState({
      mainRoute: (state) => state.user.mainRoute,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {},
  mounted() {
    this.init();
    this.updatedMenu();
  },
  methods: {
    ...mapActions(["LoginOut"]),
    init() {
      this.menu = this.mainRoute;
    },

    updatedMenu() {
      const routes = this.$route.matched.concat();
      const lg = routes.length;

      routes.some((item, index) => {
        const isParent = item.meta.isParent;
        const hasChild = item.meta.hasChild;
        if (isParent) {
          this.selectedKeys = [item.path];
          return true;
        } else {
          let idx = lg - 1;
          if (hasChild) {
            this.openKeys = [item.path];
          }
          if (index === idx) {
            this.selectedKeys = [item.path];
          }
        }
      });
    },

    handleOpen(e) {
      this.openKeys = e;
    },

    handleClick(e) {
      this.$router.push(e.key);
      this.selectedKeys = [e.key];
    },

    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    loginOut() {
      let that = this;

      this.$confirm({
        title: "您确定要退出吗?",
        onOk() {
          return that.LoginOut().then(() => that.$router.push("/login"));
        },
        onCancel() {},
      });
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
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    background: white;
    padding: 0 20px;
    box-shadow: 4px 0px 10px rgba(65, 106, 115, 1);
    .logo {
      vertical-align: middle;
    }
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
    overflow: hidden;
    padding-top: 50px;
    .nav {
      float: left;
      height: 100%;
      background-color: #001529;
      transition: all 0.3s ease-in;
      // box-shadow: 4px 0px 10px rgba(65, 106, 115, 1);
    }
    .body_right {
      overflow: auto;
      height: 100%;
      background: rgba(65, 106, 115, 0.1);
      padding: 24px;
    }
  }
}
</style>
