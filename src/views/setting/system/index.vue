<template>
  <div class="">
      <a-page-header title="系统属性设置" />
      <div class="sysmSort">
        <a-tabs :activeKey="activeKey" @change="clickTabs">
          <a-tab-pane key="0" tab="咨询分类"></a-tab-pane>
          <a-tab-pane key="1" tab="工单分类"></a-tab-pane>
          <a-tab-pane key="2" tab="客户标签设置"></a-tab-pane>
          <a-tab-pane key="3" tab="访客标签设置"></a-tab-pane>
          <!-- <a-tab-pane key="4" tab="客户分组"></a-tab-pane> -->
        </a-tabs>
        <div>
          <AddSort v-if="activeKey==0||activeKey==1" :list="list" :currentType="activeKey"/>
          <TagsEdit ref="tag" v-show="activeKey==2||activeKey==3||activeKey==4" :tagsList="tagsList"  :currentType="activeKey" @handleSubmit="handleSubmit" @deleteGroupTags="deleteGroupTags"/>
        </div>
      </div>
  </div>
</template>

<script>
import AddSort from "./AddSort"
import TagsEdit from './TagsEdit'
export default {
    name: "",
    components: {
      AddSort,
      TagsEdit
    },
    props:{},
    data() {
        return {
          activeKey:'0',
          list:[],
          tagsList:[]
        }
    }, 
    created(){
      this.getList()
   
    },
    mounted(){},
    methods: {
      clickTabs(key){
        this.activeKey = key;
        if(key=="0"||key=='1'){
          this.getList()
        }else{
          this.getTagList()
          console.log(this.$refs.tag)
        }
      },
      getList(){
        this.Request.get('/config/system/findTypeListJson',{ type:this.activeKey}).then(res=>{
          this.list = res.data.list
        })
      },
      getTagList(){
        this.Request.get('/config/system/listJson',{ type:this.activeKey}).then(res=>{
          this.tagsList = res.data.list
        })
      },
      handleSubmit(params){
        this.Request.post('/config/system/saveJson',params).then(res=>{
          console.log(res,this.$refs.tag)
          this.$message.success('添加成功')
          this.$refs.tag.editTagsShow = false
          this.getTagList()
      })
      },
      deleteGroupTags(id){
        this.Request.post('/config/system/delJson',{id}).then(res=>{
          console.log(res,this.$refs.tag)
          this.$message.success('删除成功！')
          this.$refs.tag.editTagsShow = false
          this.getTagList()
        })
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
