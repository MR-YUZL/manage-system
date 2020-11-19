<template>
  <div class="Steps3">
    <div class="first">
      <div class="first_body"><slot></slot></div>

      <div id="triangle-bule"></div>
    </div>
    <div
      class="proceed"
      v-for="(v, index) in statusList.slice(1, -1)"
      :key="index"
    >
      <div id="triangle-white"></div>
      <div class="proceed_body" :style="status">
        <slot></slot>
      </div>
      <div id="triangle-bule"></div>
    </div>
    <div class="last">
      <div id="triangle-bule"></div>
      <div class="last_body">
        <slot></slot>
      </div>
    </div>
    <a-button type="primary" class="btnWin"> 赢单 </a-button>
    <a-button type="danger" class="btnLow"> 输单 </a-button>
  </div>
</template>
<script>
export default {
  name: "Steps3",
  props: {
    statusList: {
      type: Array,
      default: () => [0, 1, 2], //1代表完成 2代表进行 3代表结束
    },
  },
  components: {},
  computed: {
    status() {
      return { border: ["1px", "soild", "#1890ff"] };
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods() {},
};
</script>
<style lang="less" scoped>
.Steps3 {
  display: flex;
  align-items: center;
  padding: 10px 8px;
  background: #ddd;
  .first {
    display: flex;
    width: 100px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    .first_body {
      width: 90px;
      height: 20px;
      line-height: 20px;
      background: #1890ff;
    }
  }
  .proceed {
    display: flex;
    width: 100px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    .proceed_body {
      width: 90px;
      height: 20px;
      line-height: 20px;
    }
  }
  .last {
    display: flex;
    width: 100px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
    .last_body {
      width: 90px;
      height: 20px;
      line-height: 20px;
    }
  }
}
#triangle-bule {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 10px solid #1890ff;
  border-bottom: 10px solid transparent;
  z-index: 10;
}
#triangle-white {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 10px solid #ddd;
  border-bottom: 10px solid transparent;
  z-index: 10;
}
</style>
