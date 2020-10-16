<template>
  <a-tree-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    @change="handleChange"
  >
    <span slot="custom" slot-scope="{ title, value }">
      <p>
        <span>{{ title }}</span>
        <span>{{ value }}</span>
      </p>
    </span>
  </a-tree-select>
</template>

<script>
export default {
  name: "TreeSelect",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(value, label, extra) {
      this.$emit("change", label);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
