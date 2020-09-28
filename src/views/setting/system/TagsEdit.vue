<template>
  <div class="TagsEdit">
    <div class="addTagsbtn"><a-button type="primary" @click="addGroup">添加标签</a-button></div>
    <div class="flex tagsListArry">
      <div class="tagsList" v-for="(item,index) in tagsList" :key="index" :title="item.name">
        <p >{{item.name}}</p><div class="tags-icon"><a-icon type="edit" @click="editGroupTags(item.name,item.id)"/><a-icon type="delete" @click="deleteGroupTags(item.id)"/></div>
      </div>
    </div>
    <a-modal :title="type=='edit'?'编辑标签':'添加标签'"  v-if="editTagsShow" :visible="editTagsShow" @ok="handleSubmit" @cancel="handleCancelModal">
       <a-form-model 
       ref="tagsForm" 
       :rules="rules" 
       :model="tagsFormData" 
       :label-col="labelCol" 
       :wrapper-col="wrapperCol"
       >
          <a-form-model-item label="标签名称" prop="name">
            <a-input v-model="tagsFormData.name" :maxLength="5" placeholder="请输入"></a-input>
          </a-form-model-item>
       </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props:{
      currentType:{
        type:String,
        default:'0'
      },
      tagsList:{
        type:Array,
        default:function(){
          return []
        }
      }
    },
    data() {
        return {
          editTagsShow:false,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          tagsFormData:{
            name:'',
          },
          rules:{
            name:[{required: true, message: '请输入分组名称',trigger: 'blur'}]
          },
          type:'edit',
          editId:''
        }
    },
    watch:{
    },
    created(){},
    mounted(){},
    methods: {
      addGroup(){
        this.editTagsShow = true
        this.type = 'add'
        this.tagsFormData.name = ''
      },
      handleCancelModal(){
        this.$refs.tagsForm.resetFields()
        this.editTagsShow = false
        console.log('清空不了嘛',this.tagsFormData.keyword)
      },
      editGroupTags(name,id){
        this.tagsFormData.name = name
        this.editTagsShow = true
        this.type = "edit"
        this.editId = id
      },
      handleSubmit(){
        let params = {
          name:this.tagsFormData.name,
          type:this.currentType,
        }
        this.$refs.tagsForm.validate(valid => {
          if(valid){
            if(this.type =='edit'){
              params.id = this.editId
            }
            this.$emit('handleSubmit',params)
          }
        })
      },
      deleteGroupTags(id){
        let that = this
         this.$confirm({
          title: '确定要删除这个标签吗？',
          content: '',
          onOk() {
            that.$emit('deleteGroupTags',id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      
      }
    }
}
</script>

<style lang="less" scoped>
.TagsEdit{
  margin:0 15px;
  .addTagsbtn{
    margin:20px 0;
    text-align: left;
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
