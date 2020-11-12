<template>
  <div>
    <div class="tabs">
      <div ref="line" class="tab-line"></div>
      <div
        :class="[activeKey == item.actKey ? 'active-tab' : 'tab']"
        @click="changeTab($event, item, index)"
        v-for="(item, index) in childList"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
let self;
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
  created() {
    self = this;
  },
  mounted() {
    //循环tab标签
    this.childList = this.$children;
    //设置滑动距离。平分设备宽度
    this.slideWidth = window.innerWidth / this.childList.length;
    //设置状态线初始化滑动位置
    this.$refs.line.style.width = this.slideWidth + "px";
  },
  methods: {
    //切换tab触发事件
    changeTab: (event, item, index) => {
      self.activeKey = item.actKey;
      self.$refs.line.style.transform =
        "translateX(" + self.slideWidth * index + "px)";
      self.$refs.line.style.transition = "transform .3s";
      self.$emit("on-click", item, index); //将切换tab的事件暴露给父组件
    },
    //初始化时tab状态设置与相应内容显示
    updateNav: () => {
      self.$children.map((item, index) => {
        if (item.actKey == self.activeKey) {
          item.show = true;
          self.$nextTick(function () {
            self.$refs.line.style.transform =
              "translateX(" + self.slideWidth * index + "px)";
            self.$refs.line.style.transition = "transform 0s";
          });
        } else {
          item.show = false;
        }
      });
    },
  },
  watch: {
    //监听当前tab,显示相应内容
    activeKey() {
      self.$children.map((item) => {
        if (item.actKey == self.activeKey) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
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
}
.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #f6f6f6;
}
.tab-line {
  position: absolute;
  left: 0;
  border-bottom: 2px solid #158ef3;
  height: 50px;
}
</style>
