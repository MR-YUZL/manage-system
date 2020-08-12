<template>
  <div class="current-conversation-wrapper">
    <div class="current-conversation" @scroll="onScroll">
      <div class="content">
        <div
          class="message-list scroll"
          ref="message-list"
          @scroll="this.onScroll"
        >
          <div class="more" v-if="!this.status">
            <a-button @click="getMOreFn">查看更多</a-button>
          </div>
          <div class="no-more" v-else>没有更多了</div>
          <history-message />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import historyMessage from "./index";
import moment from 'moment';

export default {
  name: "CurrentConversation",
  components: {
    historyMessage
  },
  props:['sessionInf'],
  data() {
    return {

      preScrollHeight: 0,
      showConversationProfile: false,
      timeout: "",
      status: false,
      historySessionList: [], //历史消息会话列表
    };
  },
  computed: {
    ...mapState({

    }),

    name() {
      if (this.currentConversation.type === "C2C") {
        return this.currentConversation.userProfile.nick || this.toAccount;
      } else if (this.currentConversation.type === "GROUP") {
        return this.currentConversation.groupProfile.name || this.toAccount;
      } else if (this.currentConversation.conversationID === "@TIM#SYSTEM") {
        return "系统通知";
      }
      return this.toAccount;
    },

  },
  mounted() {
    this.searchChatRecords(1)  //0获取更多，1：历史会话，2：工单管理
  },
  updated() {
  },
  destroyed() {

  },
  watch: {

  },
  methods: {
    //获取更多
    getMOreFn() {
      //一旦历史消息时间与腾讯云消息时间有大于等于情况，均拉去历史消息
      this.searchChatRecords(0);

    },
    //获取历史消息
    searchChatRecords(val) {
      console.log(
        this.historySessionList,
        this.historySessionList[this.historySessionList.length - 1].msgTime,
        this.historySessionList[0].msgTime
      );
      //sessionInf传递的参数
      // let params = {
      //   orgId: this.guestInfo.orgId,
      //   sessionId: this.sessionObj.guestImAccount,
      //   // msgTimeEnd: 
      //   //   ,
      //   pageSize: 20
      // };
      let params = Object.assign({},this.sessionInf)
      params.pageSize = 20
      switch (val){
        case 0:
          params.msgTimeEnd = moment(this.historySessionList[this.historySessionList.length - 1].msgTime
          ).format("YYYY-MM-DD HH:mm:ss.SSS");
          break;
        case 1:
        case 2:
          params.msgTimeEnd = moment().format("YYYY-MM-DD HH:mm:ss.SSS")
          break;
        default:
          break;  
      }
      this.Request.get("/session/chat/record/search", params).then(res => {
        if (res.data.status) {
          let data = res.data;
          let list = [...data.list];
          console.log(list.length);
          this.historySessionList.map(item => {
            list.map((val, index) => {
              if (val.id == item.id) {
                list.splice(index, 1);
              }
            });
          });
          console.log(list, list.length);
          if (list.length) {
            list.forEach((item, index) => {
              if (
                (item.msgTime == this.historySessionList[0].msgTime &&
                  item.id == this.historySessionList[0].id)
              ) {
                list.splice(index, 1);
              }
            });
            console.log(list, arr.list);
            this.historySessionList = [...this.historySessionList, ...list];
            // this.$store.commit("getHistoryList", data.list);
          } else {
            this.status = true;
          }
        }
      });
    },
    onScroll({ target: { scrollTop } }) {
      let messageListNode = this.$refs["message-list"];
      if (!messageListNode) {
        return;
      }
      if (
        this.preScrollHeight - messageListNode.clientHeight - scrollTop <
        20
      ) {
        this.isShowScrollButtomTips = false;
      }
    },

  }
};
</script>

<style lang="less" scoped>
/* 当前会话的骨架屏 */
.current-conversation-wrapper {
  width: 100%;
  height: calc(100% - 47px);
  background-color: #f5f5f5;
  color: #1c2438;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  top: 47px;
  .current-conversation {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    height: 100%;
    // height: 80vh;
    .content {
      display: flex;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      height: calc(100% - 177px);
      // overflow-y: scroll;
      position: relative;
      .message-list {
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        overflow-y: auto;
        padding: 0 20px;
        .more {
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          font-size: 12px;
          .ant-btn {
            color: #409eff;
            background: #f5f5f5;
            border-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        }

        .no-more {
          color: #a5b5c1;
          padding: 10px 10px;
          display: flex;
          justify-content: center;
          font-size: 12px;
        }
      }
      .newMessageTips {
        position: absolute;
        cursor: pointer;
        padding: 5px;
        width: 120px;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 5px;
        font-size: 12px;
        text-align: center;
        border-radius: 10px;
        border: 1px solid #e9eaec;
        background-color: #fff;
        color: #2d8cf0;
      }
    }
  }
}

.footer {
  border-top: 1px solid #e7e7e7;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #949bb1;
    opacity: 0.4;
  }
}

.show-more {
  text-align: right;
  padding: 10px 20px 0 0;
}
</style>
