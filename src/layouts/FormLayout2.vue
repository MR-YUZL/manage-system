<template>
  <main class="layout">
    <header class="header">
      <Query v-bind="$attrs" v-on="$listeners" />
    </header>
    <main class="main">
      <slot name="body"></slot>
    </main>
    <footer v-if="footer" class="footer">
      <Pagination v-bind="$attrs" v-on="$listeners" />
    </footer>
  </main>
</template>

<script>
export default {
  name: "FormLayout",
  props: {
    footer: {
      type: Boolean,
      default: true,
    },
  },
  created() {},
  mounted() {
    console.log('ok')
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    padding: 20px;
  }
  .main {
    width: 100%;
  }
  .footer {
    position: relative;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px;
  }
}
</style>
