<template>
  <div>
    <a-modal
      v-model="visibles"
      width="690px"
      title="列表字段设置"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-transfer
      :titles="['隐藏字段', '显示字段']"
        :data-source="mockData"
        :list-style="{
      width: '300px',
      height: '300px',
    }"
        :target-keys="targetKeys"
        :render="renderItem"
        @change="handleChange"
      />
    </a-modal>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      mockData: [],
      targetKeys: [],
      visibles: this.visible
    };
  },
  props: {
    visible: Boolean
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  mounted() {
    this.getMock();
    this.getList();
  },
  methods: {
    getList() {
      api.setFieldsJson({ state: 0 }).then(res => {
        console.log("操作设置", res);
        let newArr = JSON.parse(JSON.stringify(res.data.list).replace(/fieldId/g, 'key'))
        this.mockData = newArr;
      });
    },
    getMock() {
      const targetKeys = [];
      const mockData = [];
      api.setFieldsJson().then(res => {});
      this.targetKeys = targetKeys;
    },
    renderItem(item) {
      return {
        label: item.fieldName, // for displayed item
        value: item.fieldCode // for title and filter matching
      };
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSubmit() {
      api.setFieldsJson().then(res => {});
    },
    handleCancel() {
      this.visibles = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>

<style>
</style>