<template>
  <div>
    <a-button type="primary" v-permission:add> 提交 </a-button>
    <a-button type="primary" @click="(e) => $emit('test', e)">测试</a-button>

    <h1 class="">第三页的孩子</h1>

    <a-button @click="recorderStart">录音</a-button>
    <a-button @click="pause">暂停</a-button>
    <a-button @click="resume">继续</a-button>
    <a-button @click="recorderStop">停止</a-button>
    {{ duration }}
    <canvas id="canvas"></canvas>
    <a-button @click="this.playRecord">
      录音播放
    </a-button>
    <a-button @click="this.pausePlay">
      暂停播放
    </a-button>
    <a-button @click="this.resumePlay">
      恢复播放
    </a-button>
    <a-button @click="this.stopPlay">
      停止播放
    </a-button>
    <a-button @click="downloadMP3">下载mp3</a-button>
  </div>
</template>
<script>
import Recorder from "js-audio-recorder";
const lamejs = require("lamejs");

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      recorder: null,
      drawRecordId: null,
      duration: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    playRecord() {
      this.recorder && this.recorder.play();
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
      console.log("播放录音");
    },
    pausePlay() {
      this.recorder && this.recorder.pausePlay();
      console.log("暂停播放");
    },
    resumePlay() {
      this.recorder && this.recorder.resumePlay();
      console.log("恢复播放");
    },
    stopPlay() {
      this.recorder && this.recorder.stopPlay();
      console.log("停止播放");
    },
    clearPlay() {
      if (this.recorder) {
        return new Promise((resolve) => {
          this.recorder.destroy().then(() => {
            console.log("销毁实例");
            this.recorder = null;
            this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
            resolve();
          });
        });
      }
    },
    async recorderStart() {
      await this.clearPlay();

      const config = {};

      if (!this.recorder) {
        this.recorder = new Recorder();

        this.recorder.onprogress = (params) => {
          this.duration = params.duration.toFixed(1);
        };
      }

      this.recorder.start().then(
        () => {
          console.log("开始录音");
        },
        (error) => {
          console.log(`异常了,${error.name}:${error.message}`);
        }
      );
      this.drawRecord();
    },
    drawRecord() {
      this.oCanvas = document.getElementById("canvas");
      let ctx = this.oCanvas.getContext("2d");
      // 用requestAnimationFrame稳定60fps绘制
      this.drawRecordId = requestAnimationFrame(this.drawRecord);

      // 实时获取音频大小数据
      let dataArray = this.recorder.getRecordAnalyseData(),
        bufferLength = dataArray.length;

      // 填充背景色
      ctx.fillStyle = "rgb(200, 200, 200)";
      ctx.fillRect(0, 0, this.oCanvas.width, this.oCanvas.height);

      // 设定波形绘制颜色
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(0, 0, 0)";

      ctx.beginPath();

      var sliceWidth = (this.oCanvas.width * 1.0) / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
        x = 0; // 绘制点的x轴位置

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * this.oCanvas.height) / 2;

        if (i === 0) {
          // 第一个点
          ctx.moveTo(x, y);
        } else {
          // 剩余的点
          ctx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
      }

      ctx.lineTo(this.oCanvas.width, this.oCanvas.height / 2);
      ctx.stroke();
    },
    pause() {
      if (this.recorder) {
        this.recorder.pause();
        console.log("暂停录音");
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
        this.drawRecordId = null;
      }
    },
    resume() {
      this.recorder && this.recorder.resume();
    },
    recorderStop() {
      this.recorder && this.recorder.stop();
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
    },
    downloadMP3() {
      if (this.recorder) {
        const mp3Blob = this.convertToMp3(this.recorder.getWAV());
        console.log("mp3Blob", mp3Blob);

        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(mp3Blob);
        downloadElement.href = href;
        downloadElement.download = "aaa.mp3";
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement);
        // recorder.download(mp3Blob, "recorder", "mp3");
      }
    },
    convertToMp3(wavDataView) {
      // 获取wav头信息
      const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
      const { channels, sampleRate } = wav;
      console.log("wav", wav);
      const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
      // 获取左右通道数据
      const result = this.recorder.getChannelData();
      const buffer = [];

      const leftData =
        result.left &&
        new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
      const rightData =
        result.right &&
        new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
      const remaining = leftData.length + (rightData ? rightData.length : 0);

      const maxSamples = 1152;
      for (let i = 0; i < remaining; i += maxSamples) {
        const left = leftData.subarray(i, i + maxSamples);
        let right = null;
        let mp3buf = null;

        if (channels === 2) {
          right = rightData.subarray(i, i + maxSamples);
          mp3buf = mp3enc.encodeBuffer(left, right);
        } else {
          mp3buf = mp3enc.encodeBuffer(left);
        }

        if (mp3buf.length > 0) {
          buffer.push(mp3buf);
        }
      }

      const enc = mp3enc.flush();

      if (enc.length > 0) {
        buffer.push(enc);
      }

      return new Blob(buffer, { type: "audio/mp3" });
    },
  },
};
</script>
<style lang="less" scoped></style>
