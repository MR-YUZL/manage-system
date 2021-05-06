<template>
  <div class="step">
    <div class="header">
      <a-icon
        type="clock-circle"
        theme="twoTone"
        two-tone-color="#1890ff"
        style="transform: scale(1.5)"
      />
      <div class="line"></div>
    </div>
    <div
      :class="['unFinished']"
      :style="{ marginBottom: `${v.height - 1}px` }"
      v-for="(v, index) in list"
      :key="index"
    >
      <div class="finished"></div>
      <div class="content" style="width: 300px">
        <div class="content_time">
          <div style="vertical-align: top">
            {{ v.time }}
          </div>

          <div class="content_time_icon">
            <span style="cursor: pointer"
              ><a-icon
                type="picture"
                style="margin-right: 10px"
                theme="twoTone"
                two-tone-color="#1890ff"
            /></span>

            <span style="cursor: pointer"
              ><a-icon
                type="play-circle"
                theme="twoTone"
                two-tone-color="#1890ff"
            /></span>
          </div>
        </div>
        <div class="content_item">
          <span>销售联系人:</span>
          <span> {{ v.pv }}</span>
        </div>
        <div class="content_item">
          <span>客户联系人:</span>
          <span> {{ v.user }}</span>
        </div>
        <div class="content_item" :title="v.subtotal">
          <span>联系小记:</span>
          <span class="content_item_text"> {{ v.subtotal }}</span>
        </div>
        <div class="content_item">
          <a-tag color="orange"> 电话联系 </a-tag>
        </div>
      </div>
      <div class="line" :style="{ height: `${v.height}px` }"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "step",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.step {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
  .header {
    position: relative;
    width: 22px;
    height: 22px;
    text-align: center;
    margin-bottom: 25px;
    .line {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0px;
      height: 25px;
      border-left: 1px solid #1890ff;
    }
  }

  .unFinished {
    position: relative;
    left: 11px;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: #fff;
    border: 1px solid #1890ff;
    border-radius: 50%;
    .content {
      position: absolute;
      left: 25px;
      top: -4px;
      text-align: left;
      .content_time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #000;
        margin-bottom: 6px;
        .content_time_icon {
          float: right;
          vertical-align: middle;
        }
      }
      .content_item {
        font-size: 14px;
        color: #555;
        margin-bottom: 6px;
        text-overflow: ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
        white-space: nowrap; /*让文字不换行*/
        overflow: hidden; /*超出要隐藏*/
      }
    }
    .line {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0px;
      border-left: 1px solid#1890ff;
    }
    .finished {
      position: absolute;
      top: 50%;
      left: 2px;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      background: #1890ff;
      border-radius: 50%;
    }
  }
}
</style>
