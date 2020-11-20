<template>
  <div class="container">
    <ChinaMap2 :mapData="mapData2"></ChinaMap2>
    <div>
      <a-button type="primary" @click="(e) => handleClick(e)" value="北京">
        北京
      </a-button>
      <a-button type="primary" @click="(e) => handleClick(e)" value="上海">
        上海
      </a-button>
      <a-button type="primary" @click="(e) => handleClick(e)" value="广州">
        广州
      </a-button>
    </div>
    <div>
      {{ num | numFormat(1) }}
      <input type="text" :value="num | numFormat" />
    </div>
  </div>
</template>
<script>
import { ChinaMap2 } from "@/chartsComponents";
import { GetMapData } from "@/api/five";
export default {
  name: "echartsMap",
  data() {
    return {
      data: "北京",
      mapData: [],
      num: 50,
      mapData2: [
        {
          name: "上海",
          value: 18163,
        },
        {
          name: "重庆",
          value: 26,
        },
        {
          name: "北京",
          value: 395,
        },
        {
          name: "浙江",
          value: 285,
        },
        {
          name: "山西",
          value: 152,
        },
        {
          name: "河南",
          value: 261,
        },
          {
          name: "云南",
          value: 10,
        },
             {
          name: "广州",
          value: 0,
        },
      ],
    };
  },
  filters: {
    numFormat(val, value = 0) {
      //   console.log("value", value);
      return val - 10 - value;
    },
  },
  created() {},
  mounted() {
    this.requestMap();
  },
  methods: {
    handleClick(e) {
      this.data = e.target.innerText.replace(" ", ""); //拿到dom中的文本，并删除空格
      this.requestMap();
    },
    requestMap() {
      GetMapData({ data: this.data }).then((res) => {
        if (res.code === 200) {
          let arr = res.result;
          this.mapData = arr;
        }
      });
    },
  },
  components: {
    ChinaMap2,
  },
};
</script>
<style lang="less" scoped>
.shadow-mixin() {
  box-shadow: 0 0 10px #a2a2a2;
}
.container {
  width: 100%;
  height: 100%;
  background: #ffffff;
  .shadow-mixin;
}
</style>
