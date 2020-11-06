<template>
  <div class="four">
    <nav class="four__nav">
      <a-menu
        :mode="'inline'"
        :style="{ border: '0' }"
        :selectedKeys="selectedKeys"
        type="inner"
        @click="onClick"
      >
        <a-menu-item key="/four/power">
          <router-link :to="{ name: 'power' }"> 权限分配 </router-link>
        </a-menu-item>
        <a-menu-item key="/four/account">
          <router-link :to="{ name: 'account' }"> 账号管理 </router-link>
        </a-menu-item>
      </a-menu>
    </nav>
    <main class="four__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "four",
  components: {},
  props: {},
  data() {
    return {
      selectedKeys: [],
    };
  },
  watch: {
    $route() {
      this.updateMenu();
    },
  },
  created() {},
  mounted() {
    this.updateMenu();
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
    },
    onClick(e) {
      this.selectedKeys = [e.key];
    },
  },
};
</script>

<style lang="less" scoped>
.four {
  width: 100%;
  background: #ffffff;
  display: flex;
  .four__nav {
    width: 15%;
  }
  .four__main {
    padding: 12px 16px;
    width: 85%;
  }
}
</style>
