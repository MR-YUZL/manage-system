<template>
  <div>
    <a-modal v-model="visibles" title="导入结果" @ok="handleSubmit" @cancel="handleCancel">
      <ul>
        <li>
          <span>导入结果 2020-02-13 16:24:25 操作人：nick</span>
          <span>共解析数据1条，成功导入0条，导入失败1条</span>
        </li>
      </ul>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visibles: this.visible
    };
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  props: {
    visible: Boolean
  },
  methods: {
    handleSubmit() {},
    handleCancel(e) {
      this.visibles = false
      this.$emit("closeUpdate");
    }
  }
};
</script>