<template>
  <a-pagination
    show-quick-jumper
    showSizeChanger
    :defaultPageSize="5"
    :pageSizeOptions="['5', '10', '15', '20']"
    :show-total="(total) => `共 ${total} 条数据`"
    :default-current="1"
    :total="total"
    @change="handleChange"
    @showSizeChange="handleChange"
  />
</template>

<script>
export default {
  name: "pagination",
  components: {},
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      pageSize: 5,
      current: 1,
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(page, size) {
      this.current = page || this.current;
      this.pageSize = size || this.pageSize;
      this.$emit("change", { current: this.current, pageSize: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
