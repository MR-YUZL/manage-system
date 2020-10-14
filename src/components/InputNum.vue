<template>
  <div class="num">
    <a-input-number
      id="inputNumberMin"
      v-model="array[0]"
      :min="0"
      :max="Number(array[1])"
      @change="onChange"
    />
    <div>~</div>
    <a-input-number
      id="inputNumberMax"
      v-model="array[1]"
      :min="Number(array[0])"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: "InputNum",
  components: {},
  model: {
    prop: "array",
    event: "change",
  },
  props: {
    array: {
      type: Array,
      default:()=> [0,50]
    },
  },
  created() {},
  mounted() {},
  methods: {
    onChange() {
      // let { min, max } = this.$data;
      // let numArr = [min, max];
      this.$emit("change", this.array);
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
