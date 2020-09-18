<template>
  <div class="flex-container">
    <a-page-header class="flex-page-header" title="渠道设置" />
    <div class="flex-content">
      <iframe
        src="../static/channelSettings/index.html"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>
//?orgId + ${$store.state.basic.imInfo.orgId}
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .flex-page-header {
    flex-shrink: unset;
  }

  .flex-content {
    flex: 1;
    iframe {
      width: 100%;
      height: calc(100vh - 89px);
    }
  }
}
</style>
