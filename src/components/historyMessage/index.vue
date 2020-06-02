<!--  -->
<template>
  <div class>
    <message-item v-for="message in historyList" :key="message.id" :message="message" />
  </div>
</template>

<script>
import messageItem from "./message-item";
export default {
  name: "",
  components: {
    messageItem
  },
  data() {
    return {
      historyList: [
        {
          id: "MjA4MTQ1NTM1Ng==",
          sessionId: "LTEzNDEyMzA3NDU=",
          orgId: "qftx",
          imMsgType: "TIMTextElem",
          sendType: "manual",
          msgContent: {
            text: "a new msg"
          },
          fromAccount: "13800571550",
          toAccount: "13800571501",
          msgRandom: 4259378746,
          msgSeq: 64993,
          msgTime: 1587460051000,
          msgKey: "64993_4259378746_1587460051"
        },

        {
          id: "MTg5OTg4NjIxMw==",
          sessionId: "LTIwMTc1OTg5OTk=",
          orgId: "qftx",
          imMsgType: "TIMFileElem",
          sendType: "manual",
          msgContent: {
            fileSize: 0,
            fileName: "log.txt",
            download_Flag: 2,
            uuid: "1400328287_13800571500_43516bc24525e9681bf416265d0f2a68.txt",
            url:
              "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/b1d8-13800571500/43516bc24525e9681bf416265d0f2a68.txt"
          },
          fromAccount: "13800571550",
          toAccount: "13800571501",
          msgRandom: 4259378746,
          msgSeq: 64993,
          msgTime: 1587460051000,
          msgKey: "64993_4259378746_1587460051"
        },
        //图片类消息：
        {
          id: "LTQ1MTIxODMzMw==",
          sessionId: "MTMxNTE3NTE5MA==",
          orgId: "qftx",
          imMsgType: "TIMImageElem",
          sendType: "manual",
          msgContent: {
            uuid: "1400328287_13800571550_25d4cbf976c1301132635a452df68eb4.jpg",
            imageFormat: 1,
            imageInfoArray: [
              {
                type: 1,
                size: 3486160,
                width: 2736,
                height: 3648,
                url:
                  "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/6844-13800571550/25d4cbf976c1301132635a452df68eb4.jpg"
              },
              {
                type: 2,
                size: 0,
                width: 0,
                height: 0,
                url:
                  "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/6844-13800571550/25d4cbf976c1301132635a452df68eb4.jpg?imageView2/3/w/720/h/720"
              },
              {
                type: 3,
                size: 0,
                width: 198,
                height: 264,
                url:
                  "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/6844-13800571550/25d4cbf976c1301132635a452df68eb4.jpg?imageView2/3/w/198/h/198"
              }
            ]
          },
          fromAccount: "13800571550",
          toAccount: "13800571501",
          msgRandom: 4259378746,
          msgSeq: 64993,
          msgTime: 1587460051000,
          msgKey: "64993_4259378746_1587460051"
        },
        //视频类消息：
        {
          id: "LTY3Mjg1MTY0NQ==",
          sessionId: "MTMxNjIxNzg3NQ==",
          orgId: "qftx",
          imMsgType: "TIMVideoFileElem",
          sendType: "manual",
          msgContent: {
            videoSize: 46840761,
            videoSecond: 600,
            videoFormat: "mp4",
            thumbSize: 803917,
            thumbWidth: 200,
            thumbHeight: 200,
            thumbFormat: "",
            videoDownloadFlag: 2,
            videoUUID:
              "1400328287_13800571550_951ee7cb8ceacd39f215adf26216c76d.mp4",
            videoUrl:
              "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/6844-13800571550/951ee7cb8ceacd39f215adf26216c76d.mp4",
            thumbDownloadFlag: 2,
            thumbUUID:
              "1400328287_13800571550_bcec9b85500af401eb5f9c52fa94068f.jpg",
            thumbUrl:
              "https://cos.ap-shanghai.myqcloud.com/7923-shanghai-007-shared-04-1256635546/7693-1400328287/6844-13800571550/bcec9b85500af401eb5f9c52fa94068f.jpg"
          },
          fromAccount: "13800571550",
          toAccount: "13800571501",
          msgRandom: 4259378746,
          msgSeq: 64993,
          msgTime: 1587460051000,
          msgKey: "64993_4259378746_1587460051"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
</style>