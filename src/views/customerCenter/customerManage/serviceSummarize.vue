<template>
    <div class="serviceSummary">
        <div class="header">
          <span class="serviceIcon">服务小结</span>
        </div>
        <div class="serviceSummary_item">
            <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn" v-if="questionList && questionList.length"/>
            <div v-if="questionListArry.length>0">
            <div v-for="(item,index) in questionListArry" :key="index" class="question" >
              <div class="question_top"><span>{{item.inputTime}}</span><span>{{item.inputAcc}}</span></div>
              <div>{{item.title}}</div>
              <div>{{item.remark}}</div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
      questionList:{
          type:Array
        }
    },
    data(){
        return{
          active:false,
          questionListArry:[]
        }
    },
    watch:{
      questionList(){
        this.questionListArry = [this.questionList[0]]
      }
    },
    created(){},
    mounted(){},
    components:{},
    methods:{
      showFn(){
        this.active = !this.active
        if(this.active){
          this.questionListArry = [...this.recordObj.questionList]
        }else{
          this.questionListArry = [this.recordObj.questionList[0]]
        }
      }
    }
}
</script>
<style lang="less" scoped>
    .serviceSummary{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            .setting{
                color:#3E7BF8;
                cursor: pointer;
            }
            .serviceIcon{
              padding-left:26px;
              background:url('../../assets/imgs/text-icon.png') center left no-repeat;
            }
        }
        .serviceSummary_item{
            position: relative;
            .question{
                width: 93%;
                background: #EBEBEB;
                margin-top: 15px;
                padding: 15px;
                .question_top{
                    display: flex;
                    justify-content:space-between;
                    padding-bottom: 10px;
                }
            }

            .icon{
                position: absolute;
                right: 0;
            }
           
        }
        
    }
</style>