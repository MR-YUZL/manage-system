<template>
  <a-modal title="记录" :footer="null" width="880px" :visible="detailShow" @cancel="handleCancel">
    <div class="record-detail">
      <div class="message">
        <div class="d-head">
          <h5>质检详情</h5>
        </div>

        <div class="calledLeft">
          <BaseForm
            :formObject="defaultObject"
            @toggleModal="toggleModal"
            @formSubmit="calledSubmit"
          />
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
import api from "@/api/customerCenter";
import UserInformation from "@/components/userInf";
import Grade from "@/views/qualityTesting/grade";
import BaseForm from "@/components/BaseForm";
export default {
  data() {
    return {
      qualityType:'conversation',
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
      defaultObject: {
        ref: "callForm",
        sureBtn: "保存",
        modelList: [
          {
            type: "defaultText",
            label: "主叫号码",
            value: "",
            ruleName: "caller"
          },
          {
            type: "defaultText",
            label: "被叫号码",
            value: "",
            ruleName: "called"
          },
          {
            type: "defaultText",
            label: "通话类型",
            value: "",
            ruleName: "callType"
          },
          {
            type: "defaultText",
            label: "归属地",
            value: "",
            ruleName: "attribution"
          },
          {
            type: "defaultText",
            label: "时间",
            value: "",
            ruleName: "callDate"
          },
          {
            type: "defaultText",
            label: "客服",
            value: "",
            ruleName: "serviceName"
          },
          {
            type: "defaultText",
            label: "所属客服组",
            value: "",
            ruleName: "skillName"
          },
          {
            type: "defaultText",
            label: "通话时长",
            value: "",
            ruleName: "callLength"
          },
          {
            type: "defaultText",
            label: "挂断原因",
            value: "",
            ruleName: "hangUpType"
          },
          {
            type: "defaultText",
            label: "通话录音",
            value: "",
            ruleName: "callRecordUrl"
          },
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
              { key: "0", value: "未解决" }
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
  props: {
    detailsShow: Boolean,
    qcId: String,
    type: Number
  },
  components: {
    UserInformation,
    Grade,
    BaseForm
  },
  watch: {
    detailsShow(val) {
      this.detailShow = val;
    }
  },
  mounted() {
    this.getDetailInfo();
    this.getReferClassify();
  },
  methods: {
    getDetailInfo() {
      //type 1代表通话详情
      //type 0代表会话详情
      api.QcDetail({ id: this.qcId }).then(res => {
        console.log("通话质检的详情", res);
        if (res.data.status) {
          this.qualityForm = res.data.data;
          console.log(this.qualityForm,'你到底对不对')
          this.defaultObject.modelList.map(v => {
            if (v.type == "defaultText") {
              v.value = res.data.data[v.ruleName];
              if (v.ruleName == "callType") {
                v.value = v.value == 0 ? "呼入" : "呼出";
              }
              if (v.ruleName == "hangUpType") {
                switch (v.value) {
                  case "0":
                    v.value = "正常";
                    break;
                  case "1":
                    v.value = "未接通";
                    break;
                  case "2":
                    v.value = "中断放弃";
                    break;
                  case "3":
                    v.value = "振铃放弃";
                    break;
                  case "4":
                    v.value = "排队放弃";
                    break;
                }
              }
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getReferClassify() {
      api.referClassify().then(res => {
        console.log("咨询分类", res);
        if (res.data.status) {
          this.defaultObject.modelList[10].options = res.data.list;
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
    sessionSubmit() {},
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
  margin-right: 20px;
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