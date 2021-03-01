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

    <h1>{{ message }}</h1>
    <input v-model="message" />

    <div class="test1">
      <div class="test1_test"></div>
      <div class="test1_test"></div>
      <div class="test1_test"></div>
    </div>

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

    <Steps2 :list="list"></Steps2>

    <a-select
      @change="handleChange"
      ref="select"
      style="width: 120px"
      v-model="valueSelect"
    >
      <a-select-option value="1"> Jack </a-select-option>
      <a-select-option value="2"> Lucy </a-select-option>
      <a-select-option value="3"> Disabled </a-select-option>
      <a-select-option value="4"> yiminghe </a-select-option>
    </a-select>

    <a-tree-select
      v-model="valueTree"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      @search="search"
      @change="change"
    >
      <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
        <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0">
          <a-tree-select-node key="random" value="leaf1" title="my leaf" />
          <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
        </a-tree-select-node>
        <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1">
          <a-tree-select-node key="random3" value="sss">
            <b slot="title" style="color: #08c">sss</b>
          </a-tree-select-node>
        </a-tree-select-node>
      </a-tree-select-node>
    </a-tree-select>

    <Steps3 :testObj="testObj">
      <template #b>
        <div>
          <div>test</div>
          <div>test</div>
        </div>
      </template>
    </Steps3>

    <div v-for="(value, key) in testObj" :key="key">
      {{ value }} ----- {{ key }}
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

    <div id="edit"></div>
    <a-button @click="downloadImg">提交</a-button>
    <a href="" id="download" @click="(e) => e.preventDefault()">下载</a>

    <input type="file" id="file" />
    <!-- <img
      src="https://bf02-1400440145-1303031839.cos.ap-shanghai.myqcloud.com/bf02-1400440145/35b9-qfy-a270db0622554bd7856e5a5e2060f937/qfy-a270db0622554bd7856e5a5e2060f937-LTEwMzI2MTU1NjQ%3D-17134-pexels-benjamin-suter-2362004.jpg"
      alt=""
      @click="
        downloadImgByBlob(
          'https://bf02-1400440145-1303031839.cos.ap-shanghai.myqcloud.com/bf02-1400440145/35b9-qfy-a270db0622554bd7856e5a5e2060f937/qfy-a270db0622554bd7856e5a5e2060f937-LTEwMzI2MTU1NjQ%3D-17134-pexels-benjamin-suter-2362004.jpg'
        )
      "
    /> -->
  </div>
</template>
<script>
import CompositeImage from "composite-image";
import { DownloadImg } from "@/utils/downloadImg";
import { ListForm } from "@/utils/name";
export default {
  name: "hover",
  data() {
    return {
      file: null,
      text: "",
      editor: null,
      value: 1,
      height: 50,
      width: 50,
      status: "",
      valueSelect: "1",
      valueTree: "",
      testObj: {},
      stepsList: [
        { height: 30, content: "测试1" },
        { height: 40, content: "测试2" },
        { content: "测试3" },
      ],
      list: [
        {
          height: 120,
          time: this.$utils.getNowFormatDate(),
          pv: "张子涵",
          user: "杨子荣",
          subtotal: "初次沟通",
        },
        {
          height: 120,
          time: this.$utils.getNowFormatDate(),
          pv: "张子涵",
          user: "杨子荣",
          subtotal: "初次沟通",
        },
        {
          height: 120,
          time: this.$utils.getNowFormatDate(),
          pv: "张子涵",
          user: "杨子荣",
          subtotal:
            "初次沟通 初次沟通 初次沟通 初次沟通 初次沟通 初次沟通 初次沟通 初次沟通",
        },
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
  computed: {
    message: {
      get() {
        return this.value;
      },
      set(value) {
        this.value = Number(value) + 1;
      },
    },
  },
  watch: {
    height(val) {
      this.drow();
    },
    width() {
      this.drow();
    },
    file(val) {
      console.log("val", val);
    },
  },
  created() {},
  mounted() {
    this.xml = `<h1>${this.height}</h1>`;
    this.$nextTick(() => {
      this.file = document.getElementById("file").value;
    });
    // console.log("width", document.documentElement.clientWidth);
    // console.log("width", window.innerWidth);

    this.drow();

    this.editor = new this.$E("#edit");
    this.editor.create();

    let obj = {
      a: 1,
    };
    let obj2 = Object.prototype;

    // Object.defineProperty(obj2, "b", {
    //   get: () => {
    //     return this.height + 1;
    //   },
    //   set: (y) => {
    //     console.log('y',y)
    //     y + 3;
    //   },
    // });

    // let newObj = new Object();
    // newObj.b = 5;
    // console.log("obj", newObj);

    var now = new Date();
    now.setFullYear(2001, 1);
    console.log("now", now);
  },
  methods: {
    downloadImg() {
      let downloadImg = new DownloadImg();
      downloadImg.init(
        "download",
        "https://bf02-1400440145-1303031839.cos.ap-shanghai.myqcloud.com/bf02-1400440145/35b9-qfy-a270db0622554bd7856e5a5e2060f937/qfy-a270db0622554bd7856e5a5e2060f937-LTEwMzI2MTU1NjQ%3D-17134-pexels-benjamin-suter-2362004.jpg"
      );
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    getBase(imgUrl) {
      let that = this;
      window.URL = window.URL || window.webkitURL;
      var xhr = new XMLHttpRequest();
      xhr.open(
        "get",
        "https://bf02-1400440145-1303031839.cos.ap-shanghai.myqcloud.com/bf02-1400440145/35b9-qfy-a270db0622554bd7856e5a5e2060f937/qfy-a270db0622554bd7856e5a5e2060f937-LTEwMzI2MTU1NjQ%3D-17134-pexels-benjamin-suter-2362004.jpg",
        true
      );
      // 至关重要
      xhr.responseType = "blob";
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = async function () {
        if (this.status == 200) {
          //得到一个blob对象
          var content = this.response;
          var blob = new Blob([content]);
          // 至关重要
          let base64 = await that.getBase64(blob);

          var a = document.createElement("a"); // 生成一个a元素
          var event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = base64; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        }
      };
      xhr.send();
    },
    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = async function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/jpeg", 0.7); // 得到图片的base64编码数据
        // var url = await this.getBase64(imgsrc);
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    downloadImgByBlob(url) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // 将img中的内容画到画布上
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // 将画布内容转换为Blob
        canvas.toBlob((blob) => {
          // blob转为同源url0
          var blobUrl = window.URL.createObjectURL(blob);
          // 创建a链接
          var a = document.createElement("a");
          a.href = blobUrl;
          a.download = "";
          // 触发a链接点击事件，浏览器开始下载文件
          a.click();
        });
      };
      img.src = url;
      // 必须设置，否则canvas中的内容无法转换为blob
      img.setAttribute("crossOrigin", "Anonymous");
    },
    search(value) {
      console.log("value", value);
    },
    change(value, label, extra) {
      console.log("value, label, extra", value, label, extra);
    },
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
    handleChange(value, option) {
      console.log(
        "value,option",
        value,
        option.componentOptions.children[0].elm.data.trim()
      );
      console.log(
        "select",
        this.$refs.select.$el.innerText,
        document.getElementById("select").innerText
      );
    },
    handleOn() {
      this.text = this.editor.txt.text();
      console.log("text", this.text);
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
.test1 {
  width: 300px;
  .test1_test {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    &:not(:last-child) {
      background: #3085a3;
    }
    &:last-child {
      background: #000;
    }
  }
}
</style>
