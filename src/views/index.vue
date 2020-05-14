<template>
  <div class="qf-home clearfix">
    <div class="l-left">
      <LeftMenu />
    </div>
    <div class="list-right">
      <!-- <Header /> -->
      <div class="content clearfix">
        <div class="box">
          <router-view />
        </div>
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
      background:#f1f2f5;
      height: 100%;
        .list-right {
            box-sizing: border-box;
            padding-left: 200px;
            height: 100%;
            .content{
                width: 100%;
                height: 100%;
                float: right;
                // height: 100vh;
                background: #f1f2f5;
                padding: 10px 0 10px 10px;

            }
            .box{
              background:#fff;
              padding-bottom:50px;
            }
        }
        .l-left{
          box-sizing: border-box;
        }
    }
</style>
<style lang="less">
.ant-page-header{
  background:#f1f2f5;
  font-size:14px;
  padding-left:0;
}
</style>
