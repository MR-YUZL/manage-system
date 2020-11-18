<template>
  <div class="">
    <h1>账号管理{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "account",
  components: {},
  props: {},
  data() {
    return {
      msg: "",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.msg = to.fullPath;
      },
    },
  },
  created() {},
  mounted() {
    this.msg = this.$route.fullPath;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
