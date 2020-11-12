<template>
  <div>
    <div class="MapModal" v-if="visible" :style="{ left: toLeft, top: toTop }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MapModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    toLeft: {
      type: String,
      default: "0px",
    },
    toTop: {
      type: String,
      default: "0px",
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.MapModal {
  width: 300px;
  height: 200px;
  background: url("../assets/imgs/slices/bg.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  overflow: hidden;
  padding: 5px 10px;
}
</style>
