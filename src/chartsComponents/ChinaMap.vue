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
      geoCoordMap,
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
    convertData(data = []) {
      //处理路线所需要的数据结构
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = this.geoCoordMap[dataItem.from]; //起始城市的坐标
        let toCoord = this.geoCoordMap[dataItem.to]; //到达城市的坐标
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.from, //起始城市名
            toName: dataItem.to, //到达城市名
            coords: [fromCoord, toCoord], //两点坐标
          });
        }
      }
      return res;
    },
    regionData(data = []) {
      //给特定区域配置样式
      let res = [];
      data.forEach((item) => {
        res.push({
          name: item.province, //区块名称
          itemStyle: {
            borderColor: "rgba(33, 33, 33, 0.7)",
            shadowColor: "rgba(128, 217, 248, 1)",
            borderWidth: 2,
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 20,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(43, 186, 184, 0.1)", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(43, 186, 184, 0.2)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(43, 186, 184, 0.4)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "24",
              color: "rgb(255,255,255)",
            },
            itemStyle: {
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(249, 208, 0, 0.1)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(249, 208, 0, 0.4)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(249, 208, 0, 0.6)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              }, //  "rgba(249, 208, 0, 0.4)",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 3,
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 20,
              borderColor: "rgba(249, 208, 0, 1)",
            },
          },
        });
      });
      return res;
    },
    _setOption(data = []) {
      this.$echarts.registerMap("map", this.mapType);
      let options = {
        backgroundColor: "#404a59",
        title: {
          text: "每日货盘运行图",
          left: "center",
          top: 30,
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
        },
        geo: {
          // 这个是重点配置区
          map: "map", // 表示中国地图
          roam: false,
          layoutCenter: ["50%", "50%"],
          layoutSize: "100%",
          regions: this.regionData(data),
          label: {
            emphasis: {
              show: true,
              color: "#adadad",
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: "radial", //环形渐变
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(43, 186, 184, 0.1)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(43, 186, 184, 0.2)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(43, 186, 184, 0.4)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              }, //静止状态下省区的区域颜色
              borderColor: "rgba(33, 33, 33, 0.7)", //边界颜色
            },
            emphasis: {
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(249, 208, 0, 0.1)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(249, 208, 0, 0.4)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(249, 208, 0, 0.6)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              }, //鼠标悬浮时省区的区域颜色
              shadowOffsetX: 0, //阴影偏距
              shadowOffsetY: 0,
              shadowBlur: 20, //阴影范围
              borderWidth: 0,
              shadowColor: "rgba(249, 208, 0, 1)", //阴影颜色
            },
          },
        },
        series: [
          {
            type: "lines", //尾气
            zlevel: 1, //所有带尾迹特效的图表需要单独放一个层,同时应关闭该层animation，不然有可能和同层的动画产生不必要的残影
            effect: {
              //显示特效
              show: true,
              period: 6, //特效时间
              trailLength: 0.7, //尾迹长度
              color: "#fff",
              symbolSize: 3, //标记大小
            },
            animation: false,
            lineStyle: {
              normal: {
                color: "#000",
                width: 0,
                curveness: 0.2, //边的曲度
              },
            },
            data: this.convertData(data),
          },
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol:
                "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
              symbolSize: 18,
            },
            lineStyle: {
              normal: {
                type: "dashed",
                color: "#a6c84c",
                width: 1, //图标的行动轨迹
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            tooltip: {
              trigger: "item",
            },
            data: this.convertData(data),
          },
          {
            name: "收货地址",
            type: "effectScatter", //带特效的散点图
            coordinateSystem: "geo", //极坐标轴
            zlevel: 2,
            rippleEffect: {
              //特效配置  大小，颜色，时间
              brushType: "stroke", //绘制方式
            },
            tooltip: {
              trigger: "item", //tip的复杂样式可以用原生dom写
              formatter: function (params) {
                let lable = params.seriesName;
                let cityName = params.name;
                let coords = params.value.slice(0, 2);
                let value = params.value.slice(-1);
                return `
                <div style="height:20px;line-height:20px;width:100%;padding:3px">
                  <span>${lable}<span>
                  <span style="float:right">${cityName}</span>
                <div>
                <div style="height:20px;line-height:20px;background:#1FE284;color:#000;padding:0px 5px">
                ${coords[0]} :  ${coords[1]}
                </div>
                <div style="height:20px;line-height:20px;width:100%;padding:3px">
                  <span>数量<span>
                  <span style="float:right">${value[0]}件</span>
                </div>
                `;
              },
            },
            label: {
              //标签的位置和偏移
              normal: {
                show: true,
                position: "left",
                offset: [-5, 5], //标签的复杂样式需通过富文本来构建
                formatter: "{b}",
              },
              emphasis: {
                show: true,
              },
            },
            hoverAnimation: true, //悬浮特效
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              normal: {
                // show: false,
                color: "#a6c84c",
              },
            },
            data: data.map((v) => {
              return {
                name: v.to,
                value: this.geoCoordMap[v.to].concat([v.value]),
              };
            }),
          },
          {
            name: "发送地址",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            tooltip: {
              trigger: "item",
            },
            label: {
              normal: {
                show: true,
                position: "left",
                offset: [-5, 5],
                formatter: (params) => {
                  return params.name;
                },
              },
              emphasis: {
                show: true,
              },
            },
            hoverAnimation: true,
            symbol: "circle",
            symbolSize: 1,
            itemStyle: {
              normal: {
                color: "#fff",
              },
            },
            data: data.slice(-1).map((v) => {
              return {
                name: v.from,
                value: this.geoCoordMap[v.from],
              };
            }),
          },
        ],
      };
      this.map.on("click", (params) => {
        if (params.name === "浙江") {
          this.mapType = zj;
          this._setOption();
        }
      });
      this.map.setOption(options);
    },
  },
};
</script>
<style lang="less" scoped></style>
