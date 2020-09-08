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
    
  },
  created(){
    this.Request.get("/config/hfwConfigResource/getButtRealms").then(res => {
     this.$store.commit('getBtnRealms',res.data.list)
    });
  },
  
};
</script>
<style lang="less" scoped>
#app {
  min-width: 1280px;
  height: 100%;
}
</style>
