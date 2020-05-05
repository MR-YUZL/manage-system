<template>
  <div class="userInf">
    <div class="left">
        <img :src="require('./../../../../assets/imgs/current_session/app.png')" alt="">
        <div>
            <div class="name">科比布莱恩特</div>
            <a-icon type="down" />
            <!-- <a-icon type="up" /> -->
        </div>
        
        <div class="time">当前会话时长：{{'5分6秒'}}</div>
    </div>
    
    <div class="right">
        <span>转接</span>
        <span >新增工单</span>
        <span >结束服务</span>
    </div>
  </div>
</template>

<script>
// import sessionList from "./sessionList/index"

export default {
  data: () => ({
    

    
 
  }),
  components: {
    
  },
  mounted() {
    
  },
  methods: {
   
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
    .userInf{
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #E7E7E8;
        padding: 0 0 0 10px;
        .left{
            display: flex;
            align-items: center;
            img{
                width: 22px;
                height: 22px;
                
            }
            .name{
                min-width: 0px;
                max-width: 82px;
                overflow: hidden;
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 5px;
            }
            .time{
                // min-width: 0px;
                // overflow: hidden;
                // -webkit-box-flex: 1;
                // -ms-flex: 1;
                // flex: 1;
                // text-overflow: ellipsis;
                // white-space: nowrap;
                // margin-left: 10px;
            }
        }
        .right{
            span{
                margin: 0 10px;
                color: #3E7BF8;
                border-bottom: 1px solid #3E7BF8;
                cursor: pointer;
            }
        }
    }
</style>
