<template>
  <div>
    <h1 class="">
      {{ msg }}
    </h1>
    <router-view></router-view>
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
    };
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
