<template>
  <div class="step">
    <div
      :class="['unFinished']"
      :style="{ marginBottom: `${height - 1}px` }"
      :id="index"
    >
      <div class="line" v-if="height" :style="{ height: `${height}px` }"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "step",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      current: this.$parent.current,
    };
  },
  watch: {
    current(val) {
      this.assignment();
    },
  },
  created() {},
  mounted() {
    this.assignment();
  },
  methods: {
    assignment() {
      console.log("this.content", this.content);
      if (this.current === this.index) {
        this.$parent.content = this.content;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.step {
  display: flex;
  justify-content: flex-start;
  align-self: center;

  .line {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    border: 1px solid #000;
  }
  .unFinished {
    position: relative;
    width: 10px;
    height: 10px;
    background: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
