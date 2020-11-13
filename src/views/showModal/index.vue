<template>
  <div :class="['container']">
    <section class="left">
      <div
        :class="['left--item']"
        :style="{ marginLeft: move(index) }"
        v-for="(v, index) in imgList.slice(0, 3)"
        :key="index"
        @click="handleClick"
      >
        <div :class="['left--img', isClick === v.key1 ? 'isClick' : '']">
          <img :src="v.img1" alt="" class="img" :id="v.key1" />
        </div>
        <div :class="['left--img', isClick === v.key2 ? 'isClick' : '']">
          <img :src="v.img2" alt="" class="img" :id="v.key2" />
        </div>
      </div>
    </section>
    <section class="right">
      <div
        :class="['right--item']"
        :style="{ marginRight: move(index) }"
        v-for="(v, index) in imgList.slice(3)"
        :key="index"
        @click="handleClick"
      >
        <div :class="['right--img', isClick === v.key1 ? 'isClick' : '']">
          <img :src="v.img1" alt="" class="img" :id="v.key1" />
        </div>
        <div :class="['right--img', isClick === v.key2 ? 'isClick' : '']">
          <img :src="v.img2" alt="" class="img" :id="v.key2" />
        </div>
      </div>
    </section>
    <transition name="shade">
      <MapModal
        v-if="showModal"
        class="showModal"
        :visible="showModal"
        :toLeft="toLeft"
        :toTop="toTop"
        @click.native.self="removeShade"
      >
        <Tabs defaultKey="1" @on-click="changeTab">
          <TabPane :key="1" v-if="tabIndex === '1'">
            <a-input />
          </TabPane>
          <TabPane :key="2" v-else>
            <a-input />
            11
          </TabPane>
        </Tabs>
      </MapModal>
    </transition>
  </div>
</template>
<script>
import { imgList } from "@/utils/name";
export default {
  name: "showModal",
  props: {},
  components: {},
  data() {
    return {
      isClick: "",
      toLeft: "",
      toTop: "",
      showModal: false,
      imgList,
      tabIndex: '1',
    };
  },
  created() {},
  mounted() {
    // this.$utils.resetScreenSize();
  },
  methods: {
    move(index) {
      switch (index) {
        case 0:
          return "0px";
          break;
        case 1:
          return "40px";
          break;
        case 2:
          return "80px";
          break;
        default:
          break;
      }
    },
    changeTab(item, index) {
      //调数据
      console.log("item, index", item, index);
      this.tabIndex = item.actKey;
    },
    handleClick(event) {
      console.log(event.target.id);
      console.log("event", event.target.getBoundingClientRect());
      const { x, y } = event.target.getBoundingClientRect();
      this.showModal = !this.showModal;
      this.toTop = `${y - 183.5}px`;
      this.toLeft = `${x - 40}px`;
      if (this.showModal) {
        this.isClick = event.target.id;
      } else {
        this.isClick = "";
      }
    },
    removeShade(e) {
      let sp = document.getElementById(this.isClick);
      if (sp) {
        if (!sp.contains(e.target)) {
          this.showModal = false;
          this.isClick = "";
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #002a89;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s linear;
  .showModal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .left,
  .right {
    overflow: hidden;
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .left--item {
      height: 100px;
      width: 400px;
      display: flex;
      justify-content: space-between;
      .isClick {
        position: relative;
        z-index: 9999;
      }
      .left--img {
        width: 48%;
        height: 100%;
        cursor: pointer;

        .img {
          height: 100%;
          width: 100%;
        }
      }
      &:not(last-child) {
        margin-bottom: 30px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .right--item {
      height: 100px;
      width: 400px;
      display: flex;
      justify-content: space-between;
      .isClick {
        z-index: 9999;
      }
      .right--img {
        width: 48%;
        height: 100%;
        cursor: pointer;

        .img {
          height: 100%;
          width: 100%;
        }
      }
      &:not(last-child) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
