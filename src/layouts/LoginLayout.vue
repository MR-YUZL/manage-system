<template>
  <main class="loginLayout test" ref="loginLayout" @click="handleClick" :a-b="'123'" id="1">
    <header class="header__Layout">
      <div class="header__logo">
        <img :src="require('@/assets/qfeng.png')" alt="" class="logo" />
      </div>

      <div class="header__desc"></div>
    </header>

    <main class="main__Layout">
      <router-view />
    </main>

    <footer class="footer__Layout">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
    </footer>
  </main>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
  },
  methods: {
    handleClick(e){
      console.log(e)
    }
  },
};
</script>

<style lang="less" scoped>
.loginLayout {
  height: 100%;
  width: 100%;
  padding: 110px 0 144px;
  position: relative;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat;
  background-size: 100%;
  .header__Layout {
    height: 44px;
    line-height: 44px;
    text-align: center;
    .header__logo {
    }
  }

  .main__Layout {
    min-width: 260px;
    width: 368px;
    margin: 0 auto;
  }

  .footer__Layout {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .links {
      margin-bottom: 8px;
      font-size: 14px;
      a {
        color: rgba(0, 0, 0, 0.45);
        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
  }
}
</style>
