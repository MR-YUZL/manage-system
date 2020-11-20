<template>
  <div class="layout">
    <section class="leftNav">
      <Collapse>
        <CollapsePanel
          :header="header1"
          :id="0"
          :edit="true"
          style="flex-grow: 3"
        >
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

        <CollapsePanel :header="header2" :id="1" style="flex-grow: 5">
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

        <CollapsePanel
          :header="header3"
          :id="2"
          :edit="true"
          style="flex-grow: 2"
        >
          <div class="body"></div>
        </CollapsePanel>
      </Collapse>
    </section>
    <section class="middle">
      <div style="display: flex; width: 100%">
        <PieCharts2
          class="pCharts"
          :chartsData="pieData"
          :title="pieTitle"
          :width="'50%'"
          @getInfo="getInfo"
        ></PieCharts2>
        <BarCharts2 :dataList="dataList"></BarCharts2>
      </div>

      <LineCharts2
        class="lCharts"
        :chartsData="chartsData"
        :title="lineTitle"
        :xAxis="xAxisLine"
      ></LineCharts2>
    </section>
    <section class="rightNav"></section>
  </div>
</template>
<script>
import { GetLineData, GetPieData } from "@/api/five";
import { LineCharts2, PieCharts2, BarCharts2 } from "@/chartsComponents";
export default {
  name: "layout",
  props: {},
  components: {
    LineCharts2,
    PieCharts2,
    BarCharts2,
  },
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
      chartsData: [],
      xAxisLine: [],
      lineTitle: "消费趋势",
      pieData: [],
      dataList: ["40%", "20%", "15%", "5%", "20%"],
      pieTitle: "",
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.requestLine();
      this.requestPie();
    },
    requestLine() {
      GetLineData({ charts: this.lineTitle }).then((res) => {
        if (res.code === 200) {
          let data = res.result;
          this.xAxisLine = data.lineX;
          this.chartsData = data.line;
        }
      });
    },
    requestPie() {
      GetPieData({ charts: this.pieTitle }).then((res) => {
        if (res.code === 200) {
          let data = res.result;
          this.pieData = data.pie;
        }
      });
    },
    getInfo(id) {
      console.log("id", id);
    },
  },
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
    .shadow-mixin() {
      box-shadow: 0 0 10px #a2a2a2;
    }
    .lCharts {
      background: #fff;
      margin-top: 30px;
      padding: 30px 0;
      .shadow-mixin;
    }
  }
}
</style>
