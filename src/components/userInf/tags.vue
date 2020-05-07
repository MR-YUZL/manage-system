<template>
    <div class="tags">
        <div class="header">
          <span>访客标签</span>
          <span class="setting" @click="tagsFn">设置标签</span>  
        </div>
        <div class="tag_item" v-bind:class="{ expansion : active }">
            <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn"/>
            <a-tag color="#2db7f5" v-for="(item,index) in tagsList" :key="index">
                {{item}}
            </a-tag>
        </div>
        <Model :modelObj="modelObj"  />
    </div>
</template>
<script>
import Model from './../Modal'
export default {
    data(){
        return{
            tagsList:['标签1','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2','标签2'],
            visible:false,
            active:false,
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
    computed(){

    },
    components:{
        Model
    },
    methods:{
        tagsFn(){
            // this.visible = true
            console.log('tagsFn')
           
            this.$store.commit('getVisible',true)
            
        },
        showFn(){
            
            this.active = !this.active
        }
    }
}
</script>
<style lang="less" scoped>
    .tags{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            .setting{
                color:#3E7BF8;
                cursor: pointer;
            }
        }
        .tag_item{
            position: relative;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            // text-overflow: ellipsis;
            /* margin: 10px 0 10px 0; */
            // font-size: 15px; 
            -webkit-line-clamp:1;

            .icon{
                position: absolute;
                right: 0;
                top: 15px;
            }
            .ant-tag{
                margin-top: 15px;
            }
        }
        .expansion{
             -webkit-line-clamp:100;
        }
    }
</style>