<template>
  <!-- 访客信息，访客标签，工单信息，访问信息，服务小结整合 -->
  <div class="userInformation">
    <AccessInfo guestId="8c730589aa1d41a19d2ce8ca23f9fb1e" />
    <OrderInf guestId="8c730589aa1d41a19d2ce8ca23f9fb1e"/>
    <ServiceSummary guestId="8c730589aa1d41a19d2ce8ca23f9fb1e" />
  </div>
</template>

<script>

import AccessInfo from './../../../../components/userInf/AccessInfo'
import OrderInf from './../../../../components/userInf/OrderInf'
import ServiceSummary from './../../../../components/userInf/ServiceSummary'
export default {
    name: "",
    components: {
      AccessInfo,
      OrderInf,
      ServiceSummary
    },
    props:{
      guestId:{  // 访客id
        type:String,
        default:''
      }
    },
    data() {
      return {
      
      }
    },
    watch:{
      guestId(value,old){
        console.log('aa',value,'bb',old,'===============')
        
      }
    },
    created(){
      
    },
    mounted(){},
    methods: {
     
    
     
    }
}
</script>

<style lang="less" scoped>
  // .userInformation{
  //   height: calc(100vh - 70px);
  //   overflow-y: auto;
  // }
</style>
