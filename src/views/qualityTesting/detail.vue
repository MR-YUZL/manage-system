<template>
  <a-modal title="记录" :footer="null" width="880px" :visible="detailShow" @cancel="handleCancel">
    <div class="record-detail">
      <div class="message">
        <div class="d-head">
          <h5>质检详情</h5>
        </div>
        <!-- <a-form-model v-if="type==1" ref="qualityForm" v-bind="formItemLayout" :model="qualityForm">
          <a-form-model-item label="主叫号码">
            <p>{{qualityForm.caller}}</p>
          </a-form-model-item>
          <a-form-model-item label="被叫号码">
            <p>{{qualityForm.called}}</p>
          </a-form-model-item>
          <a-form-model-item label="通话类型">
            <p>{{qualityForm.callType}}</p>
          </a-form-model-item>
          <a-form-model-item label="归属地">
            <p>{{qualityForm.attribution}}</p>
          </a-form-model-item>
          <a-form-model-item label="时间">
            <p>{{qualityForm.callDate}}</p>
          </a-form-model-item>
          <a-form-model-item label="客服">
            <p>{{qualityForm.serviceName}}</p>
          </a-form-model-item>
          <a-form-model-item label="所属客服组">
            <p>{{qualityForm.skillName}}</p>
          </a-form-model-item>
          <a-form-model-item label="通话时长">
            <p>{{qualityForm.callLength}}</p>
          </a-form-model-item>
          <a-form-model-item label="挂断原因">
            <p>{{qualityForm.hangUpType}}</p>
          </a-form-model-item>
          <a-form-model-item label="通话录音">
            <a-button block>播放</a-button>
          </a-form-model-item>
          <a-form-model-item label="咨询分类">
            <a-cascader :options="referOptions" placeholder="请选择" />
          </a-form-model-item>
          <a-form-model-item label="问题解决">
            <a-select placeholder="请选择" v-model="qualityForm.solveStatus">
              <a-select-option value="1">已解决</a-select-option>
              <a-select-option value="0">未解决</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="备注" prop>
            <a-input type="textarea" :maxLength="200" v-model="qualityForm.consuleRemark"  />
          </a-form-model-item>
          <a-form-model-item>
            <a-button style="margin-left: 10px;" @click="onSubmit">保存</a-button>
          </a-form-model-item>
        </a-form-model>-->
        <div v-if="type==1">
          <BaseForm
            :formObject="defaultObject"
            @toggleModal="toggleModal"
            @formSubmit="calledSubmit"
          />
        </div>
        <div v-if="type==0">
          <BaseForm
            :formObject="sessionObject"
            @toggleModal="toggleModal"
            @formSubmit="sessionSubmit"
          />
          <div class="customerGrading">客户评级:满意</div>
          <div class="sessionCard">
            <dl>
              <dt>
                <img src alt />
              </dt>
              <dd>
                <span>您好，我有事要咨询</span>
                <span>08-02 14:30</span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="information">
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="质检评分">
            <Grade :qcObj="qualityForm" v-if="qualityForm" />
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
            ruleName: "hangUpType"
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
        ]
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
            ruleName: "receiverGroupId",
            options: [],
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
            ruleName: "receiverGroupId",
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
            ruleName: "receiverGroupId"
          }
        ]
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
    this.getDetailInfo({ id: this.qcId });
    this.getReferClassify();
  },
  methods: {
    getDetailInfo(params) {
      api.QcDetail(params).then(res => {
        console.log("质检详情info+++++++++++", res);
        if (res.data.status) {
          this.qualityForm = res.data.data;
          this.defaultObject.modelList.map(v => {
            if (v.type == "defaultText") {
              v.value = res.data.data[v.ruleName];
            }
          });
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
    calledSubmit(values){
      console.log(values)
      // api.saveServiceSummary().then(res=>{

      // })
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