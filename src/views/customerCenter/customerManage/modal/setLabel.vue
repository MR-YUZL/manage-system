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
        :dataSource="mockData"
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
    this.getList();
  },
  methods: {
    getList() {
      api.setFieldsJson({ state: 0 }).then(res => {
        console.log("操作设置", res);
        
        let newArr = res.data.list.map((item) => {
          return {
            ...item,
            key: item.fieldId,
            title: item.fieldName
          }
        })
        this.mockData = newArr;
        this.targetKeys = newArr.filter(v => v.isShow == 1).map(item => item.key);
      });
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
      this.mockData.map(v=>{
        this.targetKeys.map(item=>{
          if(v.key == item){
            v.isShow = 1
          }else{
            v.isShow = 0
          }
        })
      })
      api.fieldsShowSave({list:this.mockData}).then(res => {
        if(res.data.status){
          this.$message.success("保存成功");
          this.visibles = false;
          this.$emit('successLoadList')
        }
      });
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