<template>
  <!-- 访客信息，访客标签，工单信息，访问信息，服务小结整合 -->
  <div class="userInformation">
    <visitor-info :guestId="guestId" />
    <Tags :guestId="guestId" />
    <AccessInfo :guestId="guestId" />
    <OrderInf  :guestId="guestId" />
    <ServiceSummary :guestId="guestId" />
  </div>
</template>

<script>
import AccessInfo from './AccessInfo'
import VisitorInfo from './VisitorInfo'
import Tags from './Tags'
import OrderInf from './OrderInf'
import ServiceSummary from './ServiceSummary'
export default {
    name: "",
    components: {
      VisitorInfo,
      Tags,
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
      return {}
    },
    watch:{},
    created(){},
    mounted(){},
    methods: {}
}
</script>

<style lang="less" scoped>
  .relateCus{
    margin:10px 0 0 15px;
  }
</style>
<style lang="less">
  .saveClue .ant-form-item{
    margin-bottom:15px;
  }
</style>
