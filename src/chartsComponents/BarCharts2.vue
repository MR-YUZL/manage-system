<template>
  <div class="BarCharts2">
    <div
      v-for="(v, index) in dataList"
      :key="index"
      class="item"
      :style="{ height: itemHeight(v.data) }"
    >
      <a-tooltip placement="left">
        <template slot="title">
          <span>{{ v.name }}:{{v.data}}</span>
        </template>
        <div class="item_body" :style="{ background: itemBk(index) }"></div>
      </a-tooltip>

      <span class="item_value">{{ v.data }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "BarCharts2",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      color: [
        "rgb(167,200,254)",
        "rgb(201,231,255)",
        "rgb(119,205,251)",
        "rgb(77,219,179)",
        "rgb(253,212,98)",
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    itemHeight(val) {
      return val;
    },
    itemBk(index) {
      return this.color[index];
    },
  },
};
</script>
<style lang="less" scoped>
.BarCharts2 {
  width: 160px;
  height: 175px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .item_body {
      width: 80%;
      height: 100%;
    }
    .item_value {
      display: inline-block;
      vertical-align: middle;
      width: calc(20% - 8px);
    }
  }
}
</style>
