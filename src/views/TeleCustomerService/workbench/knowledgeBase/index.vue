<template>
  <div class="knowledgeBase informationList">
    <div class="operation">知识库</div>
    <div class="content scroll">
      <knowledgeBase class="knowledgeBase" />
    </div>
  </div>
</template>

<script>
import knowledgeBase from "./../../../currentSession/informationList/knowledgeBase/index";
export default {
  data: () => ({}),
  components: {
    knowledgeBase
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
.knowledgeBase {
  .operation {
    border: 1px solid #e8e8e8;
    line-height: 43px;
    text-align: center;
  }
  .content {
    padding-top: 15px;
    height: calc(100vh - 70px);
    overflow-y: auto;
    // .knowledgeBase{
    //   background: red;
    //   height:;
    // }
  }
}
</style>
