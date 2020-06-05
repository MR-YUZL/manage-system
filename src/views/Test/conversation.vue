<!-- 会话页 -->
<template>
  <div class="conversation">
    <a-modal title="咨询问题分类" :visible="visible" :footer="null" :closable="false">
      <p>请点击选择问题，我们将安排专业人员与您沟通！</p>
      <div>
        <div
          v-for="(item,index) in getNavigationList"
          :key="index"
          class="list"
          :class="{'active': index === select}"
          @click="selectQuestion(item.id,index)"
        >{{item.question}}</div>
      </div>
      <div class="btn">
        <a-button type="primary" @click="onOK()">点击咨询客服</a-button>
      </div>
    </a-modal>
    <aa />
    <current-conversation />
  </div>
</template>

<script>
import aa from './../../views/currentSession/sessionCenter/conversation/current-conversation'
import currentConversation from './../currentSession/sessionCenter/conversation/current-conversation'
import { v1 as uuidv1 } from "uuid";
export default {
  name: "",
  components: {
      currentConversation,
      aa
  },
  data() {
    return {
      getNavigationList: [],
      getNavigationStatus: false,
      uuid: "",
      visible: true,
      select: "",
      questionId: ""
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    setLocalStorage() {
      let str = uuidv1();
      localStorage.setItem(this.$route.query.url, str.replace(/-/g, ""));
    },
    getNavigation() {
      let params = {
        orgId: "880b29c1dae1463ab411e42bac8cdaad",
        channelId: "afdb8a0e562c4c0085d4d135216f2c80",
        guestId: this.uuid
      };
      this.Request.get("/guest/session/question/list", params).then(res => {
        if (res.data.status) {
          this.getList = res.data.list;
          this.getNavigationStatus = res.data.webNavigationFlag;
          this.getNavigationList = res.data.list;
          console.log(res);
        }
      });
    },
    customerService() {
      let params = {
        orgId: "880b29c1dae1463ab411e42bac8cdaad",
        channelId: "afdb8a0e562c4c0085d4d135216f2c80",
        guestId: this.uuid,
        questionId: "", //咨询问题ID
        newGuestFlag: 1 //是否是新访客, 1新访客, 0旧访客
      };
      this.Request.get("/guest/session/service/acc/assign", params).then(
        res => {
          console.log(res.data);
          if (res.data.status) {
          }
        }
      );
    },
    createIM() {
      let params = {
        orgId: "880b29c1dae1463ab411e42bac8cdaad",
        channelId: "afdb8a0e562c4c0085d4d135216f2c80",
        guestId: this.uuid
      };
      this.Request.get("/guest/session/im/account/create", params).then(res => {
        console.log(res.data);
        if (res.data.status) {
        }
      });
    },
    createSig() {
      let params = {
        orgId: "880b29c1dae1463ab411e42bac8cdaad",
        imAccount: "",
        imPassword: ""
      };
      this.Request.get("/guest/session/im/query/user/sig", params).then(res => {
        console.log(res.data);
        if (res.data.status) {
        }
      });
    },
    selectQuestion(id, index) {
      this.select = index;
      this.questionId = id;
    },
    onOK() {
      if (this.questionId) {
        this.visible = false;
      } else {
        this.$message.warning("请选择咨询问题！");
      }
    }
  },
  created() {},
  mounted() {
    if (localStorage.getItem(this.$route.query.url)) {
      this.uuid = localStorage.getItem(this.$route.query.url);
    } else {
      this.setLocalStorage();
      this.uuid = localStorage.getItem(this.$route.query.url);
    }
    this.getNavigation();
    // this.customerService()
    this.createIM()
  }
};
</script>
<style lang='less' scoped>
.conversation {
}
.btn {
  margin-top: 48px;
  margin-bottom: 10px;
  text-align: center;
}
.list {
  padding: 8px 10px;
  margin: 10px 0;
  border: 1px solid #efefef;
  border-radius: 5px;
  cursor: pointer;
}
.active {
  background: #f7f7f7;
}
</style>