<template>
  <div class="sessionCenter">
    <div class="operation">
        <a-button type="primary" ghost>
         取消预约
        </a-button>
        <a-button type="primary" ghost>
        呼叫
        </a-button>
    </div>
    <user-inf />
  </div>
</template>

<script>

import userInf from './../../../../components/userInf/index'

export default {
  data: () => ({
    

    
 
  }),
  components: {
    userInf,
   
  },
  mounted() {
    
  },
  methods: {
   
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
  .sessionCenter{
      background: #f5f5f5;
      .operation{
          border-top: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          background: #FFFFFF;
          line-height: 43px;
          text-align: right;
          padding: 0 15px;
          .ant-btn{
              width: 85px;
              margin: 0 10px;
          }
      }
  }
</style>
