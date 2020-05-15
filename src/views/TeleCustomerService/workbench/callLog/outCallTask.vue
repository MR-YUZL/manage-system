<!-- 外呼任务 -->
<template>
    <div class='outCallTask'>
        <div v-for="(item,index) in outCallTaskList" :key="index" class="outCallTask_item"  @click="selectCallInf(index)" :class="{ 'choose': index == select }">
            <div><span>{{item.tel}}</span><span :class="item.status == 1 ? 'pending':'expired'">{{item.status == 1 ? '待处理' : '已过期'}}</span></div>
            <div>{{item.time}}</div>
            <div>{{item.text}}</div>
            <div class="btn">
                 <a-button type="primary" ghost>
                确 定
                </a-button>
                <a-button>取 消</a-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
name:'outCallTask',
components: {},
data() {
    return {
        select:0,
        outCallTaskList:[
            {
                tel:121111111,
                status:1,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
            {
                tel:121111111,
                status:2,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
            {
                tel:121111111,
                status:2,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
            {
                tel:121111111,
                status:2,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
            {
                tel:121111111,
                status:2,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
            {
                tel:121111111,
                status:2,
                time:'2020-05-15 09:22',
                text:'我是外呼任务就发士大夫艰苦了的疯狂拉升的开发发生发生'
            },
        ]
    };
},
computed: {},
watch: {},
//方法集合
methods: {
    //获取通话列表
        getRecentCallsList(){
             this.Request.get('hfw/workbench/getCallRecords').then(res => {
                console.log('获取常用语',res.data)
                //   if(res.data.status){

                //   }
            }) 
        },
        selectCallInf(index){
            this.select = index
        }
},
created() {

},
mounted() {

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
  