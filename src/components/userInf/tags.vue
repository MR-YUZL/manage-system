<template>
    <div class="tags">
        <div class="header">
          <span>访客标签</span>
          <span class="setting" @click="tagsFn">设置标签</span>  
        </div>
        <div>
            <a-tag color="#2db7f5" v-for="(item,index) in tagsList" :key="index">
                {{item}}
            </a-tag>
        </div>
        <Model :modelObj="modelObj" :visible="visible" />
    </div>
</template>
<script>
import Model from './../Modal'
export default {
    data(){
        return{
            tagsList:['标签1','标签2'],
            visible:false,
            modelObj:{
                title:'新增',
                modelList:[
                    {
                        type:'tag' ,
                        label:'标签',
                        model:[
                            'tag',
                        ],
                        options:[{key:'111',value:'111'},{key:'222',value:'222'}]
                    },
                ]
               
            }
            

        }
    },
    components:{
        Model
    },
    methods:{
        tagsFn(){
            this.visible = true
            console.log('tagsFn')
        },
    }
}
</script>
<style lang="less" scoped>
    .tags{
        padding: 10px 20px;
        .header{
            display: flex;
            justify-content: space-between;
            .setting{
                color:#3E7BF8;
                cursor: pointer;
            }
        }
    }
</style>