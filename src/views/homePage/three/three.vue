<template>
  <div>
    <h1 class="">
      {{ msg }}
    </h1>
    <a-button type="primary" v-permission:add="componentName"> 提交 </a-button>
  </div>
</template>

<script>
import { GetUserInfo } from "@/api/login";
export default {
  name: "three",
  components: {},
  props: {},
  data() {
    return {
      msg: "Hello World!",
      componentName: "three",
    };
  },
  watch: {
    $route(to, from) {
      this.componentName = to.name;
    },
  },
  created() {},
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
