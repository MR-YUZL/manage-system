<!-- 外呼任务 -->
<template>
    <div class='outCallTask scroll'>
        <div v-if="outCallTaskList && outCallTaskList.length">
             <div v-for="(item,index) in outCallTaskList" :key="index" class="outCallTask_item"  @click="selectCallInf(index)" :class="{ 'choose': index == select }">
                <div><span>{{item.telephone}}</span><span :class="item.taskStatus == 0 ? 'pending':'expired'">{{item.taskStatus == 0 ? '待处理' : '已过期'}}</span></div>
                <div>{{item.appointmentsTime}}</div>
                <div>{{item.remark}}</div>
            </div>
        </div>
        <div class="noData" v-else>
            <img src="./../../../../assets/imgs/noData.png" alt="">
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
name:'outCallTask',
components: {},
data() {
    return {
        select:0,
        outCallTaskList:[]
    };
},
computed: {
    ...mapState({
        outCallStatus : state => state.basic.outCallStatus
    })
},
watch: {
   outCallStatus(newVal,oldVal){
       if(!newVal){
           this.getRecentCallsList()
       }
   } 
},
//方法集合
methods: {
    //获取外呼列表
        getRecentCallsList(){
            this.outCallTaskList = []
             this.Request.get('/hfw/workbench/getCallOutTask').then(res => {
                  if(res.data.status){
                      res.data.list.map(item => {
                          if(item.taskStatus == 0 || item.taskStatus == 2){
                              this.outCallTaskList.push(item)
                          }
                      })
                        this.select = 0
                        this.$store.commit('getOutCallTask',this.outCallTaskList[0])
                  }
            }) 
        },
        selectCallInf(index){
            this.select = index
            this.$store.commit('getOutCallTask',this.outCallTaskList[index])
        },
      
},
created() {

},
mounted() {
    this.getRecentCallsList()
},
}
</script>
<style lang='less' scoped>
    .outCallTask{
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        .outCallTask_item{
            padding: 10px;
            cursor: pointer;
            div{
                display: flex;
                justify-content: space-between;
                padding: 2px 0;
                .pending{
                    color: #F9764A;
                }
                .expired{
                    color: #CCCCCC;
                }
            }
            .btn{
                padding: 15px 0 0;
                .ant-btn{
                    width: 85px;
                    margin: 0 10px;
                }
            }
        }
        .choose{
            background: #EDEDED;
        }
    }
</style>
  