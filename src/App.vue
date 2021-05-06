<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "app",
  data: () => ({
    locale: zhCN,
  }),
  mounted() {
    // window.localStorage.getItem("a");
    console.log(window.localStorage.getItem("a"));
    this.$utils.resetScreenSizeTwo();
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
