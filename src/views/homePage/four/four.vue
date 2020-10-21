<template>
  <div class="container">
    <nav class="container__nav">
      <a-menu
        :mode="'inline'"
        :style="{ border: '0' }"
        :selectedKeys="selectedKeys"
        type="inner"
        @click="onClick"
      >
        <a-menu-item key="/homePage/four/power">
          <router-link :to="{ name: 'power' }"> 权限分配 </router-link>
        </a-menu-item>
        <a-menu-item key="/homePage/four/account">
          <router-link :to="{ name: 'account' }"> 账号管理 </router-link>
        </a-menu-item>
      </a-menu>
    </nav>
    <main class="container__main">
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
      selectedKeys:['/homePage/four/power']
    };
  },
  created() {},
  mounted() {},
  methods: {
    onClick(e){
       this.selectedKeys = [e.key]
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  .container__nav {
    height: 100%;
    width: 15%;
  }
  .container__main {
    height: 100%;
    width: 85%;
  }
}
</style>
