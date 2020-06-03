<template>
  <div>
    <a-page-header title="服务总览" style="padding:16px 0;" />
    <div class>
      <FormModelSearchForm
        :defaultFormValues="defaultSearchFormValues"
        :formList="searchFormList"
        @prevHandleSubmit="prevHandleSubmit"
      />
    </div>
    <div class="receptionList">
      <ul>
        <li>
          <span class="rece1">总接待量</span>
          <span class="rece2 style1">333</span>
          <span class="rece3">电话接待:333</span>
          <span class="rece3">会话接待:52</span>
        </li>
        <li>
          <span class="rece1">人均通话时长</span>
          <span class="rece2 style2">333</span>
          <span class="rece3">人均呼入时长:333</span>
          <span class="rece3">人均呼出时长:52</span>
        </li>
        <li>
          <span class="rece1">平均会话时长</span>
          <span class="rece2 style3">333</span>
          <span class="rece3">平均首次响应时间:333</span>
          <span class="rece3">平均响应时间:52</span>
        </li>
        <li>
          <span class="rece1">会话满意率</span>
          <span class="rece2 style4">333</span>
          <span class="rece3">参评率:333</span>
        </li>
      </ul>
    </div>
    <a-page-header title="消费概况" style="padding:16px 0;" />
    <div>
      <div id="consumeChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
    <div>
      <div id="receptionChart" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api/customerCenter";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
  data() {
    return {
      searchFormList: [
        {
          type: "rangepicker",
          name: "inputDateStart",
          label: "统计周期"
        },

        {
          type: "select",
          name: "inputAccs",
          label: "技能组",
          mode: "multiple",
          options: [],
          optionValue: "key",
          optionLabel: "id"
        }
      ],
      defaultSearchFormValues: {}
    };
  },
  components: {
    FormModelSearchForm
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("consumeChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["客户发出消息", "访客发出消息", "消息总数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "客户发出消息",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "访客发出消息",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "消息总数",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      });
      window.addEventListener("resize", function() {
        consumeChart.resize();
      });
    },
    prevHandleSubmit(val) {
      //   this.searchParams = Object.assign(
      //     {},
      //     this.searchParams,
      //     this.clueArea,
      //     val
      //   );
      //   this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.receptionList {
  ul {
    display: flex;
    li {
      width: 25%;
      text-align: center;
      span {
        display: block;
      }
      .rece1 {
        font-size: 14px;
        color: #4c4c4c;
      }
      .rece2 {
        font-size: 36px;
        color: #fd6769;
      }
      .style1 {
        color: #3596fd;
      }
      .style2 {
        color: #fe9243;
      }
      .style3 {
        color: #18bc85;
      }
      .style4 {
        color: #fd6769;
      }
      .rece3 {
        font-size: 12px;
        color: #333;
      }
    }
  }
}
</style>