<template>
  <div class="knowledge">
    <div class="btn">
        <a-button type="primary" @click="updateData(1)">
        添加知识
        </a-button>
    </div>
    <div class="content knowledgeContent" v-if="knowledgeList.length>0">
       <a-collapse v-model="activeKey">
          <a-collapse-panel  v-for="(item,index) in knowledgeList" :key="''+index+1" >
            <pre style="width:100%; white-space: pre-wrap;word-wrap: break-word;">{{item.content}}</pre>
            <div class="title" slot="header" style="width:300px;">
              <p>{{item.title}}</p>
              <p style="color:#aaa">作者：{{item.author}}</p>
            </div>
            <div style="margin-top:-30px;" slot="extra" class="action"><span class="blue" @click.stop="updateData(2,item,index)">修改</span><i class="blue" style="padding:0 5px;">|</i><span class="blue" @click.stop="deleteData(item.id,index)">删除</span></div>
          </a-collapse-panel>
       </a-collapse>
    </div>
    <div v-else class="flex noData">
     <img src="../../assets/imgs/noData.png" />
    </div>
    <Modal :currentModal="knowledgeModal" @toggleModal="toggleModal" v-if="knowledgeModal.visible">
      <div slot='content'>
        <BaseForm 
          ref="addKnowledgeForm"
          :formObject="knowledgeObj" 
          @toggleModal="toggleModal"
          @formSubmit="editKnowledge"
        ></BaseForm>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import Modal from './../../components/Modal'
import BaseForm from './../../components/BaseForm/index'
export default {
  components: {
   Modal,
   BaseForm
  },
  data(){
    return {
     knowledgeList:[],
     activeKey:['1'],
     knowledgeModal:{
      visible:false,
      title:'添加知识'
     },
     id:'',
     type:'add',
     knowledgeObj:{
      type:'modalForm',
      ref: "testModal",
      sureBtn:'确定',
      defaultValues:{
      },
      modelList:[
          {
            type: "input",
            label: "标题",
            placeholder: "请选择",
            ruleName: "title",
            maxLength:20,
            rules: [{
              required: true,
              message: "请输入标题",
              trigger: "blur"
            }]
          },
        {
          type:'input',
          label:'作者名称',
          placeholder:'请输入作者名称',
          ruleName:'author', 
          options:[],
          maxLength:20,
          rules:{
            required: true,
            message: '请输入作者名称',
            trigger: 'blur'
          }
        },
        {
          type:'select',
          label:'分类',
          placeholder:'请选择分类',
          ruleName:'groupId', 
          options:[],
          rules:{
            required: true,
            message: '请选择分类',
            trigger: 'change',
          }
        },
        {
          type:'textarea',
          label:'知识内容',
          placeholder:'请输入知识内容',
          ruleName:'content', 
          maxLength:180,
          rules:{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        },
      ],
     },
     categoryList:[]
    }
  },
  created(){
        this.getSortList()
  },
  mounted() {
   this.getList(this.classificationId)
  },
  methods: {
   getList(id){
      this.Request.get('/hfw/hfwKnowlegeInfo/listJson',{groupId:id}).then(res => {
        if(res.data.status){
          this.activeKey = ['1']
          this.knowledgeList = res.data.list
        }
      })
   },
   deleteData(id,index){
       let that = this
       this.$confirm({
        content:<div style="color:red;">确定要删除知识吗？</div>,
        onOk() {
          that.Request.get('/hfw/hfwKnowlegeInfo/delJson',{id}).then(res => {
            console.log(res)
            if(res.data.status){
              that.knowledgeList.splice(index,1)
              that.$forceUpdate()
            }
          })
        },
      });
   },
   updateData(status,item){
      this.knowledgeModal.visible = true
      if(status ==1){
        this.type = 'add'
        this["knowledgeModal"]["title"] = '添加知识';
        this.knowledgeObj.defaultValues = {}
        this.$set(this.knowledgeObj.defaultValues,'groupId',this.classificationId?this.classificationId:undefined)
      }else{
        this.type = 'edit'
        let { title,author,content,groupId} = item 
        this["knowledgeModal"]["title"] = '编辑知识';
         this.knowledgeObj.defaultValues = {
          title,
          author,
          groupId,
          content
        }
        // 分类删除，下面的数据还在
        this.categoryList.map(it=>{
          if(it.key == groupId){
            this.$set(this.knowledgeObj.defaultValues,'groupId',groupId)
            console.log(it)
          }else {
            this.$set(this.knowledgeObj.defaultValues,'groupId',undefined)
          }
        })
        this.id = item.id
      }
      this["knowledgeObj"]["visible"] = true;
      this.$forceUpdate()
   },
    toggleModal(){
      this.$refs.addKnowledgeForm.resetForm()
      this.knowledgeModal.visible = false
    },
   editKnowledge(data){
      let params = {
        ...data
      }
      if(this.type == 'edit'){
        params.id = this.id
      }
      this.Request.post('/hfw/hfwKnowlegeInfo/saveJson',params).then(res => {
        if(res.data.status){
          this.$message.success('操作成功！');
          this.knowledgeModal.visible = false
          this.getList(this.classificationId)
        }
      })
   },
   getSortList(){
    let arr = []
      this.Request.post('/hfw/tsmHfwKnowlegeGroup/listJson').then(res => {
        if(res.data.status){
            res.data.list.map(item => {
              let obj ={
                key:item.id,
                value:item.groupName
              }
              arr.push(obj)
          })
          this.knowledgeObj.modelList[2].options = arr
          this.categoryList = arr
        }
        this.$forceUpdate()
      })
    },
  },
  watch: {
    classificationId(newVal){
        this.getList(newVal)
    }
  },
  computed: {
      ...mapState({
          classificationId:state => state.basic.classificationId
      })
  }
};
</script>
<style lang="less" scoped>
  .knowledge{
      width: calc(100% - 300px);
      .btn{
          line-height: 60px;
          text-align: right;
          border-bottom: 1px solid #e6e6e6;
      }
      .content{
          padding: 20px 0;
          .ledge{
              padding: 10px 0;;
              .item{
                display: flex;
                justify-content: space-between;
                .action{
                    span{
                        padding: 0 10px;
                        cursor: pointer;
                        color:#3F7AF8;
                    }
                    span:nth-of-type(1){
                        border-right:1px solid #3F7AF8;
                    }
                }
            }
          }
          
      }
  }
  .noData{
    display: flex;
    justify-content: center;
    align-items: center;
    height:250px;
  }
</style>
<style lang="less">
   .knowledgeContent .ant-collapse{
     border-radius:0;
   }
   .knowledgeContent .ant-collapse > .ant-collapse-item > .ant-collapse-header{
     background:#fafafa
   }
    .knowledgeContent .title{
      p{
        margin-bottom:0;
      }
   }
</style>
