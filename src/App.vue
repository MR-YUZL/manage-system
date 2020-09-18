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
    locale: zhCN
  }),
  mounted() {
    external.call &&
      external.call(
        "CppLoadComplete",
        { type: "2", calljs: "" },
        (error, result) => {
          console.log(result);
        }
      );
  },
  created() {
    this.Request.get("/config/hfwConfigResource/getButtRealms").then(res => {
      this.$store.commit("getBtnRealms", res.data.list);
    });
    // this.setStatus(1);
  },
  destroyed() {
    this.setStatus(0);
  },
  methods: {
    setStatus(status) {
      //status: 0离线，1在线，2忙碌
      this.Request.get("/api/chat/customer/status/update", {
        status: status
      }).then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
#app {
  min-width: 1280px;
  // height: 100%;
}
</style>
