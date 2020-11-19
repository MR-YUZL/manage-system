<template>
  <div class="Collapse">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Collapse",
  props: {},
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(id) {
      this.$nextTick(() => {
        let index = id;
        let mainHeight = this.$children[index].mainHeight + 80;
        let grow = mainHeight / (this.$el.clientHeight / 10);
        this.$children.forEach((v, idx) => {
          if (idx === Number(index)) {
            v.$el.style.flexGrow = grow;
            return;
          }
          v.$el.style.flexGrow = (10 - grow) / 2;
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.Collapse {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
