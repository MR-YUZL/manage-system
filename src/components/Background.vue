<template>
  <div style="width:100px;height:40px;background-color:red">
    <span v-if="msg">{{ text }}</span>
    <a-button
      @click="
        function a() {
          console.log('this',this)
          $emit('handleClick', 'fasle');
        }
      "
      >测试</a-button
    >
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      msg: "11",
    };
  },
  watch: {
    msg(val) {
      console.log("val", val);
    },
  },
  created() {},
  mounted() {},
  updated() {
    console.log(this);
  },
  methods: {
    handleClick() {
      this.$emit("handleClick", "false");
    },
  },
};
</script>
<style lang="less" scoped></style>
