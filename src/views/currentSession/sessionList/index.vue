<template>
  <div class="session_list_l">
    <div class="list_count">
      会话列表 ( {{ this.penddingList.length + this.endList.length }} )
    </div>
    <div class="list_inf scroll">
      <session-item
        :conversation="item"
        v-for="item in penddingList"
        :key="item.conversationID"
        @selectObj="selectObj"
      />
      <div class="separate" v-if="endList.length">
        <div></div>
        以下的会话已结束
        <div></div>
      </div>
      <session-item
        :conversation="item"
        v-for="item in endList"
        :key="item.conversationID"
        @selectObj="selectObj"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteHistory } from "@/utils/index";
import sessionItem from "./sessionItem";
import moment from "moment";
export default {
  data: () => ({
    list: [],
    penddingList: [],
    endList: [],
    timer: null,
    imStatus: false,
    readyOk: false,
    chatList: []
  }),
  components: {
    sessionItem
  },
  props: ["sessionList"],
  mounted() {
    this.$bus.$on("currentUnreadCount", this.currentUnreadCount);
  },
  methods: {
    moment,
   
    currentUnreadCount(selectId) {
      console.log(selectId);
      for (let i = 0; i < this.penddingList.length; i++) {
        if (this.penddingList[i].conversationID == selectId) {
          this.penddingList[i].unreadCount = 0;
          return;
        }
      }
      for (let i = 0; i < this.endList.length; i++) {
        if (this.endList[i].conversationID == selectId) {
          this.endList[i].unreadCount = 0;
          return;
        }
      }
    },
    selectObj(selectObj) {
      for (let i = 0; i < this.penddingList.length; i++) {
        if (
          this.penddingList[i].conversationID == selectObj.previous ||
          this.penddingList[i].conversationID == selectObj.selectId
        ) {
          this.penddingList[i].unreadCount = 0;
          // return;
        }
      }
      for (let i = 0; i < this.endList.length; i++) {
        if (
          this.endList[i].conversationID == selectObj.previous ||
          this.endList[i].conversationID == selectObj.selectId
        ) {
          this.endList[i].unreadCount = 0;
          // return;
        }
      }
    },
    getIsSDKReady() {
      if (this.penddingList && this.penddingList.length) {
        console.log(this.penddingList)
        this.isCheckouting = true;
        let params = {
          orgId: this.penddingList[0].orgId,
          visitorAccount: this.penddingList[0].guestImAccount,
          msgTimeEnd: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          pageSize: 20
        };

        this.Request.get("/session/chat/record/search", params).then(res => {
          if (res.data.status) {
            let data = res.data;
            let list = [...data.list];
            let arr = deleteHistory(list, this.imInfo.userID);
            this.$store.commit("getSelectStatus", true);
            this.$store.commit("getHistoryList", arr);
            this.$store
              .dispatch(
                "checkoutConversation",
                this.penddingList[0].conversationID
              )
              .then(() => {
                this.isCheckouting = false;
              })
              .catch(() => {
                this.isCheckouting = false;
              });
            let obj = {
              guestId: this.penddingList[0].guestId,
              id: this.penddingList[0].id,
              beginTime:
                moment(this.penddingList[0].beginTime).valueOf() / 1000,
              guestName: this.penddingList[0].guestName,
              endTime: moment(this.penddingList[0].endTime).valueOf() / 1000,
              status: true,
              orgId: this.penddingList[0].orgId,
              guestImAccount: this.penddingList[0].guestImAccount
            };
            console.log(obj, "初始化");
            this.$store.commit("getVisitorInf", obj);
            this.penddingList[0].unreadCount = 0;
          }
        });
      } else if (this.endList && this.endList.length) {
        this.isCheckouting = true;
        let params = {
          orgId: this.endList[0].orgId,
          visitorAccount: this.endList[0].guestImAccount,
          msgTimeEnd: moment(this.endList[0].endTime).format(
            "YYYY-MM-DD HH:mm:ss.SSS"
          ),
          pageSize: 20
        };

        this.Request.get("/session/chat/record/search", params).then(res => {
          if (res.data.status) {
            let data = res.data;
            let list = [...data.list];
            let arr = deleteHistory(list, this.imInfo.userID);
            this.$store.commit("getSelectStatus", true);
            this.$store.commit("getHistoryList", arr);
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
              id: this.endList[0].id,
              guestName: this.endList[0].guestName,
              beginTime: moment(this.endList[0].beginTime).valueOf() / 1000,
              endTime: moment(this.endList[0].endTime).valueOf() / 1000,
              status: false,
              orgId: this.endList[0].orgId,
              guestImAccount: this.endList[0].guestImAccount
            };
            console.log(obj, "初始化");
            this.$store.commit("getVisitorInf", obj);
            this.endList[0].unreadCount = 0;
          }
        });
      }
    },
    //获取会话列表
    getSessionList() {
      this.Request.get("/session/guest/my/all/list").then(res => {
        console.log("*******************", res.data.list);
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
                  this.endList = [...this.endList, obj];
                } else {
                  console.log(obj.latestVisitorMsgTime, "--------------");
                  if (obj.latestVisitorMsgTime == "") {
                    obj.latestVisitorMsgTime = moment(obj.beginTime).format(
                      "X"
                    );
                  } else {
                    obj.latestVisitorMsgTime = obj.latestVisitorMsgTime / 1000;
                  }
                  this.penddingList = [...this.penddingList, obj];
                }
              }
            });
          });
          console.log(this.penddingList, this.endList);
          if (this.penddingList.length + this.endList.length) {
            this.$emit("isStatus", true);
          } else {
            this.$emit("isStatus", false);
          }
          this.readyOk = true;
          this.getIsSDKReady();
          this.timeoutHandler();
        } else {
          this.$message.warning(res.data.msg);
        }
        // console.log("会话列表", res.data);
      });
    },
    testList() {
      // console.log(this.penddingList, this.endList);
      this.chatList.forEach((item, i) => {
        var status;
        if (item.type == "TIMCustomElem") {
          item.payload.data =
            typeof item.payload.data == "string"
              ? JSON.parse(item.payload.data)
              : item.payload.data;
        }
        console.log(item);
        if (
          item.type == "TIMCustomElem" &&
          item.payload.data.subMsgType == "createsession"
        ) {
          console.log(this.penddingList, this.endList);
          status = true;
          //创建新会话
          //从已结束会话中查找，确定是否有已结束的会话重新启用
          if (this.endList && this.endList.length) {
            this.endList.forEach((val, index) => {
              if (val.conversationID == item.conversationID) {
                this.endList.splice(index, 1);
              }
            });
          }
          let params = {
            guestImAccount: item.from,
            serviceImAccount: item.to
          };
          // console.log(params)
          this.Request.get("/session/guest/query/from/msg", params).then(
            res => {
              if (res.data.status) {
                let arr = [...this.penddingList];
                let this_ = this;
                let promise = this.tim(
                  this.imInfo.SDKAppID
                ).getConversationProfile(item.conversationID);
                promise
                  .then(function(imResponse) {
                    // 获取成功
                    console.log(imResponse.data.conversation); // 会话资料
                    let obj = {
                      ...res.data.sessionInfo,
                      ...imResponse.data.conversation
                    };
                    obj["latestVisitorMsgTime"] = moment(
                      res.data.sessionInfo.beginTime
                    ).format("X");
                    console.log(obj);
                    this_.penddingList = [obj, ...arr];
                    if (this_.penddingList.length + this_.endList.length) {
                      this_.$emit("isStatus", true);
                    } else {
                      this_.$emit("isStatus", false);
                    }
             
                    if (
                      this_.penddingList.length == 1 &&
                      !this_.endList.length
                    ) {
                    
                      this_.getIsSDKReady();
                    }
                    if (this_.penddingList && this_.penddingList.length) {
                      // console.log(this.penddingList);
                      this_.timeoutHandler();
                    }
                    if (this_.visitorInf.guestImAccount == item.from) {
                    //   console.log("------------------------1",moment(
                    //   res.data.sessionInfo.beginTime
                    // ).format("X"),moment(res.data.sessionInfo.beginTime).valueOf() /
                    //       1000,res.data.sessionInfo.beginTime);
                      let obj1 = {
                        guestId: res.data.sessionInfo.guestId,
                        guestName: res.data.sessionInfo.guestName,
                        id: res.data.sessionInfo.id,
                        beginTime:
                          moment(res.data.sessionInfo.beginTime).valueOf() /
                          1000,
                        endTime: "",
                        status: true,
                        orgId: res.data.sessionInfo.orgId,
                        guestImAccount: res.data.sessionInfo.guestImAccount
                      };
                      console.log(obj1)
                      this_.$store.commit("getVisitorInf", obj1);
                    }
                  })
                  .catch(function(imError) {
                    console.warn("getConversationProfile error:", imError); // 获取会话资料失败的相关信息
                  });
              }
            }
          );
        } else if (
          item.type == "TIMCustomElem" &&
          (item.payload.data.subMsgType == "stopsession" ||
            item.payload.data.subMsgType == "transfer")
        ) {
          //转接或结束会话
          // console.log(this.penddingList, this.endList);
          //正在进行的会话设置为已结束的会话
          this.penddingList.forEach((val, index) => {
            if (val.conversationID == item.conversationID) {
              status = false;
              // let data = { ...val };
              let this_ = this;
              let promise = this.tim(
                this.imInfo.SDKAppID
              ).getConversationProfile(item.conversationID);
              promise
                .then(function(imResponse) {
                  // 获取成功
                  console.log(imResponse.data.conversation); // 会话资料
                  let obj = {
                    ...val,
                    ...imResponse.data.conversation
                  };
                  obj["endTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
                  console.log(obj);
                  this_.penddingList.splice(index, 1);
                  this_.endList = [obj, ...this_.endList];
                  if (this_.penddingList.length + this_.endList.length) {
                    this_.$emit("isStatus", true);
                  } else {
                    this_.$emit("isStatus", false);
                  }
                  console.log(this_.penddingList);
                  if (this_.penddingList && this_.penddingList.length) {
                    // console.log(this.penddingList);
                    this_.timeoutHandler();
                  }
                 
                  if (this_.visitorInf.guestImAccount == item.from) {
                    // console.log(
                    //   "------------------------2",
                    //   this_.visitorInf.beginTime,
                    //   moment().valueOf() / 1000,
                    //   moment().format("X") 
                    // );
                    let obj1 = {
                      guestId: this_.visitorInf.guestId,
                      guestName: this_.visitorInf.guestName,
                      id: this_.visitorInf.id,
                      beginTime: this_.visitorInf.beginTime,
                      endTime: moment().format("X"),
                      status: false,
                      orgId: this_.visitorInf.orgId,
                      guestImAccount: this_.visitorInf.guestImAccount
                    };

                    this_.$store.commit("getVisitorInf", obj1);
                    if(item.payload.data.subMsgType == "transfer"){
                      let obj2 = {
                        previous: '',
                        selectId: item.conversationID
                      };
                      this_.selectObj(obj2)
                    }
                    
                  }
                })
                .catch(function(imError) {
                  console.warn("getConversationProfile error:", imError); // 获取会话资料失败的相关信息
                });
              // data["endTime"] = moment().format("X");

              // this.endList = [...this.endList, data];

              // let status =
              //   item.payload.data.subMsgType == "stopsession" ? 0 : 1;
              // this.endSession(item.id, status);
            }
          });
        } else {
          // console.log(this.penddingList, this.endList);
          if (this.penddingList.length) {
            this.penddingList.forEach((val, index) => {
              if (val.conversationID == item.conversationID) {
                status = true;
                let this_ = this;
                let promise = this.tim(
                  this_.imInfo.SDKAppID
                ).getConversationProfile(item.conversationID);
                promise
                  .then(function(imResponse) {
                    // 获取成功
                    console.log(imResponse.data.conversation, val); // 会话资料
                    let obj = { ...val, ...imResponse.data.conversation };
                    if (val.lastMessage.fromAccount != this_.imInfo.userID) {
                      if (
                        (val.lastMessage.type == "TIMCustomElem" &&
                          val.payload.data.sendType == "manual") ||
                        val.lastMessage.type != "TIMCustomElem"
                      ) {
                        // console.log('访客进入')
                        //手动消息需重新计时最后一条消息时间
                        obj["latestVisitorMsgTime"] = moment().format("X");
                      }
                    }
                    console.log(obj);
                    this_.penddingList.splice(index, 1);
                    this_.penddingList = [obj, ...this_.penddingList];
                    if (this_.penddingList.length + this_.endList.length) {
                      this_.$emit("isStatus", true);
                    } else {
                      this_.$emit("isStatus", false);
                    }
                    if (this_.penddingList && this_.penddingList.length) {
                      // console.log(this.penddingList);
                      this_.timeoutHandler();
                    }
                  })
                  .catch(function(imError) {
                    console.warn("getConversationProfile error:", imError); // 获取会话资料失败的相关信息
                  });
              }
            });
          }

          // this.endList.forEach((val, index) => {
          //   if (val.conversationID == item.conversationID) {
          //     status = false;

          //     let this_ = this;
          //     let promise = this.tim(
          //       this.imInfo.SDKAppID
          //     ).getConversationProfile(item.conversationID);
          //     promise
          //       .then(function(imResponse) {
          //         // 获取成功
          //         console.log(imResponse.data.conversation); // 会话资料
          //         let obj = {
          //           ...val,
          //           ...imResponse.data.conversation
          //         };
          //         obj["latestVisitorMsgTime"] = moment().format("X");
          //         console.log(obj);
          //         this_.endList.indexOf(index, 1);
          //         this_.endList = [obj, ...this_.endList];
          //         if (this_.penddingList.length + this_.endList.length) {
          //             this_.$emit("isStatus", true);
          //           } else {
          //             this_.$emit("isStatus", false);
          //           }
          //       })
          //       .catch(function(imError) {
          //         console.warn("getConversationProfile error:", imError); // 获取会话资料失败的相关信息
          //       });
          //   }
          // });
         
          // if (this.visitorInf.guestImAccount == item.from) {
          //   let obj = {
          //     guestId: this.visitorInf.guestId,
          //     guestName: this.visitorInf.guestName,
          //     id: this.visitorInf.id,
          //     beginTime: moment(this.visitorInf).valueOf() / 1000,
          //     endTime: this.visitorInf.endTime,
          //     status: this.visitorInf.status,
          //     orgId: this.visitorInf.orgId,
          //     guestImAccount: this.visitorInf.guestImAccount
          //   };
          //   console.log(obj, "正常");
          //   this.$store.commit("getVisitorInf", obj);
          // }
        }
      });
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
        // console.log(moment().format("X"), "------");
        this.penddingList.map((item, index) => {
          // console.log(
          //   moment().format("X"),
          //   item.latestVisitorMsgTime,
          //   item.beginTime
          // );
          let time = item.latestVisitorMsgTime
            ? item.latestVisitorMsgTime
            : moment(item.beginTime).format("X");
          if (moment().format("X") - time >= 5 * 60) {
            this.penddingList.splice(index, 1);
            let data = { ...item };

            data["endTime"] = moment().format("YYYY-MM-DD HH:mm:ss");

            this.endList = [data, ...this.endList];
            if (
              this.visitorInf &&
              (this.visitorInf.guestId == item.guestId ||
                this.visitorInf.guestImAccount == item.userProfile.userID)
            ) {
              let obj = {
                guestId: data.guestId,
                beginTime: moment(data.beginTime).valueOf() / 1000,
                id: data.id,
                guestName: data.guestName,
                endTime: moment(data.endTime).valueOf() / 1000, //data.endTime,
                status: false,
                orgId: item.orgId,
                guestImAccount: item.guestImAccount
              };
              console.log(obj, "超时结束");
              this.$store.commit("getVisitorInf", obj);
            }
            this.endSession(item.id, 2);
          }

          // }
        });

        if (!this.penddingList.length) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    getChat() {
      let promise = this.tim(this.imInfo.SDKAppID).getConversationProfile(
        "C2Chfw1176193904"
      );
      promise
        .then(function(imResponse) {
          // 获取成功
          console.log(imResponse.data.conversation); // 会话资料
        })
        .catch(function(imError) {
          console.warn("getConversationProfile error:", imError); // 获取会话资料失败的相关信息
        });
    }
  },
  watch: {
    isSDKReady(a, b) {
      if (a) {
        this.imStatus = a;
        // this.getIsSDKReady();
        this.getSessionList();
      }
    },
    conversationList: {
      handler(a, b) {
        // console.log(a, b);
        // this.chatList = [...a];
        if (a.length && this.imStatus) {
          // this.watchList();
          // this.testList();
          // this.watchTest();
        }
      },
      // immediate: true,
      deep: true
    },

    messageList(a, b) {
      console.log(a, b);
      if (a.length && JSON.stringify(a) != JSON.stringify(b)) {
        this.chatList = [...a];
        this.testList();
      }
      // this.getChat()
    }
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation,
      isSDKReady: state => state.user.isSDKReady,
      visitorInf: state => state.basic.visitorInf,
      messageList: state => state.conversation.messageList,
      imInfo: state => state.basic.imInfo
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
        width: 79px;
        height: 1px;
        margin: 0 10px;
        border-top: 1px solid #b1b1b1;
      }
    }
  }
}
</style>
