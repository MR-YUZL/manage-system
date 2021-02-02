<template>
  <div class="Steps3">
    <a-popover v-model="visibleObj['visible0']" title="Title" trigger="click">
      <div slot="content" @click="hide(0)">Close</div>
      <div class="first">
        <div class="first_body" :class="statusList[0].status | status">
          <span>{{ statusList[0].name }}</span>
        </div>
        <div id="triangle-gray" v-if="statusList[0].status === 2"></div>
        <div id="triangle-bule" v-else>
          <div id="triangle-white" v-if="statusList[0].status === 1"></div>
        </div>
      </div>
    </a-popover>

    <a-popover
      v-model="visibleObj[`visible${index + 1}`]"
      title="Title"
      trigger="click"
      v-for="(v, index) in statusList.slice(1, -1)"
      :key="index"
    >
      <div slot="content" @click="hide(index + 1)">
        <slot :name="v.title"></slot>
      </div>
      <div class="proceed">
        <div class="proceed_body" :class="v.status | status">
          <div id="triangle-bule">
            <div id="triangle-white"></div>
          </div>
          <span style="margin-left: 10px">{{ v.name }}</span>
        </div>
        <div id="triangle-gray" v-if="v.status === 2"></div>
        <div id="triangle-bule" v-else>
          <div id="triangle-white" v-if="v.status === 1"></div>
        </div>
      </div>
    </a-popover>

    <a-popover
      v-model="visibleObj[`visible${statusList.length - 1}`]"
      title="Title"
      trigger="click"
    >
      <div slot="content" @click="hide(statusList.length - 1)">Close</div>
      <div class="last">
        <div
          class="last_body"
          @click="handleClick"
          :class="statusList[statusList.length - 1].status | status"
        >
          <div id="triangle-bule">
            <div id="triangle-white"></div>
          </div>
          <span style="margin-left: 10px">{{
            statusList[statusList.length - 1].name
          }}</span>
        </div>
      </div>
    </a-popover>
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

    <!-- <div class="tipLow">输单</div>

    <div class="tipWin">方案阶段赢</div>

    <div class="abandon">已作废</div> -->
  </div>
</template>
<script>
export default {
  name: "Steps3",
  props: {
    statusList: {
      type: Array,
      default: () => [
        { status: 2, name: "初步接洽", title: "a" },
        { status: 0, name: "需求确定", title: "b" },
        { status: 1, name: "方案阶段", title: "c" },
        { status: 2, name: "报价谈判", title: "d" },
        { status: 2, name: "在谈判", title: "e" },
      ], //1代表完成 2代表进行 3代表未完成
    },
    testObj: {
      type: Object,
      default: () => {},
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
    return {
      visibleObj: {},
    };
  },
  created() {
    this.$nextTick(() => {
      for (let index = 0; index < this.statusList.length; index++) {
        this.$set(this.visibleObj, `visible${index}`, false);
      }
    });
  },
  mounted() {
    this.$set(this.testObj, "a", 0);
  },
  methods: {
    handleClick(e) {
      let name = e.target.innerText;

      this.$emit("update:status", name);
    },
    hide(index) {
      this.$set(this.visibleObj, `visible${index}`, false);
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
  .tipLow,
  .tipWin,
  .abandon {
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    height: 32px;
    width: 120px;
    line-height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    border: 0;
  }
  .tipWin {
    color: rgb(115, 206, 87);
    background: rgb(220, 243, 214);
  }
  .tipLow {
    color: rgb(251, 121, 87);
    background: rgb(255, 222, 217);
  }
  .abandon {
    color: rgb(184, 184, 184);
    background: rgb(222, 222, 222);
  }
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
