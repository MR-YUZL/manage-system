<template>
  <a-modal title="记录" :footer="null" width="880px" :visible="detailShow" @cancel="handleCancel">
    <div class="record-detail">
      <div class="message">
        <div class="d-head">
          <h5>质检详情</h5>
        </div>

        <div class="calledLeft">
          <BaseForm
            :formObject="sessionObject"
            @toggleModal="toggleModal"
            @formSubmit="sessionSubmit"
          />
          <div class="customerGrading">客户评级:{{appraiseValue}}</div>
          <div style="width:355px">
            <HistoryList style="position:relative;top:0;background-color:#fff" :sessionInf="sessionInf" v-if="JSON.stringify(sessionInf) != '{}'" />
          </div>
          <!-- <div class="sessionCard">
            <dl>
              <dt>
                <img src alt />
              </dt>
              <dd>
                <span>您好，我有事要咨询</span>
                <span>08-02 14:30</span>
              </dd>
            </dl>
          </div> -->
        </div>
      </div>
      <div class="information">
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="质检评分">
            <Grade :qualityType="qualityType" :qcObj="qualityForm" v-if="JSON.stringify(qualityForm) != '{}'" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="用户信息">
            <UserInformation :guestId="guestId" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script>
import moment from "moment";
import api from "@/api/customerCenter";
import UserInformation from "@/components/userInf";
import Grade from "@/views/qualityTesting/grade";
import BaseForm from "@/components/BaseForm";
import HistoryList from '@/components/historyMessage/historyList'
export default {
  data() {
    return {
      sessionInf:{},
      qualityType:'session',
      guestId: "",
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      qualityForm: {},
      detailShow: this.detailsShow,
      referOptions: [],
      formAxiosReturnValues: {
        id: "id_123",
        test: "hello"
      },

      sessionObject: {
        ref: "testModal",
        sureBtn: "保存",
        modelList: [
          {
            type: "cascader",
            label: "咨询分类",
            placeholder: "请选择",
            model: undefined,
            ruleName: "consuleId",
            options: [],
            fieldNames: { label: "name", value: "id", children: "childrens" },
            rules: {
              required: true,
              message: "请选择咨询分类",
              trigger: "change"
            }
          },
          {
            type: "select",
            label: "解决问题",
            placeholder: "请选择",
            model: undefined,
            ruleName: "solveStatus",
            options: [
              { key: "1", value: "已解决" },
              { key: "2", value: "未解决" }
            ],
            rules: {
              required: true,
              message: "请选择咨询分类",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "咨询备注",
            placeholder: "请选择",
            model: undefined,
            ruleName: "consuleRemark"
          }
        ],
        defaultValues: {}
      }
    };
  },
  computed:{
    appraiseValue(){
      let obj = {
        '0':'不太满意',
        '1':'一般满意',
        '2':'满意',
        '3':'很满意',
        '4':'非常满意',
      }
      return obj[this.qualityForm.appraiseValue]
    }
  },
  props: {
    detailsShow: Boolean,
    qcId: String,
    type: Number
  },
  components: {
    UserInformation,
    Grade,
    BaseForm,
    HistoryList
  },
  watch: {
    detailsShow(val) {
      this.detailShow = val;
    }
  },
  mounted() {
    this.getDetailInfo();
    this.getReferClassify();
    // console.log(this.qualityForm.session.appraiseValue,'1411')
  },
  methods: {
    getDetailInfo() {
      api.sessionDetail({ sessionId: this.qcId }).then(res => {
        console.log("会话质检的详情", res);
        if (res.data.status) {
          this.qualityForm = res.data;
          this.guestId = res.data.session.guestId;
          let data = res.data.session;
          console.log(res.data.session,'res.data.session')
          this.sessionInf = {
            orgId:data.orgId,
            sessionId:data.id,
            msgTimeEnd:data.endTime?moment(data.endTime).format("YYYY-MM-DD HH:mm:ss.SSS"):'',
            type:1,
            // serviceImAccount:data.serviceImAccount
          }
        }
      });
    },
    getReferClassify() {
      api.referClassify().then(res => {
        console.log("咨询分类", res);
        if (res.data.status) {
          this.sessionObject.modelList[0].options = res.data.list;
        }
      });
    },
    calledSubmit(values) {
      api.saveServiceSummary({ ...values }).then(res => {
        console.log(res, "保存通话检测详情左侧");
        if (res.data.status) {
          this.$message.success("保存成功");
        }
      });
    },
    toggleModal() {},
    sessionSubmit(values) {
      api.saveServiceSummary({ ...values }).then(res => {
        console.log(res, "保存会话检测详情左侧");
        if (res.data.status) {
          this.$message.success("保存成功");
        }
      });
    },
    tabChange() {},
    onSubmit() {},
    handleCancel() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style lang="less" scoped>
.record-detail {
  display: flex;
  .message {
    width: 380px;
    border-right: 1px solid #e6e6e6;
    .ant-form-item {
      margin-bottom: 0;
    }
    .d-head {
      display: flex;
      justify-content: space-between;
      h5,
      p {
        font-size: 16px;
        color: #353535;
      }
    }
    .calledLeft {
      /deep/button {
        margin-right: 20px;
      }
    }
  }
  .information {
    margin-left: 48px;
    width: 384px;
  }
}
.customerGrading {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin: 0 20px 20px 0;
}
.sessionCard {
  dl {
    display: flex;
    margin-right: 20px;
    dt {
      width: 30px;
      height: 30px;
    }
    dd {
      flex: 1;
      span {
        display: block;
      }
    }
  }
}
</style>