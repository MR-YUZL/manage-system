<template>
  <div class="">
    <Modal :currentModal="workOrderDetail" v-if="workOrderDetail.visible" @toggleModal="detailToggleModal">
      <div slot="content">
        <div class="workOrderDetail">
          <div class="left">
            <ReplyWorkOrder
              :workOrderId="workOrderId"
              :orderInfo="info"
              @updataOrderRecord="updataOrderRecord"
              @updataWorkOrderDetails="getWorkOrderDetails"
              :receiverAcc="formObject.modelList[0].options"
              :receiverGroupId="formObject.modelList[1].options"
            ></ReplyWorkOrder>
            <RecordList
              ref="RecordList"
              :workOrderId="workOrderId"
            ></RecordList>
          </div>
          <div class="right">
            <WorkOrderProper
              :workOrderId="workOrderId"
              :orderInfo="info"
            ></WorkOrderProper>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal/index";
import BaseForm from "@/components/BaseForm/index";
import ReplyWorkOrder from "@/views/workOrder/ReplyWorkOrder";
import RecordList from "@/views/workOrder/RecordList";
import WorkOrderProper from "@/views/workOrder/WorkOrderProper";
import { mapState } from "vuex";
export default {
  name: "worlOrder",
  components: {
    Modal,
    BaseForm,
    ReplyWorkOrder,
    RecordList,
    WorkOrderProper
  },
  props: ["detailId"],
  data() {
    return {
      closeOrderRemark: "",
      batchRestartValue: "",
      searchField: {},
      pager: {},
      selectedRowKeys: [],
      batchTaransParams: {},
      workOrderId: "",
      classifyList: [], //分类列表
      info: {},
      workOrderDetail: {
        width: "70%",
        visible: false,
        title: "工单详情"
      },
      formObject: {
        type: "modalForm",
        ref: "testModal",
        sureBtn: "确定",
        defaultValues: {},
        modelList: [
          {
            type: "select",
            label: "工单受理组",
            placeholder: "请选择",
            ruleName: "receiverGroupId",
            options: [],
            rules: [
              {
                required: true,
                message: "请选择",
                trigger: "change"
              }
            ]
          },
          {
            type: "select",
            label: "工单受理人",
            placeholder: "请选择",
            ruleName: "receiverAcc",
            options: [],
            rules: {
              required: true,
              message: "请选择",
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "备注",
            placeholder: "请输入备注内容",
            ruleName: "remark",
            maxLength: 200
          }
        ]
      }
      // formFieldsDefaultCum:{}  // 自定义字段默认值
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.workOrderDetailModal(this.detailId);
  },
  watch:{
    detailId(newVal){
      this.workOrderDetailModal(newVal);
    }
  },
  methods: {
    detailToggleModal(){
      this.workOrderDetail.visible = false;
      this.$emit('clearIdFn')
    },
    // 获取工单信息
    getWorkOrderDetails() {
      let params = {
        id: this.workOrderId
      };
      this.Request.get("/workflow/infoJson", params).then(res => {
        this.info = res.data.data;
      });
      this.$forceUpdate();
    },

    //工单详情
    workOrderDetailModal(id) {
      this.workOrderDetail.visible = true;
      this.workOrderId = id;
      this.getWorkOrderDetails();
    },

    // 更新工单记录
    updataOrderRecord() {
      this.$refs.RecordList.getAllList();
    }
  }
};
</script>

<style lang="less" scoped>
.workOrder {
  padding: 10px;
  .flex-between {
    margin: 30px 0 10px;
    button {
      margin-right: 10px;
    }
  }
}
.creatOrder_text {
  margin-bottom: 15px;
  padding: 8px;
  text-align: center;
  border: 1px solid #3e7bf8;
  color: #3e7bf8;
}
.workOrderDetail {
  display: flex;
  .left {
    width: 50%;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    padding-right: 10px;
  }
  .right {
    width: 50%;
  }
}
</style>
