<template>
  <div class="knowledge">
    <div class="btn">
        <a-button type="primary" @click="updateData(1)">
        添加知识
        </a-button>
    </div>
    <div class="content">
        <div v-for="(item,index) in knowledgeList" :key="index" class="ledge">
            <h3>{{item.title}}</h3>
            <div class="item">
                <div>{{item.content}}</div>
                <div class="action"><span @click="updateData(2,item,index)">修改</span><span @click="deleteData(item.id,index)">删除</span></div>
            </div>
        </div>
    </div>
     <Modal :currentModal="transferObj" @toggleModal="toggleModal" v-if="transferObj.visible">
        <template slot="content">
            <base-form :formObject="transferObj" @toggleModal="toggleModal" @formSubmit="formSubmit" v-if="transferObj.visible"/>
        </template>
        
    </Modal>
  </div>
</template>

<script>


import moment from "moment";
import { mapState } from 'vuex';
import Modal from './../../components/Modal'
import BaseForm from './../../components/BaseForm/BaseFrom'
export default {
  components: {
   Modal,
   BaseForm
  },
  data(){
    return {
     knowledgeList:[],
     transferObj:{},
     id:'',
     knowledgeObj:{
      title:'',
      visible:false,
      ref:'knowledge',
      type :'modalForm',
      width:'500px',
      modelList:[
        {
          type:'input',
          label:'标题',
          placeholder:'请输入标题',
          model:undefined,
          ruleName:'title', //receiverGroupId 工单受理组id
          options:[],
          rules:{
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          }
        },
        {
          type:'input',
          label:'作者名称',
          placeholder:'请输入作者名称',
          model:undefined,
          ruleName:'author', 
          options:[],
          rules:{
            required: true,
            message: '请指定客服人员',
            trigger: 'blur'
          }
        },
        {
          type:'select',
          label:'分类',
          placeholder:'请选择分类',
          model:undefined,
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
          placeholder:'',
          model:'',
          ruleName:'content', 
          rules:{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }
        },
      ],
    },
    }
  },
  mounted() {
   this.getList(this.classificationId)
  },
  methods: {
   getList(id){
       this.Request.get('/hfw/hfwKnowlegeInfo/listJson',{groupId:id}).then(res => {
           if(res.data.status){
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
   updateData(status,item,index){
       this.getSortList()
       
       if(status ==1){
           this["knowledgeObj"]["title"] = '添加知识';
       }else{
           this["knowledgeObj"]["title"] = '编辑知识';
           this["knowledgeObj"]["modelList"][0]['model'] = item.title
           this["knowledgeObj"]["modelList"][1]['model'] = item.author
           this["knowledgeObj"]["modelList"][2]['model'] = item.groupId
           this["knowledgeObj"]["modelList"][3]['model'] = item.content
           this.id = item.id
       }
       this["knowledgeObj"]["visible"] = true;
       this.transferObj = this.knowledgeObj
   },
   toggleModal(data){
       this.transferObj = {}
       switch(data.ref){
          case 'knowledge':
            this['knowledgeObj']['visible'] = data.visible
            this.id = ''
            break;
        }
   },
   formSubmit(data){
       this.transferObj = {}
       let url = ''
       let obj = data.obj
       switch(data.ref){
          case 'knowledge':
            this['knowledgeObj']['visible'] = data.visible
            url = '/hfw/hfwKnowlegeInfo/saveJson'
            obj.id = this.id
            break;
        }
        this.Request.post(url,obj).then(res => {
            if(res.data.status){
                 this.$message.success('操作成功！');
                 this.id = ''
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
            this["knowledgeObj"]["modelList"][2]['options'] = arr
        }
      })
    },
  },
  watch: {
      classificationId(newVal,oldVal){
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
      width: calc(100% - 340px);
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
</style>
