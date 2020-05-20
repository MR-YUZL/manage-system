<template>
  <div>
    <a-modal v-model="visibles" width="690px" title="列表字段设置" @ok="handleSubmit" @cancel="handleCancel">
      <a-transfer
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
  },
  methods: {
    getMock() {
      const targetKeys = [];
      const mockData = [];
      api.setFieldsJson().then(res=>{

      })
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    },
    renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.description}
        </span>
      );

      return {
        label: customLabel, // for displayed item
        value: item.title, // for title and filter matching
      };
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSubmit(){
        api.setFieldsJson().then(res=>{

        })
    },
    handleCancel() {
      this.visibles = false
      this.$emit('closeUpdate')
    }
  },
};
</script>

<style>
</style>