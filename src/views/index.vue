<template>
  <div class="qf-home clearfix">
    <div class="l-left">
      <LeftMenu />
    </div>
    <div class="list-right">
      <!-- <Header /> -->
      <div class="content clearfix">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { LeftMenu } from "./../components";

export default {
  name: "home",
  components: {
    LeftMenu,
    // Header
  },
  data: () => ({}),
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
    .qf-home{
        .list-right {
           
            box-sizing: border-box;
            padding-left: 200px;
            
            .content{
                width: 100%;
                float: right;
                height: 100vh;
                background: #FAFAFA;
                padding: 20px 15px;
            }
          
        }
    }
</style>
