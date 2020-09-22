<!--  -->
<template>
  <div class>
    <message-item
      v-for="message in historyList"
      :key="message.id"
      :message="message"
      :infoObj="infoObj"
    />
  </div>
</template>

<script>
import messageItem from "./message-item";
export default {
  name: "",
  components: {
    messageItem
  },
  props: ["historySessionList", "infoObj"],
  data() {
    return {
      data: {
        id: "LTU4NjQwODQ5NA==",
        sessionId: "LTU2Nzk1NjExOQ==",
        orgId: "qftx",
        imMsgType: "TIMCustomElem",
        subMsgType: "repository",
        sendType: "manual",
        msgContent: {
          text:
            "<span><span>换个个该罚的</span><span><img class='image-look-monitor1' style='max-width:250px;cursor : zoom-in' src='https://img0.pconline.com.cn/pconline/product/1809/28/3.jpg'></span><span><img class='image-look-monitor1' style='max-width:250px;cursor : zoom-in' src='https://img0.pconline.com.cn/pconline/product/1809/28/3.jpg'></span><span>豆腐干计划调节</span></span>"
        },
        fromAccount: "13800571550",
        toAccount: "13800571501",
        msgRandom: 4259378746,
        msgSeq: 64993,
        msgTime: 1587460051000,
        msgKey: "64993_4259378746_1587460051"
      }
    };
  },
  computed: {
    historyList() {
      // console.log('this.historySessionList',this.historySessionList)
      // let arr = [...this.historySessionList, this.data];
      let arr = [...this.historySessionList];
      arr.forEach(item => {
        item.msgContent =
          typeof item.msgContent == "string"
            ? JSON.parse(item.msgContent)
            : item.msgContent;
      });
      console.log(arr);
      return this.infoObj ? arr : arr.reverse();
      // return arr.reverse()
    }
  },
  watch: {},
  //方法集合
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
