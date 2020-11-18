<template>
  <div class="layout">
    <section class="leftNav">
      <section class="layout">
        <div class="layout_one" ref="one"></div>
        <div class="layout_two" ref="two"></div>
        <div class="layout_three" ref="three"></div>
      </section>
    </section>
    <section class="middle"></section>
    <section class="rightNav"></section>
  </div>
</template>
<script>
export default {
  name: "layout",
  props: {},
  components: {},
  data() {
    return {
      title: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.one.style.height = "100px";
      this.$refs.two.style.flexGrow = 1;
      this.$refs.three.style.flexGrow = 1;
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
  .leftNav {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: gray;
    .layout {
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 100%;
      .layout_one {
        width: 100%;
        background: chocolate;
      }
      .layout_two {
        width: 100%;

        background: cornsilk;
      }
      .layout_three {
        width: 100%;

        background: coral;
      }
    }
  }
  .rightNav {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background-color: gray;
  }
  .middle {
    margin-left: 210px;
    margin-right: 210px;
    background-color: lightgray;
    height: 100%;
  }
}
</style>
