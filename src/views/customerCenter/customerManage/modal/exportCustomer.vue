<template>
  <div>
    <a-modal v-model="visibles" title="导出客户" @ok="handleOk" @cancel="handleCancel">
      <p>是否确认导出当前条件下的客户数据？</p>
      <p>本次导出共{{tableList.length}}条数据</p>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      visibles: this.visible
    };
  },
  props: {
    visible: Boolean,
    dataSource:String,
    tableList: Array
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  methods: {
    handleOk() {
      let params = {
        dataSource:this.dataSource,
        queryType:'1',
        totalRecord:this.tableList.length
      }
      api.exportCustomer(params).then(res=>{
        console.log(res,'7777')
      })
    },
    handleCancel() {
      this.visibles = false
      this.$emit('closeUpdate')
    }
  }
};
</script>