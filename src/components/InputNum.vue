<template>
  <div class="num">
    <a-input-number
      :id="`min_${name}`"
      v-model="value[0]"
      :min="0"
      :max="Number(value[1])"
      @change="onChange"
    />
    <div>~</div>
    <a-input-number
      :id="`max_${name}`"
      v-model="value[1]"
      :min="Number(value[0])"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: "InputNum",
  components: {},
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: Array,
      default: () => [0, 50],
    },
    name: {
      type: String,
      default: "",
    },
  },
  created() {},
  mounted() {},
  methods: {
    onChange() {
      // let { min, max } = this.$data;
      // let numArr = [min, max];
      this.$emit("change", this.value);
    },
  },
};
</script>

<style lang="less" scoped>
.num {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
