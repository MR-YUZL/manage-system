<template>
  <div>
    <a-modal v-model="visibles" title="导出客户" @ok="handleOk" @cancel="handleCancel">
      <p>是否确认导出当前条件下的客户数据？</p>
      <p>本次导出共5条数据</p>
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
    dataSource:String
  },
  methods: {
    handleOk() {
      let params = {
        dataSource:this.dataSource
      }
      api.exportCustomer().then(res=>{
        
      })
    },
    handleCancel() {
      this.visibles = false;
    }
  }
};
</script>