<template>
  <div class="sessionCenter">
    <div class="operation" v-if="status == '2' && outCallTask && outCallTask.taskStatus=='0'">
      <a-button type="primary" ghost @click="callBack">呼叫</a-button>
      <a-button type="primary" ghost @click="Rescheduling">改期</a-button>
      <a-popconfirm title="是否确认完成本次外呼任务？" ok-text="确定" cancel-text="取消" @confirm="confirm">
        <a-button type="primary" ghost>完成任务</a-button>
      </a-popconfirm>
      <a-popconfirm title="你确定要取消外呼任务吗？" ok-text="确定" cancel-text="取消" @confirm="confirm">
        <a-button type="primary" ghost>取消预约</a-button>
      </a-popconfirm>
    </div>

    <div class="operation" v-else-if="status == '1'&& callStatus && callStatus.status == 2">
      <a-button type="primary" ghost @click="callBack">回拨</a-button>
      <a-button type="primary" ghost @click="addCallTask">添加外呼任务</a-button>
    </div>
    <div class="operation" v-else-if="status == '1' && callStatus && callStatus.status == 1">
      <a-button type="primary" ghost @click="addCallTask">添加外呼任务</a-button>
      <a-button type="primary" ghost @click="newAddOrder">创建工单</a-button>
      <a-button type="primary" ghost @click="addServer">添加本次服务小结</a-button>
    </div>
    <div class="operation_null" v-else></div>
    <Modal :currentModal="transferObj" @toggleModal="toggleModal" v-if="transferObj.visible">
      <template slot="content">
        <base-form
          :formObject="transferObj"
          @toggleModal="toggleModal"
          @formSubmit="formSubmit"
          v-if="transferObj.visible"
        />
      </template>
    </Modal>

    <div class="userInf scroll" v-if="status == '1' && callStatus && callStatus.guestId" ><user-inf :guestId="callStatus.guestId" /></div>
    <div class="userInf scroll" v-else-if="status == '2' && outCallTask && outCallTask.guestId" ><user-inf :guestId="outCallTask.guestId" /></div>
    <div class="noData" v-else><img src="./.././../../../assets/imgs/noData.png" alt=""></div>
    <createOrder :createdWorkOrderVisible="createdWorkOrderVisible" v-if="createdWorkOrderVisible" @newOrder="newOrder" />
    <!-- <UserInformation  guestId="8c730589aa1d41a19d2ce8ca23f9fb1e"/> -->
  </div>
</template>

<script>
import userInf from "./../../../../components/userInf/index";
import BaseForm from "./../../../../components/BaseForm/BaseFrom";
import Modal from "./../../../../components/Modal";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
import createOrder from "./../../../../components/userInf/CreateOrder"
import moment from "moment";
import { mapState } from "vuex";
export default {
  data: () => ({
    transferObj: {},
    createdWorkOrderVisible:false,
    callTaskObj: {
      title: "添加至外呼任务",
      visible: false,
      ref: "callTask",
      type: "modalForm",
      width: "500px",
      modelList: [
        {
          type: "date",
          label: "预约时间：",
          placeholder: "请选择",
          model: undefined,
          ruleName: "appointmentsTime", //receiverGroupId 工单受理组id
          options: [],
          rules: {
            required: true,
            message: "请指定客服人员",
            trigger: "change"
          }
        },
        {
          type: "textarea",
          label: "备注",
          placeholder: "",
          model: undefined,
          ruleName: "remark" //receiverGroupId 工单受理组id
        }
      ]
    },
     reschedulingObj: {
      title: "改期",
      visible: false,
      ref: "Rescheduling",
      type: "modalForm",
      width: "500px",
      modelList: [
        {
          type: "date",
          label: "预约时间：",
          placeholder: "请选择",
          model: undefined,
          ruleName: "appointmentsTime", //receiverGroupId 工单受理组id
          options: [],
          rules: {
            required: true,
            message: "请指定客服人员",
            trigger: "change"
          }
        },
        {
          type: "textarea",
          label: "备注",
          placeholder: "",
          model: undefined,
          ruleName: "remark" //receiverGroupId 工单受理组id
        }
      ]
    },
    addServerObj: {
      title: "添加服务小结",
      visible: false,
      ref: "addServer",
      type: "modalForm",
      width: "500px",
      modelList: [
        {
          type: "cascader",
          label: "咨询分类",
          placeholder: "请选择",
          model: undefined,
          ruleName: "consuleId", //receiverGroupId 工单受理组id
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
          ruleName: "remark"
        }
      ]
    },
    callTaskObj1: {
      title: "添加至外呼任务",
      visible: false,
      ref: "transfer",
      type: "modalForm",
      modelList: [
        {
          type: "cascader",
          label: "指定客服人员",
          placeholder: "请选择",
          model: undefined,
          ruleName: "receiverGroupId", //receiverGroupId 工单受理组id
          options: [],
          rules: {
            required: true,
            message: "请指定客服人员",
            trigger: "change"
          }
        }
      ]
    },
    formObject: {
      type: "modalForm",
      ref: "testModal",
      modelList: [
        {
          type: "input",
          label: "test1",
          ruleName: "test2",
          model: "sss",
          rules: [
            {
              required: true,
              message: "Please input Activity name",
              trigger: "blur"
            }
          ]
        }
      ]
    }
  }),
  components: {
    userInf,
    BaseForm,
    Modal,
    FormModelSearchForm,
    createOrder
  },
  mounted() {},
  methods: {
    //新增工单
    newAddOrder() {
      this.createdWorkOrderVisible = true
    },
    newOrder(e){
      this.createdWorkOrderVisible = e
    },
    addCallTask() {
      this["callTaskObj"]["visible"] = true;
      this.transferObj = this.callTaskObj;
    },
    //改期
    Rescheduling(){
      this["reschedulingObj"]["visible"] = true;
      this.transferObj = this.reschedulingObj;
    },
    confirm() {
      this.Request.get("/hfw/workbench/deleteTask", {
        id: this.outCallTask.id
      }).then(res => {
        if (res.data.status) {
          this.$store.commit("getOutCallStatus");
          this.$message.success("操作成功！");
        }
      });
    },
    //添加服务小结
    async addServer() {
      let result = await this.Request.get("/hfw/workbench/getSummarySort");
      if (result.data.status) {
        this["addServerObj"]["visible"] = true;
        this.addServerObj.modelList[0].options = result.data.list;
        this.transferObj = this.addServerObj;
      }
    },
    //呼叫，回拨
    callBack() {
      console.log("呼叫，回拨");
    },
    toggleModal(data) {
      this.transferObj = {};
      switch (data.ref) {
        case "callTask":
          this["addServerObj"]["callTaskObj"] = data.visible;
          break;
        case "addServer":
          this["addServerObj"]["visible"] = data.visible;
          break;
        case 'Rescheduling':
          this["reschedulingObj"]["visible"] = data.visible  
      }
    },
    formSubmit(data) {
      console.log(data);
      this.transferObj = {};
      let url = "";
      let obj = data.obj;
      switch (data.ref) {
        case "callTask":
          this["callTaskObj"]["visible"] = data.visible;
          url = "/hfw/workbench/saveTask";
          obj.guestId = callStatus.guestId;
          obj.appointmentsTime = moment(obj.appointmentsTime).format(
            "YYYY-MM-DD HH:SS:MM"
          );
          break;
        case "addServer":
          this["addServerObj"]["visible"] = data.visible;
          let [firstConsuleId, secondConsuleId, threeConsuleId] = obj.consuleId;
          obj.firstConsuleId = firstConsuleId;
          obj.secondConsuleId = secondConsuleId;
          obj.threeConsuleId = threeConsuleId;
          delete obj.consuleId;
          obj.guestId = callStatus.guestId;
          obj.id = callStatus.id;
          obj.callId = callStatus.callId;
          obj.sessionId = callStatus.sessionId;
          url = "/hfw/workbench/saveServiceSummary";
          break;
        case 'Rescheduling':
      
          obj.appointmentsTime = moment(obj.appointmentsTime).format(
            "YYYY-MM-DD HH:SS:MM"
          );
          
          this["reschedulingObj"]["visible"] = data.visible
          obj.id = this.outCallTask ? this.outCallTask.id :''
          url = "/hfw/workbench/updateCallOutTime"  
      }
      
      console.log(obj);
      this.Request.post(url, obj).then(res => {
        if (res.data.status) {
          this.$message.success("操作成功！");
        }
      });
    }
  },
  watch: {},
  computed: {
    ...mapState({
      status: state => state.basic.status,
      callStatus: state => state.basic.callStatus,
      outCallTask: state => state.basic.outCallTask
    })
  }
};
</script>
<style lang="less" scoped>
.sessionCenter {
  background: #f5f5f5;
  .operation {
    border-top: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    background: #ffffff;
    line-height: 43px;
    text-align: right;
    padding: 0 15px;
    .ant-btn {
      min-width: 85px;
      margin: 0 10px;
    }
  }
  .operation_null {
    height: 43px;
    border-top: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    background: #ffffff;
  }
  .userInf{
    height: calc(100% - 44px);
    overflow-y: auto;
  }
  .noData{
    text-align: center;
  }
}
</style>
