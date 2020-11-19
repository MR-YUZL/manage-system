<template>
  <div class="layout">
    <section class="leftNav">
      <Collapse>
        <CollapsePanel :header="header1" :id="0" :edit="true" style="flex-grow:3">
          <div class="body">
            <div class="body_name">{{ name }}</div>
            <div
              class="body_content"
              v-for="(v, index) in contentList"
              :key="index"
            >
              <span>{{ v.field }}</span>
              <span> {{ v.content }}</span>
            </div>
          </div>
          <template #footer>
            <a-divider />
          </template>
        </CollapsePanel>

        <CollapsePanel :header="header2" :id="1" style="flex-grow:5">
          <div class="body">
            <div class="body_title">
              {{ title }}
              <a-tag color="pink" class="body_title_tag"> pink </a-tag>
            </div>
            <div
              class="body_content"
              v-for="(v, index) in contentList"
              :key="index"
            >
              <span>{{ v.field }}</span>
              <span> {{ v.content }}</span>
            </div>
          </div>
          <div class="body">
            <div class="body_title">
              {{ title }}
              <a-tag color="pink" class="body_title_tag"> pink </a-tag>
            </div>
            <div
              class="body_content"
              v-for="(v, index) in contentList"
              :key="index"
            >
              <span>{{ v.field }}</span>
              <span> {{ v.content }}</span>
            </div>
          </div>
          <template #footer>
            <a-divider />
          </template>
        </CollapsePanel>

        <CollapsePanel :header="header3" :id="2" :edit="true" style="flex-grow:2">
          <div class="body"></div>
        </CollapsePanel>
      </Collapse>
    </section>
    <section class="middle"></section>
    <section class="rightNav"></section>
  </div>
</template>
<script>
export default {
  name: "layout",
  props: {},
  components: {},
  data() {
    return {
      name: "浙江卓越科技有限公司",
      header1: "公司信息",
      header2: "历史商机",
      header3: "客户画像",
      title: "领航版50套",
      contentList: [
        { field: "资源分组", content: "资源二组" },
        { field: "所属行业", content: "资源二组" },
        { field: "联系地址", content: "资源二组" },
        { field: "资源备注", content: "资源二组" },
      ],
    };
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.one.style.height = "100px";
    //   this.$refs.two.style.flexGrow = 1;
    //   this.$refs.three.style.flexGrow = 1;
    // });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.layout {
  position: relative;
  height: 100%;
  width: 100%;
  .leftNav {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #fff;
    .body {
      width: 100%;
      .body_title {
        position: relative;
        font-size: 16px;
        margin: 10px 6px;
        .body_title_tag {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
      .body_name {
        margin: 10px 6px;
        font-size: 16px;
        color: #000;
      }

      .body_content {
        font-size: 14px;
        margin: 10px 6px;
      }
    }
  }
  .rightNav {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background-color: gray;
  }
  .middle {
    margin-left: 210px;
    margin-right: 210px;
    background-color: lightgray;
    height: 100%;
  }
}
</style>
