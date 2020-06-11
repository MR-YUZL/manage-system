<template>
  <div
    class="session_item"
    :class="{ 'choose': conversation.conversationID === currentConversation.conversationID,'end': conversation.endTime && conversation.conversationID != currentConversation.conversationID}"
    @click="selectConversation"
  >
    <div class="wrap">
      <div>
        <a-badge :count="conversation.unreadCount" :overflow-count="10">
          <a-avatar
            :size="45"
            :src="conversation.userProfile.avatar ? 
                conversation.userProfile.avatar : require('./../../../assets/imgs/current_session/header.png')"
          />
        </a-badge>
      </div>
      <div class="content">
        <div class="row-1">
          <div class="name" :title="conversation.guestName">{{conversation.guestName}}</div>
          <div v-if="conversation.endTime" class="time">{{time}}</div>
        </div>
        <div class="row-2">
          <div
            class="summary"
            :title="conversation.lastMessage.messageForShow != '' ? conversation.lastMessage.messageForShow : conversation.latestMsgContent"
          >{{messageForShow}}</div>
          <div class="date">{{date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { isToday, getDate, getTime } from "./../../../utils/date";
import moment from 'moment'
export default {
  data: () => ({}),
  props: ["conversation"],
  components: {},
  mounted() {
    console.log(this.conversation);
    // console.log(this.currentConversation)
  },
  methods: {
    moment,
    selectConversation() {
      if (
        this.conversation.conversationID !==
        this.currentConversation.conversationID
      ) {
        this.$store.dispatch(
          "checkoutConversation",
          this.conversation.conversationID
        );
        let obj = {
          guestId: this.conversation.guestId,
          di:this.conversation.id,
          guestName: this.conversation.guestName,
          beginTime: moment(this.conversation.beginTime).valueOf() / 1000,
          endTime: moment(this.conversation.endTime).valueOf() / 1000
        };
        this.$store.commit("getVisitorInf", obj);
      }
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
  watch: {},
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUserProfile: state => state.user.currentUserProfile
    }),
    ...mapGetters(["toAccount"]),
    messageForShow() {
      if (this.conversation.lastMessage.isRevoked) {
        if (
          this.conversation.lastMessage.fromAccount ===
          this.currentUserProfile.userID
        ) {
          return "你撤回了一条消息";
        }
        if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
          return "对方撤回了一条消息";
        }
        return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`;
      }
    
      console.log(this.conversation,this.conversation.latestMsgContent)
      if(this.conversation.latestMsgType == 'TIMCustomElem'){
        //  let 

      }else{
        //  this.conversation.lastMessage.messageForShow
          return this.conversation.lastMessage.messageForShow != ""
        ? this.conversation.lastMessage.messageForShow
        : this.conversation.latestMsgContent;
      }
     
    },
    date() {
      if (
        !this.conversation.lastMessage ||
        !this.conversation.lastMessage.lastTime
      ) {
        return "";
      }
      const date = new Date(this.conversation.lastMessage.lastTime * 1000);
      if (isToday(date)) {
        return getTime(date, true);
      }
      return getDate(date);
    },
    time() {
      if (this.conversation.endTime) {
        let date = moment(this.conversation.endTime) - moment(this.conversation.beginTime);
        let time = this.formateSeconds(date/1000);
        return time;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.session_item {
  padding: 15px 20px;
  cursor: pointer;
  overflow: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  .wrap {
    display: flex;
    .content {
      flex: 1;
      height: 40px;
      overflow: hidden;
      margin-left: 15px;
      .row-1 {
        display: flex;
        line-height: 21px;
        .name {
          min-width: 0px;
          font-size: 18px;
          color: #000000;
          min-width: 0px;
          overflow: hidden;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time{
          padding-left:10px;
        }
      }
      .row-2 {
        display: flex;
        font-size: 12px;
        padding-top: 3px;
        color: #9c9c9c;
        .summary {
          overflow: hidden;
          min-width: 0px;
          overflow: hidden;
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .date {
          padding-left: 10px;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          text-align: right;
        }
      }
    }
  }
}
.choose {
  background-color: #ededee;
}
.end {
  background-color: #ffffff;
}
</style>
