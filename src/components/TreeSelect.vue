<template>
  <a-tree-select
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    @change="handleChange"
  >
    <template slot="custom" slot-scope="item">
      <p>
        <span>{{ item.title }}</span>
        <span>{{ item.value }}</span>
      </p>
    </template>
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
