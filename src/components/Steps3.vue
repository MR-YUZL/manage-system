<template>
  <div class="Steps3">
    <div class="first">
      <div class="first_body" @click="handleClick">
        <span>{{ statusList[0].name }}</span>
      </div>

      <div id="triangle-bule"></div>
    </div>
    <div
      class="proceed"
      v-for="(v, index) in statusList.slice(1, -1)"
      :key="index"
      @click="handleClick"
    >
      <div class="proceed_body" :class="v.status | status">
        <div id="triangle-bule">
          <div id="triangle-white"></div>
        </div>
        <span style="margin: 0 auto">{{ v.name }}</span>
      </div>
      <div id="triangle-gray" v-if="v.status === 2"></div>
      <div id="triangle-bule" v-else>
        <div id="triangle-white" v-if="v.status === 1"></div>
      </div>
    </div>
    <div class="last">
      <div class="last_body" @click="handleClick">
        <div id="triangle-unfinish"></div>
        <span style="margin:0 auto">{{ statusList[statusList.length - 1].name }}</span>
      </div>
    </div>
    <a-button
      type="primary"
      class="btnWin"
      icon="check-circle"
      @click.native="win"
    >
      赢单
    </a-button>
    <a-button
      type="danger"
      class="btnLow"
      icon="close-circle"
      @click.native="low"
    >
      输单
    </a-button>
  </div>
</template>
<script>
export default {
  name: "Steps3",
  props: {
    statusList: {
      type: Array,
      default: () => [
        { status: 0, name: "初步接洽" },
        { status: 0, name: "需求确定" },
        { status: 1, name: "方案阶段" },
        { status: 2, name: "报价谈判" },
        { status: 2, name: "在谈判" },
      ], //1代表完成 2代表进行 3代表未完成
    },
    status: {
      type: String,
      default: "",
    },
  },
  components: {},
  filters: {
    status(val) {
      if (val === 0) return "finish";
      if (val === 1) return "proceeding";
      if (val === 2) return "unfinish";
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(e) {
      let name = e.target.innerText;

      this.$emit("update:status", name);
    },
    win() {},
    low() {},
  },
};
</script>
<style lang="less" scoped>
.Steps3 {
  display: flex;
  align-items: center;
  padding: 10px 8px;
  background: rgb(240, 240, 240);
  .finish {
    background: #1890ff;
    color: #fff;
  }
  .proceeding {
    color: #1890ff;
    border: 1px solid #1890ff;
  }
  .unfinish {
    background: rgb(222, 222, 222);
    color: #fff;
    #triangle-bule {
      position: relative;
      width: 0;
      height: 0;
      border-top: 15px solid transparent;
      border-left: 15px solid rgb(222, 222, 222);
      border-bottom: 15px solid transparent;
      z-index: 10;
    }
  }
  .first {
    display: flex;
    width: 120px;
    height: 30px;
    line-height: 30px;
    .first_body {
      width: 110px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      background: #1890ff;
    }
  }
  .proceed {
    display: flex;
    width: 120px;
    height: 30px;
    line-height: 30px;

    .proceed_body {
      display: flex;
      width: 110px;
      height: 30px;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }
  }
  .last {
    display: flex;
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    .last_body {
      display: flex;
      width: 110px;
      height: 30px;
      background: rgb(222, 222, 222);
      color: #fff;

      cursor: pointer;
      line-height: 30px;
    }
  }
}
#triangle-bule {
  position: relative;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-left: 15px solid #1890ff;
  border-bottom: 15px solid transparent;
  z-index: 10;
}
#triangle-gray {
  position: relative;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-left: 15px solid rgb(222, 222, 222);
  border-bottom: 15px solid transparent;
  z-index: 10;
}
#triangle-white {
  position: absolute;
  top: -14px;
  left: -16px;
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 14px solid transparent;
  border-left: 14px solid rgb(240, 240, 240);
  border-bottom: 14px solid transparent;
  z-index: 10;
}
#triangle-unfinish {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 14px solid transparent;
  border-left: 14px solid rgb(240, 240, 240);
  border-bottom: 14px solid transparent;
  z-index: 10;
}

.btnWin,
.btnLow {
  width: 120px;
}
.btnWin {
  background: rgb(115, 206, 87);
  margin-right: 10px;
  border: 0;
}
</style>
