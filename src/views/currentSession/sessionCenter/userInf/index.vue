<template>
  <div class="userInf">
    <div class="content">
      <div class="left">
        <img
          :src="
            visitorInf.channelType == 0
              ? require('./../../../../assets/imgs/current_session/pc.png')
              : visitorInf.channelType == 1
              ? require('./../../../../assets/imgs/current_session/official.png')
              : visitorInf.channelType == 2
              ? require('./../../../../assets/imgs/current_session/applet.png')
              : visitorInf.channelType == 3
              ? require('./../../../../assets/imgs/current_session/applet.png')
              : visitorInf.channelType == 4
              ? require('./../../../../assets/imgs/current_session/app.png')
              : visitorInf.channelType == 5
              ? require('./../../../../assets/imgs/current_session/app.png')
              : visitorInf.channelType == 6
              ? require('./../../../../assets/imgs/current_session/weixin.png')
              : ''
          "
          alt
        />
        <div class="user" @click="userInf">
          <div class="name">
            {{ this.visitorInf.guestName }}
            <a-icon :type="isShow ? 'down' : 'up'" class="icon" />
          </div>
          <span></span>
        </div>
        <div class="time">当前会话时长：{{ time }}</div>
      </div>

      <div class="right">
        <span @click="transfer" v-if="visitorInf.status">转接</span>
        <span @click="newAddOrder">新增工单</span>
        <span @click="endServer" v-if="visitorInf.status">结束服务</span>
      </div>
    </div>
    <div v-if="isShow" class="information">
      <visitor-info :guestId="this.visitorInf.guestId" :page="page" />
      <Tags :guestId="this.visitorInf.guestId" />
    </div>
    <Modal
      :currentModal="currentModal"
      @toggleModal="toggleModal"
      v-if="currentModal.visible"
    >
      <template slot="content">
        <base-form
          :formObject="currentModal"
          @toggleModal="toggleModal"
          @formSubmit="formSubmit"
          v-if="currentModal.visible"
        />
      </template>
    </Modal>
    <createOrder
      :createdWorkOrderVisible="createdWorkOrderVisible"
      :orderInfo="orderInfo"
      v-if="createdWorkOrderVisible"
      @newOrder="newOrder"
    />
  </div>
</template>

<script>
import VisitorInfo from "./../../../../components/userInf/VisitorInfo";
import Tags from "./../../../../components/userInf/Tags";
import createOrder from "./../../../../components/userInf/CreateOrder";
import Modal from "./../../../../components/Modal";
import baseForm from "./../../../../components/BaseForm/BaseFrom";
import { mapState } from "vuex";
import moment from "moment";
export default {
  data: () => ({
    page: "session",
    isShow: false,
    visitorInfoData: "",
    createdWorkOrderVisible: false,
    orderInfo: {},
    serviceAcc: "", //客服账号
    arr: [],
    relateRedio: [], // 关联客户rediolist
    selectTagList: [],
    tagsList: [],
    currentModal: {},
    time: "00分00秒",
    timer: null,
    endServerObj: {
      title: "结束服务",
      visible: false,
      ref: "endServer",
      type: "modalForm",
      modelList: [
        {
          type: "cascader",
          ruleName: "cascader",
          label: "咨询分类",
          placeholder: "请选择",
          model: undefined,
          ruleName: "consultId",
          fieldNames: { label: "name", value: "id", children: "childrens" },
          options: [],
          rules: {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        },
        {
          type: "select",
          label: "问题解决",
          placeholder: "请选择",
          model: undefined,
          ruleName: "status",
          options: [
            { key: "1", value: "已解决" },
            { key: "0", value: "未解决" }
          ],
          rules: {
            required: true,
            message: "请选择问题解决",
            trigger: "change"
          }
        },
        {
          type: "textarea",
          label: "咨询备注",
          model: "",
          ruleName: "advisoryRemark"
        }
      ]
    },

    transferObj: {
      title: "转接",
      visible: false,
      ref: "transfer",
      type: "modalForm",
      width: "500px",

      modelList: [
        {
          type: "cascader",
          label: "指定客服人员",
          placeholder: "请选择",
          model: undefined,
          ruleName: "receiverGroupId", //receiverGroupId 工单受理组id
          options: [],
          fieldNames: { label: "text", value: "id", children: "children" },
          rules: {
            required: true,
            message: "请指定客服人员",
            trigger: "change"
          }
        }
      ]
    }
  }),
  components: {
    VisitorInfo,
    Tags,
    Modal,
    baseForm,
    createOrder
    // AccessInfo,
    // orderInf,
    // ServiceSummary
  },
  mounted() {
    this.getSummarySort();
  },
  methods: {
    moment,
    userInf() {
      this.isShow = !this.isShow;
    },

    //新增工单
    newAddOrder() {
      console.log(this.visitorInf.channelType);
      this.createdWorkOrderVisible = true;
      this.orderInfo = {
        userType: 1,
        customerId: this.visitorInf.guestId
      };
    },
    newOrder(e) {
      this.createdWorkOrderVisible = e;
    },
    toggleModal(data) {
      console.log(data);
      this.currentModal = {};
      switch (data.ref) {
        case "transfer":
          this["transferObj"]["visible"] = data.visible;
          break;
        case "endServer":
          this["endServerObj"]["visible"] = data.visible;
          break;
      }
    },
    formSubmit(data) {
      this.currentModal = {};
      let url = "";
      let obj = data.obj;
      switch (data.ref) {
        case "transfer":
          this["transferObj"]["visible"] = data.visible;
          obj = {
            serviceAcc: obj.receiverGroupId[obj.receiverGroupId.length - 1],
            sessionId: this.visitorInf.id
          };
          url = "/session/transfer/to";
          break;
        case "endServer":
          this["endServerObj"]["visible"] = data.visible;
          let [firstConsultId, secondConsultId, threeConsultId] = obj.consultId;

          delete obj.consuleId;
          obj = {
            sessionId: this.visitorInf.id,
            status: obj.status,
            advisoryRemark: obj.advisoryRemark,
            endWay: 0
          };
          obj.firstConsultId = firstConsultId;
          obj.secondConsultId = secondConsultId;
          obj.threeConsultId = threeConsultId;

          url = "/session/end";
          let obj1 = {
            guestId: this.visitorInf.guestId,
            guestName: this.visitorInf.guestName,
            id: this.visitorInf.id,
            beginTime: this.visitorInf.beginTime,
            endTime: moment().format("X"),
            status: false,
            orgId: this.visitorInf.orgId,
            guestImAccount: this.visitorInf.guestImAccount,
            channelType: this.visitorInf.channelType
          };

          this.$store.commit("getVisitorInf", obj1);
          break;
      }

      this.Request.get(url, obj).then(res => {
        if (res.data.status) {
          this.$message.success("操作成功！");
        }
      });
    },
    //转接
    async transfer() {
      let obj = {
        sessionId: this.visitorInf.id
      };
      let result = await this.Request.get(
        "/session/transfer/service/acc/search",
        obj
      );
      if (result.data.status) {
        if (result.data.list.length) {
          this.getCustomer();
          this["transferObj"]["visible"] = true;
          this.currentModal = this.transferObj;
        } else {
          this.$message.warning("当前没有其他客服在线，无法转接！");
        }
      } else {
        this.$message.warning(result.data.msg);
      }
    },

    //获取客服列表
    getCustomer() {
      this.Request.get("/session/transfer/tree/info").then(res => {
        let re = res.data;
        if (re.status) {
          // let result = this.recursion(re.list)
          this.transferObj.modelList[0].options = re.list;
        }
      });
    },
    //递归客户列表
    recursion(list, index) {
      // console.log(list)
      let arr = list;
      let obj = {};
      list.map((item, index) => {
        if (item.state == "closed") {
          item.value = item.id;
          item.label = item.text;
          delete item.id;
          delete item.text;

          this.recursion(item.children, index);
        } else {
          item.value = item.id;
          item.label = item.text;
          delete item.id;
          delete item.text;
        }
      });
      return arr;
    },
    //结束服务
    endServer() {
      this.endServerObj.visible = true;
      this.currentModal = this.endServerObj;
    },
    getSummarySort() {
      this.Request.get("/hfw/workbench/getSummarySort").then(res => {
        let re = res.data;
        if (re.status) {
          let treeChangeData = this.treeChangeData(re.list)
          this.endServerObj["modelList"][0]["options"] = treeChangeData;
        }
      });
    },
    treeChangeData(array) {
      array.map(item => {
        item["value"] = item.id;
        item["label"] = item.name;
        item["childrens"] = item.childrens;
        if (item.childrens.length > 0) {
          this.treeChangeData(item.childrens);
        }
      });
      return array;
    },
    //将秒转化为时分秒
    formateSeconds(endTime) {
      let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
      let min = 0; // 初始化分
      let h = 0; // 初始化小时
      let result = "";
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
        if (min > 60) {
          //如果分钟大于60，将分钟转换成小时
          h = parseInt(min / 60); //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60); //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      if (h.toString().padStart(2, "0") == "00") {
        result = `${min
          .toString()
          .padStart(2, "0")}分${secondTime.toString().padStart(2, "0")}秒`;
      } else {
        result = `${h.toString().padStart(2, "0")}时${min
          .toString()
          .padStart(2, "0")}分${secondTime.toString().padStart(2, "0")}秒`;
      }

      return result;
    }
  },
  watch: {
    sessionDuration(a, b) {}
  },
  computed: {
    ...mapState({
      visitorInf: state => state.basic.visitorInf
    }),
    sessionDuration: function() {
      clearInterval(this.timer);
      // let date = moment().format("X") - this.visitorInf.beginTime;
      if (this.visitorInf.endTime) {
        console.log(this.visitorInf.endTime, this.visitorInf.beginTime);
        let date = this.visitorInf.endTime - this.visitorInf.beginTime;
        this.time = this.formateSeconds(date);
      } else if (this.visitorInf.beginTime) {
        // console.log(moment().format("X"),this.visitorInf.beginTime,moment().format("X") - this.visitorInf.beginTime)
        this.timer = setInterval(() => {
          let date = moment().format("X") - this.visitorInf.beginTime;
          this.time = this.formateSeconds(date);
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.userInf {
  .content {
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #e7e7e8;
    padding: 0 0 0 10px;
    background: #ffffff;
    .left {
      width: calc(100% - 200px);
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
      }
      .user {
        display: flex;
        align-items: center;
        width: calc(100% - 450px);
        max-width: 120px;
        min-width: 30px;
        position: relative;
        cursor: pointer;
        .name {
          min-width: 20px;
          overflow: hidden;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          // position: absolute;
          .icon {
            position: absolute;
            top: 15px;
            padding-left: 10px;
            right: -10px;
          }
        }
      }

      .time {
        margin-left: 20%;
        white-space: nowrap;
      }
    }
    .right {
      span {
        margin: 0 10px;
        color: #3e7bf8;
        border-bottom: 1px solid #3e7bf8;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
  .information {
    position: relative;
    z-index: 10;
    background: white;
    padding-bottom: 20px;
    box-shadow: 0 5px 10px rgba(51, 51, 51, 0.25);
  }
}
</style>
