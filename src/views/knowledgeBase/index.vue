<template>
  <div>
    <a-page-header title="知识库" style="padding:16px 0;" />
    <div class="knowledgeBase">
      <classification :isShow="isShow" />
      <knowledge :isShow="isShow" />
    </div>
  </div>
</template>

<script>
import classification from "./classification";
import knowledge from "./knowledge";
import { mapState } from "vuex";
import moment from "moment";
export default {
  components: {
    classification,
    knowledge
  },
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    // window.showMsgCenterEx()
  },
  methods: {},
  watch: {
    btnRealms: {
      handler(newVal) {
        this.isShow =
          newVal.indexOf("knowledge_base_maintianing") > -1 ? true : false;
      },
      immediate:true
    }
  },
  computed: {
    ...mapState({
      btnRealms: state => state.basic.btnRealms
    })
  }
};
</script>
<style lang="less" scoped>
.knowledgeBase {
  background: #fff;
  display: flex;
  padding: 14px;
}
</style>
