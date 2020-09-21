<!--  -->
<template>
  <div class>
    <message-item v-for="message in historyList" :key="message.id" :message="message" :infoObj="infoObj"/>
  </div>
</template>

<script>
import messageItem from "./message-item";
export default {
  name: "",
  components: {
    messageItem
  },
  props:['historySessionList','infoObj'],
  data() {
    return {
     
    };
  },
  computed: {
    historyList(){
      // console.log('this.historySessionList',this.historySessionList)
      let arr = [...this.historySessionList]
       arr.forEach(item => {
      
         item.msgContent = typeof item.msgContent =="string" ? JSON.parse(item.msgContent)
                : item.msgContent;
        });
        
        return this.infoObj ? arr : arr.reverse()
        // return arr.reverse()
    },
  },
  watch: {},
  //方法集合
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
</style>