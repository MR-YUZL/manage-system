<template>
  <div class="hover">
    <section class="lists">
      <a href="#" class="box">
        <img :src="require('@/assets/logo.png')" />
      </a>
      <a href="#" class="box2">
        <img :src="require('@/assets/logo.png')" />
      </a>
      <a href="#" class="box3">
        <img :src="require('@/assets/logo.png')" />
      </a>
      <a href="#" class="box4">
        <img :src="require('@/assets/logo.png')" />
      </a>
    </section>
    <!-- <section class="lists2">
      <img :src="require('@/assets/logo.png')" alt="" />
      <div class="box5">
        <h3>vue的头像</h3>
        <p>vue的名字</p>
      </div>
    </section> -->

    <div class="flex2">
      <div class="flex2__1">1</div>

      <div class="flex2__2">1</div>
    </div>

    <canvas id="myCanvas" :width="300" :height="150" class="blur">
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
    <a-button-group>
      <a-button icon="minus" @click="decline" />
      <a-button icon="plus" @click="increase" />
    </a-button-group>
    <a-button @click="toOne">跳转</a-button>

    <Steps :current.sync="value">
      <Step
        v-for="(v, index) in stepsList"
        :key="index"
        :index="index"
        :height="v.height"
        :content="v.content"
      />
    </Steps>

    <ListForm
      :list.sync="ListForm"
      :columns="columns"
      style="padding: 14px"
    ></ListForm>
    <div :ref="test" v-for="v in columns" :key="v.key"></div>
    <h1 ref="msg">{{ msg }}</h1>
    <div v-html="xml"></div>
    <a-progress
      :percent="100"
      :success-percent="(1.2 / 2.2) * 100"
      :strokeColor="'#FF7E58'"
    />

    <div class="flex">
      <div class="flex__left">
        <div class="flex__left--first"></div>
        <div class="flex__left--second"></div>
        <div class="flex__left--third"></div>
        <div class="flex__left--fourth"></div>
        <div class="flex__left--fifth"></div>
      </div>
      <div class="flex__right"></div>
    </div>

    <div class="test">
      <div class="test_child"></div>
      <div class="test_child"></div>
      <div class="test_child"></div>
    </div>

    <viewer :images="imgs" style="margin-bottom: 30px">
      <img v-for="src in imgs" :src="src.url" :key="src.title" />
    </viewer>
    <!-- 
    <div id="imgTooles">
      <ul>
        <li v-for="(item,index)in this.imgList " :key="index">
          <img :data-original="`${item}`" :src="item" />
        </li>
      </ul>
    </div> -->

  </div>
</template>
<script>
import { ListForm } from "@/utils/name";
export default {
  name: "hover",
  data() {
    return {
      value: 1,
      height: 50,
      width: 50,
      stepsList: [
        { height: 30, content: "测试1" },
        { height: 40, content: "测试2" },
        { content: "测试3" },
      ],
      imgs: [
        {
          url:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg",
          title: "图片1",
        },
        {
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg",
          title: "图片2",
        },
      ],
      ListForm,
      msg: "测试",
      xml: "",
      columns: [
        {
          title: "地区",
          dataIndex: "cityName",
          width: "25%",
          scopedSlots: { customRender: "cityName" },
        },
        {
          title: "选择规则",
          dataIndex: "rule",
          width: "30%",
          scopedSlots: { customRender: "rule" },
        },
        {
          title: "选择人员",
          dataIndex: "name",
          width: "25%",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "20%",
          align: "center",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  filters: {
    numFormat(val) {
      return val;
    },
  },
  watch: {
    height(val) {
      this.drow();
    },
    width() {
      this.drow();
    },
  },
  created() {},
  mounted() {
    this.xml = `<h1>${this.height}</h1>`;
    this.$nextTick(() => {
      console.log("test", this.$refs["test"]);
    });
    console.log("width", document.documentElement.clientWidth);
    console.log("width", window.innerWidth);

    this.drow();
  },
  methods: {
    test(el) {
      console.log("el", el);
    },
    toOne() {
      this.$router.replace({ path: "/one/123" });
    },
    increase() {
      let height = this.height + 5;
      // if (height > 100) {
      //   height = 100;
      // }
      this.height = height;
    },
    decline() {
      let height = this.height - 5;
      // if (height < 0) {
      //   height = 0;
      // }
      this.height = height;
    },
    drow() {
      let c = document.getElementById("myCanvas");
      if (c.getContext) {
        let ctx = c.getContext("2d"); //创建一个2d的画笔
        ctx.beginPath(); //清除路径
        ctx.clearRect(0, 0, 300, 150); //清空指定矩形区域
        ctx.lineWidth = 2; //线段宽度
        ctx.moveTo(0, 0); //开始位置
        ctx.lineTo(25, 0); //第二个点的位置
        ctx.lineTo(25, this.height);
        ctx.lineTo(50, this.height);
        ctx.stroke(); //画折线

        // ctx.fillStyle = 'rgb(200,0,0)'  //颜色需要在绘制之前
        // ctx.fillRect(10,10,350,300)  //画一个矩形（x，y，width，height）  填充矩形

        // ctx.fillStyle = 'rgba(0,0,200,0.5)'
        // ctx.fillRect(30,30,350,300)

        // ctx.strokeStyle ='rgb(200,0,0)'
        // ctx.strokeRect(10,10,350,300)

        // ctx.strokeStyle ='rgba(0,0,200,0.5)'
        // ctx.strokeRect(30,30,350,300)   //描边矩形

        // ctx.fillRect(30,30,100,100)
        // ctx.clearRect(50,50,60,60)
        // ctx.strokeRect(60,60,40,40)
        // ctx.beginPath();
        // ctx.moveTo(75, 50);
        // ctx.lineTo(100, 75);
        // ctx.lineTo(100, 25);
        // // ctx.lineTo(75, 50);
        // // ctx.fill()
        // ctx.closePath(); //闭合要写在绘制前面
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.arc(50, 50, 40, 0, Math.PI, false); //弧度计算公式，（PI / 180） * deg（角度）
        // ctx.closePath();
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.arc(150, 150, 20, 0, -0, false); //弧度计算公式，（PI / 180） * deg（角度）
        // ctx.fill();

        // ctx.beginPath();
        // ctx.moveTo(50, 50);
        // ctx.arcTo(200, 50, 200, 200, 100);    //控制点1与起点的切线  控制点1和控制点2的切线
        // ctx.lineTo(200, 200);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.rect(50, 50, 10, 10);
        // ctx.rect(200, 50, 10, 10);
        // ctx.rect(200, 200, 10, 10);
        // // ctx.fill();
        // ctx.beginPath();
        // // ctx.clearRect(0, 0, 200, 200);
        // ctx.moveTo(10, 200);
        // ctx.quadraticCurveTo(40, 100, 200, 200);  //二次贝塞尔曲线   moveTo为起点，参数1,2为控制点1  参数3,4为控制点2
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.moveTo(40, 200);
        // ctx.bezierCurveTo(20, 100, 100, 120, 200, 200); //三次贝塞尔曲线
        // ctx.stroke();

        // for (let i = 0; i < 5; i++) {
        //   for (let j = 0; j < 5; j++) {
        //     ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
        //       255 - 30 * j
        //     )},0)`; //floor数字向下取数
        //     ctx.fillRect(j * 50, i * 50, 50, 50);
        //   }
        // }
        // function randomInt(from, to) {
        //   return parseInt(Math.random() * (to - from + 1) + from);
        // }
        // for (let i = 0; i < 5; i++) {
        //   for (let j = 0; j < 5; j++) {
        //     ctx.strokeStyle = `rgb(${randomInt(0, 255)},${Math.floor(
        //       randomInt(0, 255)
        //     )},0)`; //floor数字向下取数
        //     ctx.strokeRect(j * 50, i * 50, 40, 40);
        //   }
        // }

        // ctx.beginPath();
        // ctx.moveTo(110, 20);
        // ctx.lineTo(160, 20);
        // ctx.lineWidth = 40;   //起始点和终点的连线为中心，上下各占线宽一半
        // ctx.stroke();

        // let lineCaps = ["butt", "round", "square"]; //方形  圆形  方形（多增加一段宽度相同，高度为宽度一半的矩形）
        // lineCaps.forEach((v, index) => {
        //   ctx.beginPath();
        //   ctx.moveTo(20 + 30 * index, 30);
        //   ctx.lineTo(20 + 30 * index, 100);
        //   ctx.lineWidth = 20;
        //   ctx.lineCap = v; //线条末端样式
        //   ctx.stroke();
        // });

        // let lineJoin = ["round", "bevel", "miter"]; //圆角  矩形   菱形
        // ctx.lineWidth = 20;

        // lineJoin.forEach((v, index) => {
        //   ctx.beginPath();
        //   ctx.lineJoin = v; //连接拐角处样式
        //   ctx.moveTo(50, 50 + index * 50);
        //   ctx.lineTo(100, 100 + index * 50);
        //   ctx.lineTo(150, 50 + index * 50);
        //   ctx.lineTo(200, 100 + index * 50);
        //   ctx.lineTo(250, 50 + index * 50);
        //   ctx.stroke();
        // });

        // ctx.setLineDash([10, 5]); //参数如果为空，绘制实线，参数为偶数个，[线段长度，间隔长度],多数个亦然，如为基数个，[线段长度],则数组元素复制，变为[线段长度，线段长度(间隔长度)]
        // ctx.lineDashOffset = 10;
        // ctx.beginPath();
        // ctx.moveTo(50, 50);
        // ctx.lineTo(50, 100);
        // ctx.stroke();
        // console.log("setLineDash", ctx.getLineDash());
        // ctx.setLineDash([]);
        // ctx.beginPath();
        // ctx.moveTo(50, 50);
        // ctx.lineTo(150, 50);
        // ctx.stroke();

        // ctx.setLineDash([5]);
        // ctx.strokeRect(200, 200, 100, 100);
        // console.log("setLineDash", ctx.getLineDash());
        // ctx.font = "30px sans-serif"  //文本样式   textAlien文本对齐   textBaseline  基线对齐
        // ctx.fillText("人间正道是沧桑",10,100)
        // ctx.strokeText("人间正道是沧桑",10,200)
        // ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
        // ctx.save(); // 保存默认状态  类似于push()

        // ctx.fillStyle = "red"; // 在原有配置基础上对颜色做改变
        // ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

        // ctx.save(); // 保存当前状态
        // ctx.fillStyle = "#FFF"; // 再次改变颜色配置
        // ctx.fillRect(30, 30, 90, 90); // 使用新的配置绘制一个矩形

        // ctx.restore(); // 重新加载之前的颜色状态  类似于pop()
        // ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形

        // ctx.restore(); // 加载默认颜色配置
        // ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形
        // ctx.save()
        // ctx.translate(100,100)   //移动的是原点位置 所以要在绘制之前 并不是移动图形
        // ctx.strokeRect(0,0,100,100)

        // ctx.restore()
        // ctx.translate(20,20)
        // ctx.fillRect(0,0,10,10)

        // ctx.fillStyle = "red";
        // ctx.save();

        // ctx.translate(100, 100);
        // ctx.rotate((Math.PI / 180) * 45); //以原点来旋转
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, 100, 100);

        // ctx.restore();
        // ctx.translate(0, 0);
        // ctx.scale(2,2)
        // ctx.fillRect(0, 0, 50, 50);

        // ctx.transform(1, 0, 1, 1, 10, 10);  // 水平缩放 水平倾斜 竖直倾斜 竖直缩放 水平位移 竖直位移
        // ctx.fillRect(0, 0, 100, 100);

        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, 200, 200);
        // ctx.globalCompositeOperation = "xor"; //全局合成操作 source-over新图像会进行覆盖 -in仅显示重叠部分（新图）  -out仅显示新老未重叠部分（老图不显示）
        // // -atop显示重叠部分与老图  destination-over老图在上    destination-in 显示重叠部分（老图） destination-out无重叠，显示老图
        // //destination-atop显示老图的重叠部分与新图  lighter重叠部分做处理  darken取重叠部分最黑像素 xor重叠部分透明 copy只保留新图
        // ctx.fillStyle = "red";
        // ctx.fillRect(100, 100, 200, 200);

        // ctx.beginPath();
        // ctx.arc(20, 20, 100, 0, (Math.PI / 180) * 2);
        // ctx.clip();
        // ctx.fillStyle = "pink";
        // ctx.fillRect(20, 20, 100, 100);
        // ctx.beginPath();
        // ctx.moveTo(20,50)
        // ctx.lineTo(50,50)
        // ctx.lineTo(20,20)
        // ctx.clip();   //只显示裁剪内的内容 效果类似于closePath

        // ctx.fillStyle = "pink";
        // ctx.fillRect(20, 20, 100, 100);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.hover {
  height: 100%;
  width: 100%;
  text-align: center;

  .test {
    display: flex;
    justify-content: center;
    height: 80px;
    // width: 2rem;
    width: 10vw;
    .test_child {
      height: 100%;
      border: 1px solid #000;
      margin: 0 0 -1px -1px;
      flex-grow: 1;
    }
  }
  .flex2 {
    width: 5rem;
    height: 200px;
    display: flex;
    justify-content: space-between;
    .flex2__1 {
      width: 1rem;
      height: 100%;
      // flex-grow: 1;
      background: darkseagreen;
    }
    .flex2__2 {
      height: 100%;
      width: 1rem;
      // flex-grow: 1;
      background: darkslateblue;
    }
  }
  .flex {
    width: 300px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    .flex__left {
      width: calc(50% - 30px);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;

      .flex__left--first {
        height: 30%;
        width: 100%;
        padding: 5px;
      }
      .flex__left--second,
      .flex__left--third,
      .flex__left--fourth,
      .flex__left--fifth {
        height: 30%;
        width: calc(50% - 10px);
        padding: 5px;
      }
      .flex__left--first {
        background: cornflowerblue;
      }
      .flex__left--second {
        background: cyan;
      }
      .flex__left--third {
        background: darkblue;
      }
      .flex__left--fourth {
        background: darkgreen;
      }
      .flex__left--fifth {
        background: darksalmon;
      }
    }
    .flex__right {
      width: calc(50% - 30px);
      background: chartreuse;
    }
  }
  .lists {
    display: flex;
    margin-top: 20px;
    justify-content: center;

    .box,
    .box2,
    .box3,
    .box4 {
      width: 100px;
      height: 100px;
      transition: all 0.3s;
      background: #ffffff;
      &:not(:last-child) {
        margin-right: 15px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }

    .box {
      &:hover {
        transform: translateY(-6px);
      }
    }
    .box2 {
      &:hover {
        transform: scale(1.03);
      }
    }
    .box3 {
      overflow: hidden;
      img {
        transition: all 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .box4 {
      img {
        transition: all 0.5s;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    //   .box ~ .box {  //第二个box加外边距
    //     margin-left: 15px;
    //   }

    .lists2 {
      position: relative;
      z-index: 1;
      display: inline-block;
      overflow: hidden;
      background: #3085a3;
      text-align: center;
      cursor:pointer img {
        width: 200px;
        height: 200px;
        opacity: 1;
        transition: opacity 0.35s, transform 0.35s;
        float: left;
      }
      &:hover img {
        opacity: 0.5;
      }
      &:hover h3 {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      &:hover p {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }
      h3 {
        margin-top: 20%;
        transition: transform 0.35s;
        transform: translate3d(0, 20px, 0);
        opacity: 0;
        color: #fff;
        font-size: 16px;
      }
      p {
        margin: 10px 0 0;
        padding: 15px;
        border: 1px solid #fff;
        opacity: 0;
        transition: opacity 0.35s, transform 0.35s;
        transform: translate3d(0, 20px, 0) scale(1.1);
        color: #fff;
      }
      .box5 {
        width: 200px;
        height: 200px;
        padding: 15px;
        position: absolute;
        box-sizing: border-box;
      }
    }
  }
  .blur {
    box-shadow: 0 0 10px #3085a3;
    margin: 0 auto;
  }
}
</style>
