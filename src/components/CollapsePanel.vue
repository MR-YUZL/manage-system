<template>
  <div class="CollapsePanel">
    <header class="header">
      {{ header }}
      <a-icon
        type="edit"
        class="header_edit"
        v-if="edit"
        @click.stop="handleEdit"
      />
    </header>
    <main class="main">
      <div ref="content">
        <slot></slot>
      </div>
    </main>
    <footer class="footer" @click.stop="() => handleClick(id)">
      <a-icon type="down" class="footer_arrow" />
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
export default {
  name: "CollapsePanel",
  props: {
    header: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      mainHeight: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.mainHeight = this.$refs.content.clientHeight;
    });
  },
  methods: {
    handleEdit() {},
    handleClick(id) {
      this.$parent.handleClick(id);
    },
  },
};
</script>
<style lang="less" scoped>
.CollapsePanel {
  position: relative;
  min-height: 60px;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s linear;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    padding: 0px 40px 0px 6px;
    background: #fff;
    line-height: 30px;
    cursor: pointer;
    transition: all 0.3s;
    .header_edit {
      position: absolute;
      top: 50%;
      right: 16px;
      display: inline-block;
      font-size: 12px;
      transform: translateY(-50%);
    }
  }
  .main {
    position: absolute;
    top: 30px;
    bottom: 30px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    transition: all 0.3s linear;
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background: transparent;
    color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    z-index: 10;
    cursor: pointer;
    .footer_arrow {
      position: absolute;
      top: 50%;
      right: 16px;
      display: inline-block;
      font-size: 12px;
      transform: translateY(-50%);
    }
  }
}
</style>
