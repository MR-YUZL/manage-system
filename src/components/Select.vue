<template>
  <a-select
    placeholder="请输入"
    :value="value"
    @select="change"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <a-select-option
      v-for="(v, index) in options"
      :key="index"
      :value="v.value"
    >
      {{ v.title }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: "Select",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [{ value: "", title: "" }],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    change(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
