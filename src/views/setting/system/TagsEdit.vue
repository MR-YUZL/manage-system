<template>
  <div class="TagsEdit">
    <div class="addTagsbtn"><a-button type="primary" @click="addGroup">添加分组</a-button></div>
    <div class="flex tagsListArry">
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" @click="editGroupTags('keyword')"/><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1分组1分组1分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
      <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
       <div class="tagsList">
        <p>分组1</p><div class="tags-icon"><a-icon type="edit" /><a-icon type="delete" /></div>
      </div>
    </div>
    <a-modal :title="type=='edit'?'编辑分组':'添加分组'"  v-if="editTagsShow" :visible="editTagsShow" @ok="handleSubmit" @cancel="handleCancelModal">
       <a-form-model 
       ref="tagsForm" 
       :rules="rules" 
       :model="tagsFormData" 
       :label-col="labelCol" 
       :wrapper-col="wrapperCol"
       >
          <a-form-model-item label="分组名称" prop="keyword">
            <a-input v-model="tagsFormData.keyword" placeholder="请输入"></a-input>
          </a-form-model-item>
       </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props:{},
    data() {
        return {
          editTagsShow:false,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          tagsFormData:{
            keyword:''
          },
          rules:{
            keyword:[{required: true, message: '请输入分组名称',trigger: 'blur'}]
          },
          type:'edit'
        }
    },
    created(){},
    mounted(){},
    methods: {
      addGroup(){
        this.editTagsShow = true
        this.type = 'add'
      },
      handleCancelModal(){
        this.$refs.tagsForm.resetFields()
        this.editTagsShow = false
        console.log('清空不了嘛',this.tagsFormData.keyword)
      },
      editGroupTags(keyword){
        this.tagsFormData.keyword = keyword
        this.editTagsShow = true
        this.type = "edit"
      },
      handleSubmit(){
        this.$refs.tagsForm.validate(valid => {
          if(valid){
            console.log(this.tagsFormData)
          }
        })
      }
    }
}
</script>

<style lang="less" scoped>
.TagsEdit{
  margin:0 15px;
  .addTagsbtn{
    margin:20px 0;
    text-align: right;
  }
  .tagsListArry{
    display:flex;
    flex-wrap:wrap;

  }
  .tagsList{
    display:flex;
    flex-wrap: wrap;
    width:175px;
    margin-bottom:25px;
    cursor: pointer;
    p{
      padding:0 24px;
      color:#3e7bf8;
      background:#e5f2ff;
      border-radius:30px;
      margin-right:10px;
      max-width:120px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tags-icon{
      display:none;
    }
  }
  .tagsList:hover{
    .tags-icon{
      display:block;
      i{
        margin-right:5px;
      }
    }
  }
}
.addTagsbtn{
  i{
    margin-right:10px;
  }
}
</style>
