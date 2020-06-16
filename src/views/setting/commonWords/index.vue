<template>
  <div>
    <a-page-header title="公共常用语"/>
    <div class="common-phrases">
      <div class="side">
        <div class="side-head"><strong>常用语分类</strong><p style="padding-right:10px;"><a-icon @click="addPhrases" type="plus" /></p></div>
        <div class="group">
          <ul>
            <li v-for="(item,index) in groupList" :key="index" :class="{active:item.active}" @click="changeGroup(item.id,index)">
              <h6>{{item.keyword}}</h6>
              <div v-if="item.id!=''"><a-icon type="edit" @click.stop="editGroup(item.id,item.keyword)"/><a-icon type="delete" @click.stop="deleteGroupWordsOK([item.id],'group')"/></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="flex searchStyle">
          <p>常用语:</p>
          <a-input placeholder="请输入快捷键或内容" v-model="listParams.commonSpeech"></a-input>
          <a-button type="primary" @click="searchList"> 查询</a-button>
        </div>
        <div class="flex-between">
          <a-button @click="deleteGroupWordsOK(selectedRowKeys,'batchDelete')"> 删除 </a-button>
          <a-button type="primary" @click="handleAddWords"> 添加常用语</a-button>
        </div>
        <div style="width:100%">
          <a-table 
           :columns="columns" 
           :data-source="dataSource" 
           :row-selection="rowSelection"  
           :pagination='false' 
           :rowKey="record=>record.id"
           >
             <div slot="action" slot-scope="record,row,index">
               <span class="blue" style="margin-right:10px;" @click="editCommonWords(row,index)">编辑</span>
               <span class="blue" @click="deleteGroupWordsOK([row.id],'words')">删除</span>
             </div>
           </a-table>
        </div>
         <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
      </div>
    </div>
    <!-- 添加常用语分类 -->
    <a-modal :title="groupType=='edit'?'编辑分组':'添加分组'" 
      :visible="addGroupShow" 
       v-if="addGroupShow"
       @cancel="cancelAddGroup"
       @ok="okAddGroup">
      <a-form-model
        :model="addGroupObj"
        :rules="addGropRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-form-model-item label="分组名称" prop="keyword">
          <a-input placeholder="请输入" v-model="addGroupObj.keyword" ></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 添加常用语 编辑的时候要带id  列表中 -->
    <a-modal title="添加常用语" 
       :visible="addWordsShow" 
       v-if="addWordsShow"
       @cancel="cancelAddWords"
       @ok="okAddWords">
      <a-form-model
        :model="addWordsObj"
        :rules="addWordsRules"
        ref="addWordsFrom"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-form-model-item label="常用语分组" prop="pid" >
          <a-select v-model="addWordsObj.pid"  placeholder="请选择" >
            <a-select-option  v-for="(item,index) in groupListModal" :key="index" :value="item.id" >
              {{item.keyword}}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="快捷词" prop="keyword">
            <a-input placeholder="请输入快捷词"  v-model="addWordsObj.keyword"/>
        </a-form-model-item>
        <a-form-model-item label="回复内容" prop="content">
            <a-textarea placeholder="请输入回复内容" v-model="addWordsObj.content" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- <Model :currentModal="addWordsObj" @toggleModal="cancelAddWordsModal">
      <div slot="content">
        <BaseForm :formObject="addWordsObj" @toggleModal="cancelAddWordsModal"></BaseForm>
      </div>
    </Model> -->
  </div> 
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
import Model from '../../../components/Modal/index';
import BaseForm from "@/components/BaseForm/index";
export default {
    name: "group",
    components: {
      Model,
      TablePagination,
      BaseForm
    },
    props:{},
    data() {
        return {
          labelCol: { span: 8},
          wrapperCol: { span: 14 },
          groupList:[{keyword:'全部分组',id:'',active:true}],
          dataSource:[],
          // rowSelection,
          columns:[
            {
              title: '快捷词',
              dataIndex: 'keyword',
              key: '1',
            },
            {
              title: '内容',
              dataIndex: 'content',
              key: '2',
              width:"40%"
            },
            {
              title: '常用语分组',
              dataIndex: 'groupName',
              key: '3',
            },
            {
              title: '操作',
              key: '4',
              fixed:'right',
              width:"15%",
              scopedSlots: { customRender: 'action' },
            },
          ],
          addGroupShow:false,
          addGropRules:{
            keyword:[{ required: true, message: '请输入', trigger: 'blur' },]
          },
          addGroupObj:{keyword:''},
          groupType:'',
          editGropParams:{id:'',keyword:''},
          pager: {
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            currentPage: 1,
            pageSize: 10,
            totalRecord: 0,
            totalPage: 0
          },
          addWordsShow:false,
          addWordsObj:{
            pid:'',
            content:'',
            keyword:''
          },
          addWordsRules:{
            pid:[{required: true, message: '请输入', trigger: 'change' }],
            content:[{required: true, message: '请输入', trigger: 'blur' }],
            keyword:[{required: true, message: '请输入', trigger: 'blur' }]
          },
          selectedRowKeys: [],
          listParams:{
              commonSpeech:'',
              parentCommonSpeechId:''
          }
          // addWordsObj:{
          //   title:'添加常用语',
          //   visible:false,
          //   type :'modalForm',
          //   modelList:[
          //     {
          //       type:'cascader',
          //       label:'指定客服人员',
          //       placeholder:'请选择',
          //       model:undefined,
          //       ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          //       options:[],
          //       rules:{
          //         required: true,
          //         message: '请指定客服人员',
          //         trigger: 'change',
          //       }
          //     }
          //   ],
          // },
          // transferObj:{
          //   title:'dddd',
          //   visible:false,
          //   ref:'transfer',
          //   type :'modalForm',
          //   modelList:[
          //     {
          //       type:'cascader',
          //       label:'指定客服人员',
          //       placeholder:'请选择',
          //       model:undefined,
          //       ruleName:'receiverGroupId', //receiverGroupId 工单受理组id
          //       options:[],
          //       rules:{
          //         required: true,
          //         message: '请指定客服人员',
          //         trigger: 'change',
          //       }
          //     }
          //   ],
          // },
        }
    },
    created(){
      // 获取分组
      this.getGroupList();
      //获取常用语列表
      this.getCommonWordsList();
    },
    computed:{
      rowSelection(){
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.selectedRowKeys = selectedRowKeys
          },
          // onSelect: (record, selected, selectedRows) => {
          //   console.log(record, selected, selectedRows);
          // },
          // onSelectAll: (selected, selectedRows, changeRows) => {
          //   console.log(selected, selectedRows, changeRows);
          // },
        }
      },
    },
    mounted(){},
    methods: {
     getGroupList(){
       this.groupList = [{keyword:'全部分组',id:'',active:true}]
       this.groupListModal = []
        this.Request.get('/common/speech/group/list').then(res => {
          console.log('分组列表',res.data.list)
          let  data = res.data.list
          data.map(item=>{
            this.groupList.push({
              active:false,
              ...item
            })
          })
          // this.groupList.push(res.data.list)
          this.groupListModal = res.data.list
        })
      },
      editGroup(id,keyword){
        this.addGroupShow= true
        this.groupType = 'edit'
        this.editGropParams = {id}
        this.addGroupObj.keyword = keyword
      },
      addPhrases(){
        this.addGroupShow= true
        this.groupType = 'add'
        this.addGroupObj.keyword = ''
      },
      cancelAddGroup(){
        this.addGroupShow = false
      },
      okAddGroup(){
        let params = {...this.addGroupObj}
        if(this.groupType == "edit") {
          params.id = this.editGropParams.id
        }
        this.Request.post('/common/speech/save',params).then(res => {
          console.log('分组编辑保存成功',res.data)
          this.$message.success('保存成功');
          this.getGroupList()
           this.addGroupShow = false
        })
      },
      deleteGroupWordsOK(id,type){
         console.log('选中的id',id) 
         let selectedRowsArray = []
          let params = {
            commonSpeechIds:id
          }
          let that = this
          // if(type=="batchDelete"){
          //   // id.map((item) =>{
          //   //   selectedRowsArray.push(item)
          //   // })
          //   params.commonSpeechIds = id
          // }
          console.log(params,'参数')
          this.$confirm({
            title: '',
            content:<div style="color:red;">删除分组的同时会删除该分组下的常用语，请确认是否删除？</div>,
            onOk() {
              that.Request.post('/common/speech/remove',params).then(() => {
                that.$message.success('删除成功');
                if(type == 'group'){
                  that.getGroupList()
                    that.listParams.parentCommonSpeechId =  ''
                    that.listParams.commonSpeech = ''
                    that.getCommonWordsList()
                }else if(type=='words'||type=="batchDelete"){
                  that.getCommonWordsList()
                }
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
      },
      changeGroup(id,index){
        this.listParams.parentCommonSpeechId =  id
        this.listParams.commonSpeech = ''
        this.groupList.map(item=>{
          item.active = false
        })
        this.groupList[index].active = true
        this.getCommonWordsList()
        this.selectedRowKeys = []
        this.pager.currentPage = 1
        this.$forceUpdate()
      },
      searchList(){
        this.pager.currentPage = 1
        this.getCommonWordsList()
      },
      getCommonWordsList(){
        this.Request.get('/common/speech/search',{...this.pager,...this.listParams}).then(res => {
          console.log('查询常用语列表',res.data) 
          this.dataSource = res.data.list
          this.pager = res.data.pager
          // this.pager.currentPage = intPosition
        })
      },
      handleAddWords(){
        console.log('这不是点击啦吗')
        this.addWordsShow = true
        this.addWordsObj = {
          pid:'',
          content:'',
          keyword:''
        }
      },
      okAddWords(){
        let params = {
          ...this.addWordsObj
        } 
        this.$refs.addWordsFrom.validate(valid=>{
          if(valid){
            this.Request.post('/common/speech/save',params).then(res => {
            console.log('分组编辑保存成功',res.data)
            this.$message.success('保存成功');
            this.getCommonWordsList()
            this.addWordsShow = false
          })
          }
        })
      },
      cancelAddWords(){
        this.addWordsShow = false
      },
      editCommonWords(row){
        console.log(row,'编辑常用语言')
        this.addWordsShow = true
        let {pid,content,keyword,id} = row
        this.addWordsObj = {
          pid,
          content,
          keyword,
          id
        }
      },
      paginationChange(key){
        this.pager = key
        this.getCommonWordsList()
      }
    }
}
</script>

<style lang="less" scoped>
.common-phrases{
  display:flex;
  .side{
    // padding:10px;
    padding-top:10px;
    width:175px;
    border-right:1px solid #e6e6e6;
    min-height:88vh;
    .side-head{
      display:flex;
      justify-content: space-between;
      width:100%;
      padding-left:10px;
      *{
        display:block;
      }
      i{
        cursor: pointer;
      }
    }
    .group{
        li{
          display:flex;
          justify-content: space-between;
          font-size:14px;
          padding:8px 0 10px 10px;
          cursor: pointer;
          h6{
            font-size:14px;
          }
          div{
            i{
              cursor: pointer;
              margin-right:10px;
            }
          }
        }
        li.active{
          background:#e4f6ff
        }
     }
    
  }
  .main{
    flex:1;
    .flex-between{
      margin:0 10px 15px;
    }
    .searchStyle{
      width:400px;
      margin:20px;
      p{
        width:80px;
        line-height:30px;
      }
      button{
        margin-left:10px;
      }
    }
  }
}
 .groupName{
   span{
     padding-right:5px;
     color:red;
     line-height: 30px;;
   }
    p{
      width:100px;
      line-height:30px;
    }
  }
</style>
