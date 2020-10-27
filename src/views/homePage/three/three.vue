<template>
  <div>
    <h1 class="">
      {{ msg }}
    </h1>
    <a-button type="primary" v-permission:add> 提交 </a-button>
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
  beforeRouteEnter(to,from,next){
    next()
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
