<template>
  <div>
    <a-modal width="720px" v-model="visibles" title="客户详情" @cancel="handleCancel">
      <div class="btn-area">
        <a-button type="primary" @click="editCustomer">编辑</a-button>
        <a-button type="primary" @click="createLinkman">新建联系人</a-button>
        <a-button type="primary" @click="followCustomer">客户跟进</a-button>
      </div>
      <ul class="flex">
        <li>
          <span>客服负责人</span>
          <span>吴阿鹏</span>
        </li>
        <li>
          <span>最近回访时间</span>
          <span>吴阿鹏</span>
        </li>
        <li>
          <span>客户来访次数</span>
          <span>吴阿鹏</span>
        </li>
        <li>
          <span>客户创建时间</span>
          <span>吴阿鹏</span>
        </li>
      </ul>
      <a-tabs default-active-key="1" @change="tabChange">
        <a-tab-pane key="1" tab="客户相关">
          <div class="contactFlex">
            <div class="contactHead">联系人(2)</div>
            <div @click="createLinkman">
              <a-icon type="plus" />添加联系人
            </div>
          </div>
          <ul class="contactUl">
            <li>
              <span>
                吴鹏
                <a-icon type="edit" />
                <a-icon type="delete" />
              </span>
              <span>
                <i>手机号18767137823</i>
                <i>职务：产品经理</i>
                <i>电话来访333</i>
                <i>会话来访0</i>
              </span>
            </li>
          </ul>
          <!-- 服务小结 -->
          <ServiceSummary :questionList="questionList" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="资料"></a-tab-pane>
        <a-tab-pane key="3" tab="日志"></a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import ServiceSummary from "@/components/userInf/ServiceSummary";
export default {
  data() {
    return {
      visibles: this.visible,
      questionList: [] //客服小结
    };
  },
  components: {
    ServiceSummary
  },
  props: {
    visible: Boolean,
    detailId: String
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  mounted() {
    this.getServiceList();
  },
  methods: {
    editCustomer(){},
    createLinkman() {},
    followCustomer(){},
    tabChange() {},
    //获取服务小结
    getServiceList() {
      this.Request.post(
        "/hfw/workbench/getServiceSummary?guestId=" + this.detailId
      ).then(res => {
        console.log("服务小结", res.data.list);
        this.questionList = res.data.list;
      });
    },
    
    handleSubmit() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>

<style lang="less" scoped>
.btn-area{
  button{
    margin-left: 10px;
  }
}
.flex {
  display: flex;
  justify-content: space-around;
  text-align: center;
  li {
    flex: 1;
    span {
      display: block;
    }
    span:first-child {
      color: #808080;
    }
    span:last-child {
      color: #333;
    }
  }
}
.contactFlex {
  display: flex;
  justify-content: space-between;
  .contactHead {
    background: url(../../../assets/imgs/ly-user.png) no-repeat 0 center;
    padding-left: 22px;
  }
}
.contactUl {
  li {
    padding: 10px 0;
    span {
      display: block;
      i {
        font-style: normal;
      }
    }
    span:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>