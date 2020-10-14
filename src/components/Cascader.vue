<template>
  <a-cascader
    :options="options"
    placeholder="请选择"
    @change="onChange"
    :load-data="loadData"
    change-on-select
  />
</template>

<script>
import { options } from "@/utils/name";
export default {
  name: "Cascader",
  model: {
    prop: "cascaderData",
    event: "change",
  },
  props: {
    cascaderData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    loadData(selectedOptions) {
      console.log('selectedOptions',selectedOptions)
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} low 1`,
            value: "dynamic1",
          },
          {
            label: `${targetOption.label} low 2`,
            value: "dynamic2",
          },
        ];
        this.options = [...this.options];
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
