<template>
  <div>
    <div class="tabs" ref="tabs">
      <div
        :class="[activeKey == item.actKey ? 'active-tab' : 'tab']"
        @click="changeTab(item, index)"
        v-for="(item, index) in [
          { label: '第一', actKey: '1' },
          { label: '第二', actKey: '2' },
        ]"
        :key="index"
      >
        {{ item.label }}
      </div>
      <div ref="line" class="tab-line"></div>
    </div>
    <transition name="fade-page" mode="out-in">
      <keep-alive>
        <slot></slot>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Tabs",
  data() {
    return {
      childList: [],
      activeKey: this.defaultKey, //将初始化tab赋值给activeKey
      slideWidth: 0,
    };
  },
  //获取子组件传过来的激活tab
  props: {
    defaultKey: {
      type: String,
      default: "1",
    },
  },
  created() {},
  mounted() {
    //循环tab标签
    // this.childList = this.$children;

    //设置滑动距离。平分设备宽度
    this.$nextTick(() => {
      this.slideWidth = this.$refs.tabs.clientWidth / this.childList.length;
      //设置状态线初始化滑动位置
      this.$refs.line.style.width = this.slideWidth + "px";
    });
  },
  methods: {
    //切换tab触发事件
    changeTab(item, index) {
      this.activeKey = item.actKey;
      this.$refs.line.style.transform =
        "translateX(" + this.slideWidth * index + "px)";

      this.$emit("on-click", item, index); //将切换tab的事件暴露给父组件
    },
    // 初始化时tab状态设置与相应内容显示
    updateNav() {
      // this.$children.map((item, index) => {
      //   if (item.actKey == this.activeKey) {
      //     item.show = true;
      //   } else {
      //     item.show = false;
      //   }
      // });
    },
  },
  watch: {
    //监听当前tab,显示相应内容
    activeKey: {
      handler: function () {
        this.updateNav();
      },
    },
  },
};
</script>
<style scoped>
.active-tab {
  color: #158ef3;
  height: 50px;
  font-weight: bold;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
}
.tab {
  color: #333;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
}
.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
}
.tab-line {
  border-bottom: 2px solid #158ef3;
  position: absolute;
  left: 10px;
  height: 50px;
  transition: all 0.3s linear;
}
</style>
