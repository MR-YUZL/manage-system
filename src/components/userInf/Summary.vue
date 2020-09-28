<template>
  <div class="serviceSummary">
    <div class="header">
      <span class="serviceIcon">服务小结</span>
    </div>
    <div class="serviceSummary_item">
      <a-icon
        :type="active ? 'down' : 'up'"
        class="icon"
        @click="showFn"
        v-if="questionList && questionList.length"
      />
      <div v-if="questionListArry.length>0">
        <div v-for="(item,index) in questionListArry" :key="index" class="question">
          <div class="question_top">
            <span>{{item.inputTime}}</span>
            <span v-if="item.consuleType == 1" class="iconBg iconBg1">来访联系人:{{item.contactName}}</span>
            <span v-if="item.consuleType == 0" class="iconBg iconBg2">来访联系人:{{item.contactName}}</span>
            <span>{{item.serviceName}}</span>
          </div>
          <div>{{item.title}}</div>
          <div>{{item.remark}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    guestId: {
      // 访客id
      type: String,
      default: ""
    },
    custId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      active: false,
      questionListArry: [],
      questionList: []
    };
  },
  watch: {
    custId() {
      this.getServiceList();
    }
  },
  created() {
    this.getServiceList();
  },
  mounted() {},
  components: {},
  methods: {
    showFn() {
      this.active = !this.active;
      if (this.questionList.length > 0) {
        if (this.active) {
          this.questionListArry = [...this.questionList];
        } else {
          this.questionListArry = [this.questionList[0]];
        }
      }
    },
    //获取服务小结
    getServiceList() {
      let params = {
        guestId: this.guestId,
        custId: this.custId
      };
      this.Request.get("/hfw/workbench/getServiceSummary", params).then(res => {
        console.log("服务小结", res.data);
        this.questionList = res.data.list ? res.data.list : [];
        if (this.questionList.length > 0) {
          this.questionListArry = [this.questionList[0]];
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.serviceSummary {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    .setting {
      color: #3e7bf8;
      cursor: pointer;
    }
    .serviceIcon {
      padding-left: 26px;
      background: url("../../assets/imgs/text-icon.png") center left no-repeat;
    }
  }
  .serviceSummary_item {
    position: relative;
    .question {
      width: 93%;
      background: #ebebeb;
      margin-top: 15px;
      padding: 15px;
      .question_top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        .iconBg {
          background-repeat: no-repeat;
          background-size: 14px 14px;
          padding-left: 20px;
          background-position: 0 center;
        }
        .iconBg1{
          background-image: url(../../assets/imgs/phoneIcon.png);
        }
        .iconBg2{
          background-image: url(../../assets/imgs/sessionIcon.png);
        }
      }
    }

    .icon {
      position: absolute;
      right: 0;
    }
  }
}
</style>