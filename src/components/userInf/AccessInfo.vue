<template>
  <div class="accessInf">
    <div class="header">
      <span class="accessIcon">访问信息</span>
    </div>
    <div class="accessInf_item">
      <ul>
        <li>
          <span>接入来源</span>
          <p>{{ moreInf.channelName }}</p>
        </li>
        <li>
          <span>来源终端</span>
          <p>
            {{
              moreInf.channelType == 0
                ? "网站咨询"
                : moreInf.channelType == 1
                ? "微信公众号"
                : moreInf.channelType == 2
                ? "微信小程序"
                : moreInf.channelType == 3
                ? "IOS"
                : moreInf.channelType == 4
                ? "安卓"
                : moreInf.channelType == 5
                ? "QQ"
                : moreInf.channelType == 6
                ? "微信"
                : ""
            }}
          </p>
        </li>
        <li>
          <span>地域&ip地址</span>
          <p>{{ moreInf.address }} {{ moreInf.ip }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    guestId: {
      // 访客id
      type: String,
      default: ""
    }
  },
  data() {
    return {
      moreInf: {}
    };
  },

  mounted() {
    this.getMoreInf();
  },
  components: {},
  methods: {
    getMoreInf() {
      this.Request.get("/session/guest/infoJson?guestId=" + this.guestId).then(
        res => {
          this.moreInf = res.data.data;
          // console.log("工单信息", res.data.list);
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.accessInf {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    .setting {
      color: #3e7bf8;
      cursor: pointer;
    }
    .accessIcon {
      padding-left: 26px;
      background: url("../../assets/imgs/tips.png") left center no-repeat;
    }
  }
  .accessInf_item {
    padding-top: 15px;
    li {
      display: flex;
      margin-bottom: 15px;
      span {
        display: block;
        width: 90px;
      }
      p {
        margin-bottom: 0;
      }
    }
  }
}
</style>
