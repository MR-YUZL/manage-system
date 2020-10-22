<template>
  <div class="num">
    <a-input-number
      v-model="value[0]"
      :min="0"
      :max="Number(value[1])"
      @change="onChangeMin"
    />
    <div>~</div>
    <a-input-number
      v-model="value[1]"
      :min="Number(value[0])"
      :max="50"
      @change="onChangeMax"
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
  },
  data() {
    return {
      max: 50,
      min: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onChangeMin(value) {
      this.min = value;
      let arr = [value, this.max];
      this.$emit("change", arr);
    },
    onChangeMax(value) {
      this.max = value;
      let arr = [this.min, value];
      this.$emit("change", arr);
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
