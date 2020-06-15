<template>
  <!-- 访客信息，访客标签，工单信息，访问信息，服务小结整合 -->
  <div class="userInformation">
    <AccessInfo :guestId="visitorInf.guestId" />
    <OrderInf :guestId="visitorInf.guestId" />
    <ServiceSummary :guestId="visitorInf.guestId" />
  </div>
</template>

<script>
import AccessInfo from "./../../../../components/userInf/AccessInfo";
import OrderInf from "./../../../../components/userInf/OrderInf";
import ServiceSummary from "./../../../../components/userInf/ServiceSummary";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    AccessInfo,
    OrderInf,
    ServiceSummary
  },
  props: {
    guestId: {
      // 访客id
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      visitorInf: state => state.basic.visitorInf
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
// .userInformation{
//   height: calc(100vh - 70px);
//   overflow-y: auto;
// }
</style>
