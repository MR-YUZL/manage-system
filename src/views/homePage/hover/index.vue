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
    <canvas id="myCanvas" :width="800 | numFormat" height="500" class="blur">
      您的浏览器不支持 HTML5 canvas 标签。
    </canvas>
    <a-button-group>
      <a-button icon="minus" @click="decline" />
      <a-button icon="plus" @click="increase" />
    </a-button-group>
  </div>
</template>
<script>
export default {
  name: "hover",
  data() {
    return {
      height: 50,
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
  },
  created() {},
  mounted() {
    this.drow();
  },
  methods: {
    increase() {
      let height = this.height + 10;
      if (height > 100) {
        height = 100;
      }
      this.height = height;
    },
    decline() {
      let height = this.height - 10;
      if (height < 0) {
        height = 0;
      }
      this.height = height;
    },
    drow() {
      let c = document.getElementById("myCanvas");
      let ctx = c.getContext("2d"); //创建一个2d的画笔
      // ctx.beginPath();     //清除路径
      // ctx.clearRect(0, 0, 200, 100);  //清空指定矩形区域
      // ctx.lineWidth = 2;  //线段宽度
      // ctx.moveTo(0, 1);   //开始位置
      // ctx.lineTo(50, 1);  //第二个点的位置
      // ctx.lineTo(50, this.height);
      // ctx.lineTo(100, this.height);
      // ctx.stroke();  //画折线

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
      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(100, 75);
      ctx.lineTo(100, 25);
      // ctx.lineTo(75, 50);
      // ctx.fill()
        ctx.closePath()  //闭合要写在绘制前面
      ctx.stroke();
    
    },
  },
};
</script>
<style lang="less" scoped>
.hover {
  height: 100%;
  width: 100%;
  text-align: center;
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
