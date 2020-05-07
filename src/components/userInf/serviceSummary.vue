<template>
    <div class="serviceSummary">
        <div class="header">
          <span>服务小结</span>
        </div>
        <div class="serviceSummary_item">
            <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn"/>
            <div v-for="(item,index) in questionList" :key="index" class="question" >
                <div class="question_top"><span>{{item.time}}</span><span>{{item.name}}</span></div>
                <div>{{item.question}}</div>
                <div>{{item.content}}</div>
            </div>
        </div>
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            questionList1:[
                {
                    time:'2020-12-07 12',
                    name:'冠希哥',
                    question:'士大夫撒地方的发生的的撒发到付',
                    content:'发送飞机撒大家哦个都解耦if圣诞节案件覅偶个就放ID数据分IP'
                },{
                    time:'2020-12-07 12',
                    name:'冠希哥',
                    question:'士大夫撒地方的发生的的撒发到付',
                    content:'发送飞机撒大家哦个都解耦if圣诞节案件覅偶个就放ID数据分IP'
                },{
                    time:'2020-12-07 12',
                    name:'冠希哥',
                    question:'士大夫撒地方的发生的的撒发到付',
                    content:'发送飞机撒大家哦个都解耦if圣诞节案件覅偶个就放ID数据分IP'
                }
            ],
            questionList:[],
            active:false,
           
            

        }
    },
    mounted(){
        this.questionList = [this.questionList1[0]]
    },
    components:{
       
    },
    methods:{
      
        showFn(){
            
            this.active = !this.active
            if(this.active){
                this.questionList = this.questionList1
            }else{
                 this.questionList = [this.questionList1[0]]
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