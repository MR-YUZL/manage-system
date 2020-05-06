<template>
  <div class="userInf">
    <div class="content">
        <div class="left">
            <img :src="require('./../../../../assets/imgs/current_session/app.png')" alt="">
            <div class="user" @click="userInf">
                <div class="name">科比布莱恩特</div>
                <a-icon :type="isShow ? 'up' : 'down'" />
            </div>
            
            <div class="time">当前会话时长：{{'5分6秒'}}</div>
            
        </div>
        
        <div class="right">
            <span>转接</span>
            <span >新增工单</span>
            <span >结束服务</span>
        </div>
    </div>
    <User />
    <Tags />
  </div>
</template>

<script>
// import sessionList from "./sessionList/index"
import User from './../../../../components/userInf'
import Tags from './../../../../components/userInf/tags'
export default {
  data: () => ({
    isShow:false

    
 
  }),
  components: {
    User,
    Tags
  },
  mounted() {
    
  },
  methods: {
    userInf(){
        this.isShow = !this.isShow
    }
  },
  watch: {},
  computed: {
    
  }
};
</script>
<style lang="less" scoped>
    .userInf{
       .content{
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
                .user{
                display: flex;
                    align-items: center; 
                    cursor: pointer;
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
                }
                
                .time{
                    margin-left: 20px;
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
    }
</style>
