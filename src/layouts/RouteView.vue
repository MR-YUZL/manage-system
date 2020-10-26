<template>
  <router-view :key="key"></router-view>
</template>

<script>
export default {
  name: "RouteView",
  data() {
    return {
      key: this.$route.name,
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.key = to.name;
    next();
  },
};
</script>

<style>
</style>
