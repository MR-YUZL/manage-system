<template>
  <a-cascader
    :options="option"
    placeholder="请选择"
    @change="onChange"
    :load-data="loadData"
    change-on-select
    :value="value"
  />
</template>

<script>
export default {
  name: "Cascader",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      option: JSON.parse(JSON.stringify(this.options)),
    };
  },
  created() {
    // this.option = this.options;
    console.log("created=============", this.option);
  },
  mounted() {},
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    loadData(selectedOptions) {
      let targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        console.log("loadData======", this.option);
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
        this.option = [...this.option];
        this.$emit("update:options", this.option);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
