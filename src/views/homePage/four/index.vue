<template>
  <div class="four">
    <nav class="four__nav">
      <a-menu
        :mode="'inline'"
        :style="{ border: '0' }"
        :selectedKeys="selectedKeys"
        type="inner"
      >
        <a-menu-item key="/four/power">
          <router-link :to="{ name: 'power' }"> 权限分配 </router-link>
        </a-menu-item>
        <a-menu-item key="/four/account1" v-if="isAccount">
          <router-link :to="{ name: 'account', params: { data: 'account1' } }">
            账号管理
            <span class="icon-close" @click.prevent.stop="closeTag('account')">
              <a-icon type="close" style="margin: 0" />
            </span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/four/account2">
          <router-link :to="{ name: 'account', params: { data: 'account2' } }">
            测试管理
            <span class="icon-close" @click.prevent.stop="closeTag('account')">
              <a-icon type="close" style="margin: 0" />
              <!-- <canvas id="myCanvas" :width="12" :height="12"></canvas> -->
            </span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </nav>
    <main class="four__main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "four",
  components: {},
  props: {},
  data() {
    return {
      selectedKeys: [],
      isAccount: true,
    };
  },
  watch: {
    $route() {
      this.updateMenu();
    },
  },
  created() {},
  mounted() {
    this.updateMenu();
    // this.drow();
  },
  methods: {
    updateMenu() {
      // const routes = this.$route.matched.concat();
      // this.selectedKeys = [routes.pop().path];

      this.selectedKeys = [this.$route.fullPath];
    },
    closeTag() {
      this.isAccount = false;
      this.$router.push("/four/power");
    },
    drow() {
      let c = document.getElementById("myCanvas");
      if (c.getContext) {
        let ctx = c.getContext("2d"); //创建一个2d的画笔
        ctx.beginPath(); //清除路径
        ctx.lineWidth = 1; //线段宽度
        ctx.moveTo(0, 0); //开始位置
        ctx.lineTo(12, 12); //第二个点的位置
        ctx.moveTo(12, 0); //开始位置
        ctx.lineTo(0, 12); //第二个点的位置
        ctx.stroke(); //画折线
      }
    },
  },
};
</script>

<style lang="less" scoped>
.four {
  width: 100%;
  background: #ffffff;
  display: flex;
  .four__nav {
    width: 15%;
    .icon-close {
      position: absolute;
      top: 50%;
      left: 90%;
      transform: translate(-50%, -50%);
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      line-height: normal;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
  .four__main {
    padding: 12px 16px;
    width: 85%;
  }
}
</style>
