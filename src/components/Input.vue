<template>
  <a-input v-bind="$attrs" @change="change" :value="value" />
</template>

<script>
export default {
  name: "Input",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(e) {
      this.$emit("change", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
