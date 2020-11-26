<template>
  <div :style="{ width, height }" ref="map"></div>
</template>
<script>
import { geoCoordMap } from "@/utils/name";
import china from "echarts/map/json/china.json";
import zj from "echarts/map/json/province/zhejiang.json";
export default {
  name: "ChinaMap",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    mapData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      map: null,
      mapType: china,
      geoCoordMap: Object.freeze(Object.assign({}, geoCoordMap)),
      // geoCoordMap,
    };
  },
  watch: {
    mapData: {
      handler(val) {
        this._setOption(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      this.initMap();
    });
  },
  methods: {
    initMap() {
      this.map = this.$echarts.init(this.$refs.map);

      if (this.mapData.length) {
        this._setOption(this.mapData);
      }
    },

    _setOption(data = []) {
      this.$echarts.registerMap("map", this.mapType);
      let options = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}",
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            {
              min: 101,
              color: "rgb(51,197,246)",
            },
            {
              min: 11,
              max: 100,
              color: "rgb(134,221,251)",
            },
            {
              min: 1,
              max: 10,
              color: "rgb(176,233,252)",
            },
            {
              value: 0,
              color: "rgb(217,244,255)",
            },
          ],
          orient: "vertical",
          itemWidth: 25,
          itemHeight: 15,
          showLabel: true,
          seriesIndex: [0],

          textStyle: {
            color: "#7B93A7",
          },
          bottom: "10%",
          left: "5%",
        },
        geo: {
          // 这个是重点配置区
          map: "map", // 表示中国地图
          roam: false,
          layoutCenter: ["50%", "50%"],
          layoutSize: "100%",
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0,63,140,0.2)",
              shadowColor: "rgba(0,63,140,0.2)",
              // shadowOffsetY: 20,
              // shadowBlur: 30,
              borderColor: "#fff",
              borderWidth: 1,
            },
          },
          emphasis: {
            itemStyle: {
              areaColor: "rgba(51,197,246,0.7)",
            },
          },
        },
        series: [
          {
            name: "",
            type: "map",
            map: "china",
            roam: false,
            geoIndex: 0,
            label: {
              show: false,
            },
            data,
          },
        ],
      };
      this.map.setOption(options);
    },
  },
};
</script>
<style lang="less" scoped></style>
