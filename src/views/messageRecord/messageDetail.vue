<template>
  <div class="messageDetail">
    <div class="recordDetail">
      <div class="d-head">
        <h5>留言详情</h5>
        <a-button type="primary" v-if="handleRecordBtn" @click="setHandleResult"
          >设为已处理</a-button
        >
      </div>
      <div class="recordList" style="position:relative;height:1000px; ">
        <HistoryList
        v-if="sessionObj.sessionId"
          style="position:relative;background-color:#fff;"
          :sessionInf="sessionObj"
        />
        <!-- <ul class="record-style1">
                  <li v-for="(item,index) in recordList" :key="index">
                    <div>
                    <img  :src="item.avatar" alt="">
                    </div>
                    <div>
                      <div>{{item.content}}</div>
                      <span>{{item.contentTime}}</span>
                    </div>
                  </li>
              </ul> -->
      </div>
      <div v-if="handleResult.con && handleResult.con !== ''">
        <div class="d-head" style="margin-top:30px;">
          <h5>处理结果</h5>
          <p>跟进人:{{ handleResult.name }}</p>
        </div>
        <p>{{ handleResult.con }}</p>
      </div>
    </div>
    <!-- <div class="information">
          <UserInformation  :guestId="guestId"/>
        </div> -->
  </div>
</template>

<script>
import HistoryList from "@/components/historyMessage/historyList";
// import UserInformation from './../../components/userInf'
export default {
  components: {
    // UserInformation
    HistoryList
  },
  props: {
    sessionObj: {
      type: Object
    },
    handleRecordBtn: {
      type: Boolean
    },
    handleResult: {
      type: Object
    }
  },
  data() {
    return {
      sessionInf: {}
    };
  },
  created() {
    console.log("guestId", this.guestId);
  },
  mounted() {
    
  },
  methods: {
    setHandleResult() {
      this.$emit("setHandleResult");
    }
  }
};
</script>

<style lang="less" scoped>
.messageDetail {
  display: flex;
  .recordDetail {
    // border-right:1px solid #e6e6e6;
    width: 400px;
    // padding: 0 37px 0 23px;
    box-sizing: border-box;
  }
  // .information{
  //   width:480px;
  // }
}
.d-head {
  // margin-bottom:18px;
  padding: 0 23px 0 23px;
  display: flex;
  justify-content: space-between;
  h5,
  p {
    font-size: 16px;
    color: #353535;
  }
}
.recordList {
  overflow: hidden;
  .record-style1 li {
    display: flex;
    margin-top: 25px;
    span {
      color: #808080;
    }
    img {
      display: block;
      margin-right: 15px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
}
</style>
<style lang="less">
.messageDetail .ant-modal-body {
  padding: 0;
}
</style>
