<template>
    <div class="tags">
        <div class="header">
          <span class="tagsIcon">访客标签</span>
          <span class="setting" @click="tagsFn">设置标签</span>  
        </div>
        <div class="tag_item" v-bind:class="{ expansion : active }">
          <a-icon :type="active ? 'down' : 'up'" class="icon" @click="showFn"/>
          <div class="tag">
            <a-tag v-for="(item,index) in tagsList" :key="index">
              {{item}}
            </a-tag>
          </div>
        </div>
        <div class="aaa">
          <Model :modelObj="modelObj"  @selectGetTags="selectGetTags" />
        </div>
    </div>
</template>
<script>
import Model from './../Modal'
export default {
  name:'tags',
  props:{
    tagsList:{
      type:Array
    },
    selectTagList:{
      type:Array
    }
  },
  data(){
      return{
          // tagsList:['标签11','标签2222','标签2','标签2','标签2'],
          visible:false,
          active:true,
          modelObj:{
            title:'访客标签',
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
    created(){
      this.modelObj.modelList[0].options = this.selectTagList
    },
    methods:{
      tagsFn(){
        this.$store.commit('getVisible',true)
      },
      showFn(){
        this.active = !this.active
      },
      selectGetTags(data){
        this.$emit('submitTags',data)
        console.log('传过去提交的数据',data)
      }
    }
}
</script>
<style lang="less" scoped>
.tagsIcon{
  padding-left:24px;
  background:url('../../assets/imgs/text-icon2.png') left center no-repeat;
}
    .tags{
        padding: 20px;
        .header{
            display: flex;
            justify-content: space-between;
            margin-bottom:23px;
            .setting{
                color:#3E7BF8;
                cursor: pointer;
            }
        }
        .tag_item{
            position: relative;
            overflow: hidden;
            .icon{
              position: absolute;
              right: 0;
              top: 0px;
            }
            .tag{
              width: 93%;
              display: flex;
              flex-wrap: wrap;
              span{
                display:block;
                margin-right:10px;
                background:#e5f2ff;
                padding:0 20px;
                height:26px;
                line-height:26px;
                border-radius:30px;
                margin-bottom:20px;
                color:#3e7bf8;
                border:none;
              }
            }
        }
        .expansion{
          height: 37px;
        }
    }
</style>
<style lang="less">
  .ant-tag, .ant-tag a, .ant-tag a:hover{
    margin-right:10px;
    background:#e5f2ff;
    padding:0 20px;
    height:26px;
    line-height:26px;
    border-radius:30px;
    margin-bottom:20px;
    color:#3e7bf8;
    border:none;
    margin-bottom:0;
  }
  .ant-tag-checkable-checked{
    background:#3e7bf8;
    color:#fff;
  }
</style>