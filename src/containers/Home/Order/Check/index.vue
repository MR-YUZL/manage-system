<template>
  <div class="statistics">
    <div v-for="(item,index) in dataList" :key="index" class="details">
      <div class="details_title">
        <h3>{{item.title}} </h3>
        <p>{{item.number}}</p>
        <span v-if="item.toolip">
            <a-tooltip placement="top">
            <template slot="title">
              <span>{{item.toolip}}</span>
            </template>
            <a-button>RT</a-button>
          </a-tooltip></span>
      </div>
      <div class="details_content">
        <div>
          <span>{{item.content_top}}</span><span>{{item.content_top_num}}</span>
        </div>
        <div>
          <span>{{item.content_bottom}}</span><span>{{item.content_bottom_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./index.less";
export default {
  data: () => ({
    dataList:[
      {
        title:'话务总量',
        number:'39',
        content_top:'接入量/已接',
        content_top_num:'20/17',
        content_bottom:'呼出量/已接',
        content_bottom_num:'19/2'
      },{
        title:'话务总量',
        number:'39',
        content_top:'接入量/已接',
        content_top_num:'20/17',
        toolip:'测绘师'
        // content_bottom:'呼出量/已接',
        // content_bottom_num:'19/2'
      },{
        title:'话务总量',
        number:'39',
        // content_top:'接入量/已接',
        // content_top_num:'20/17',
        // content_bottom:'呼出量/已接',
        // content_bottom_num:'19/2'
      }
    ]
  }),
  components: {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
  .statistics{
    display: flex;
    justify-content: space-between;
    .details{
      width: 300px;
      height:200px;
      text-align: center;
      border: 1px solid black;
      
      .details_title{
        height:120px;
        border-bottom: 1px solid black;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        &>p,&>h3{
          width: 300px;
        }
      }
      .details_content{
        display: flex;
        flex-wrap: wrap;
        height: 80px;
        align-content: center;
        &>div{
          width: 100%;
          padding: 5px 0;
        }
      }
    }
  }
</style>