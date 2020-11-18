<template>
  <div class="Steps" @click="handClick">
    <slot></slot>

    <div class="finished" :style="{ top: height }">
      <div class="dialog">
        <div class="dialog_content">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Steps",
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  components: {},
  data() {
    return {
      stepsNum: 1,
      cellHeight: [],
      content: "",
    };
  }, 
  computed: {
    height() {
      let height =
        this.cellHeight
          .slice(0, this.current)
          .reduce((per, cur) => cur + per, 0) +
        this.current * 9;
      return `-${94 - height}px`;
    },
  },
  created() {},
  mounted() {
    this.stepsNum = this.$children.length;
    this.cellHeight = this.$children.reduce(
      (per, cur) => (cur.height ? [...per, cur.height] : [...per]),
      []
    );
    this.$nextTick(()=> {
      console.log('this.$children[0]',this.$children[0].$el.clientHeight)
    })
  },
  methods: {
    handClick(e) {
      let id = e.target.id;
      if (!(parseFloat(id).toString() == "NaN")) {
        this.$emit("update:current", Number(id));
        this.$children.forEach((v) => {
          v.current = Number(id);
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Steps {
  margin: 4px;
  .finished {
    position: relative;
    left: 3px;
    width: 4px;
    height: 4px;
    background: #000;
    border: 1px solid #000;
    border-radius: 50%;
    transition: all 0.3s linear;
    .dialog {
      position: absolute;
      top: -9px;
      left: 14px;
      width: 100px;
      height: 50px;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 5px;
      background: #fff;
      .dialog_content {
        font-size: 12px;
        color: #000;
        text-align: left;
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
      }
      &::before {
        top: 3px;
        left: -6px;
        border-right: 6px solid #000;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
      }
      &::after {
        left: -5px;
        top: 4px;
        border-right: 5px solid #fff;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
  }
}
</style>
