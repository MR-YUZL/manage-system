<template>
  <div class="session_list_l">
    <div class="list_count">会话列表 ( {{this.penddingList.length + this.endList.length}} )</div>
    <div class="list_inf scroll">
      <session-item :conversation="item" v-for="item in penddingList" :key="item.conversationID" />
      <div class="separate">
        <div></div>以下的会话已结束
        <div></div>
      </div>
      <session-item :conversation="item" v-for="item in endList" :key="item.conversationID" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sessionItem from "./sessionItem";
import moment from "moment";
export default {
  data: () => ({
    list: [
    ],
    penddingList: [],
    endList: [],
    timer: null
  }),
  components: {
    sessionItem
  },
  mounted() {
    // console.log(this.conversationList)
    // this.getSessionList();
  },
  methods: {
    moment,

    getIsSDKReady() {
      if (this.penddingList && this.penddingList.length) {
        this.isCheckouting = true;
        this.$store
          .dispatch("checkoutConversation", this.penddingList[0].conversationID)
          .then(() => {
            this.isCheckouting = false;
          })
          .catch(() => {
            this.isCheckouting = false;
          });
        let obj = {
          guestId: this.penddingList[0].guestId,
          beginTime: moment(this.penddingList[0].beginTime).valueOf() / 1000,
          guestName: this.penddingList[0].guestName,
          endTime: moment(this.penddingList[0].endTime).valueOf() / 1000
        };

        this.$store.commit("getVisitorInf", obj);
      } else if (this.endList && this.endList.length) {
        this.isCheckouting = true;
        this.$store
          .dispatch("checkoutConversation", this.endList[0].conversationID)
          .then(() => {
            this.isCheckouting = false;
          })
          .catch(() => {
            this.isCheckouting = false;
          });
        let obj = {
          guestId: this.endList[0].guestId,
          guestName: this.endList[0].guestName,
          beginTime: moment(this.endList[0].beginTime).valueOf() / 1000,
          endTime: moment(this.endList[0].endTime).valueOf() / 1000
        };
        this.$store.commit("getVisitorInf", obj);
      }
    },
    //获取会话列表
    getSessionList() {
      this.Request.get("/session/guest/my/all/list").then(res => {
        if (res.data.status) {
          this.list = res.data.list;
          this.penddingList = [];
          this.endList = [];
          this.list.map(item => {
            this.conversationList.map(val => {
              if (item.guestImAccount == val.userProfile.userID) {
                let obj = {
                  ...item,
                  ...val
                };

                if (item.endTime) {
                  this.endList.push(obj);
                } else {
                  this.penddingList.push(obj);
                }
              }
            });
          });
          this.getIsSDKReady();
          this.timeoutHandler();
        }
        // console.log("会话列表", res.data);
      });
    },
    //检测列表数据变化
    testList() {
      console.log(this.messageList)
      this.messageList.forEach((item, i) => {
       
       if (item.type == "TIMCustomElem") {
            item.payload.data =
              typeof item.payload.data == "string"
                ? JSON.parse(item.payload.data)
                : item.payload.data;
        }
        if (
          item.type == "TIMCustomElem" &&
          item.payload.data.subMsgType == "createsession"
        ) {
          //创建新会话
          //从已结束会话中查找，确定是否有已结束的会话重新启用
          if (this.endList && this.endList.length) {
            this.endList.forEach((val, index) => {
              if (val.guestImAccount == item.from) {
                this.endList.splice(index, 1);
              }
            });
          }
          console.log('fasdfsafdsaf')
          this.Request.get("/guest/session/question/list", {
            guestId: item.guestImAccount
          }).then(res => {
            if (res.data.status) {
              let obj = { ...item, ...res.data.sessionInfo };
              console.log(obj,this.penddingList)
              this.penddingList = [obj,...this.penddingList];
              console.log(this.penddingList)
            }
          });
        } else if (
          item.type == "TIMCustomElem" &&
          (item.payload.data.subMsgType == "stopsession" ||
            item.payload.data.subMsgType == "transfer")
        ) {
          //转接或结束会话

          //正在进行的会话设置为已结束的会话
          this.penddingList.forEach((val, index) => {
            if (val.guestImAccount == item.from) {
              this.penddingList.splice(index, 1);
              let data = { ...val };

              data["endTime"] = moment().format("X");

              this.endList = [data, ...this.endList];

              let status =
                item.payload.data.subMsgType == "stopsession" ? 0 : 1;
              this.endSession(item.id, status);
            }
          });
        } else {
          this.penddingList.forEach((val, index) => {
            if (val.guestImAccount == item.from) {
              this.penddingList.splice(index, 1);
              let data = { ...val };

              if (val.payload.data.sendType == "manual") {
                //手动消息需重新计时最后一条消息时间
                data["guestLastMsgTime"] = moment().format("X");
              }
              this.penddingList = [data, ...this.penddingList];
              console.log(this.penddingList)
            }
          });
        }
        if (this.visitorInf.guestId == item.from) {
          let obj = {
            guestId: item.guestId,
            beginTime: item.beginTime,
            guestName: item.guestName,
            endTime: item.endTime
          };

          this.$store.commit("getVisitorInf", obj);
        }
      });
      this.timeoutHandler();
    },
    //结束会话
    endSession(sessionId, endWay) {
      let params = {
        sessionId,
        endWay
      };
      this.Request.get("/session/end", params).then(res => {
        // console.log("会话列表", res.data);
      });
    },

    //超时处理
    timeoutHandler() {
      clearInterval(this.timer);
      let date = moment().format("X");
      this.timer = setInterval(() => {
        this.penddingList.map((item, index) => {
          if (moment().format("X") - (item.latestVisitorMsgTime/ 1000) > 5 * 60) {
            this.penddingList.splice(index, 1);
            let data = { ...item };

            data["endTime"] = moment().format('YYYY-MM-DD HH:mm:ss');;

            this.endList = [...this.endList, data];
            if (
              this.visitorInf &&
              (this.visitorInf.guestId == item.guestId ||
                this.visitorInf.guestId == item.from)
            ) {
              let obj = {
                guestId: data.guestId,
                beginTime: data.beginTime,
                guestName: data.guestName,
                endTime: data.endTime
              };

              this.$store.commit("getVisitorInf", obj);
            }
            this.endSession(item.id, 2);
          }
        });

        if (!this.penddingList.length) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    getGuestInf(guestId) {}
  },
  watch: {
    isSDKReady(a, b) {
      console.log(a, b);
      if (a) {
        // this.getIsSDKReady();
        this.getSessionList();
      }
    },
   
    messageList(a, b) {
      console.log(a,b)
      if (a && a.length) {
        this.testList();
      }
    }
   
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      isSDKReady: state => state.user.isSDKReady,
      visitorInf: state => state.basic.visitorInf,
      messageList: state => state.conversation.messageList
    })
   
  }
};
</script>
<style lang="less" scoped>
.session_list_l {
  .list_count {
    line-height: 45px;
    padding-left: 15px;
    color: #000000;
    border-bottom: 1px solid #e7e7e8;
    border-top: 1px solid #e7e7e8;
    border-left: 1px solid #e7e7e8;
  }
  .list_inf {
    // height: calc(100vh - 85px);
    height: calc(100% - 47px);
    overflow-y: auto;
    overflow-x: hidden;
    .separate {
      text-align: center;
      font-size: 12px;
      color: #b1b1b1;
      display: flex;
      align-items: center;
      & > div {
        width: 80px;
        height: 1px;
        margin: 0 10px;
        border-top: 1px solid #b1b1b1;
      }
    }
  }
}
</style>
