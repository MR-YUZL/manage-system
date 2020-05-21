<template>
  <div>
    <Modal :currentModal="currentModal" @toggleModal="toggleModal">
      <template v-slot:content>
        <!-- <BaseForm :formObject="formObject" :defaultValues="formAxiosReturnValues" @toggleModal="toggleModal" @formSubmit="formSubmit" /> -->
        <!-- <FormModelSearchForm :defaultFormValues="defaultSearchFormValues" :formList="searchFormList" /> -->
        <div class="btn-area">
          <a-button type="primary">编辑</a-button>
          <a-button type="primary" @click="createContactModalShow($event,'modalInner')">新建联系人</a-button>
          <a-button type="primary">客户跟进</a-button>
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
          <ServiceRecord :recordObj="serviceObj" />
          <!-- 跟进记录 -->
          <ServiceRecord :recordObj="followObj" />
          <!-- 工单信息 -->
          <OrderInf :userInfList="userInfList"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="资料">

        </a-tab-pane>
        <a-tab-pane key="3" tab="日志"></a-tab-pane>
      </a-tabs>
        <Modal :currentModal="modalInner">
          <template v-slot:content>111</template>
        </Modal>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import api from "@/api/customerCenter";
import OrderInf from "@/components/userInf/OrderInf";
import ServiceRecord from "@/components/userInf/ServiceRecord";
export default {
  data() {
    return {
      serviceObj: {
        currentTit: "服务小结",
        questionList: []
      }, //客服小结
      followObj: {
        currentTit: "跟进记录",
        questionList: []
      },
      userInfList: [],
      obj: {
        custId: this.detailId
      },
      currentModal: {
        title: "客户详情",
        visible: this.visible,
        width:'720px'
      },
      modalInner: { title: "modalInner", visible: false }
    };
  },
  components: {
    ServiceRecord,
    OrderInf,
    Modal
  },
  props: {
    visible: Boolean,
    detailId: String
  },
  watch: {
    visible(val) {
      this.currentModal.visible = val;
    }
  },
  mounted() {
    this.getServiceList();
    this.getDetail(this.obj);
    this.getContactJson(this.obj);
  },
  methods: {
    getContactJson(params) {
      api.contactInfo(params).then(res => {
        console.log("联系人列表", res);
      });
    },
    editCustomer() {},
    createLinkman() {},
    toggleModal(value) {
      // this.currentModal.visible = value;
      // this.$emit("closeUpdate");  
    },
    createContactModalShow(e,name) {
      if(name) {
        this[name]["visible"] = true;
      }else {
        this["currentModal"]["visible"] = true;
      }
    },
    followCustomer() {},
    tabChange() {},
    getDetail(params) {
      api.customerDetail(params).then(res => {
        console.log("客户详情", res);
      });
    },
    //获取服务小结
    getServiceList() {
      this.Request.post(
        "/hfw/workbench/getServiceSummary?guestId=" + this.detailId
      ).then(res => {
        console.log("服务小结", res.data.list);
        this.serviceObj.questionList = res.data.list;
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
.btn-area {
  button {
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