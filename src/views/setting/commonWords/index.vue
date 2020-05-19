<template>
  <div>
    <a-page-header title="公共常用语"/>
    <div class="common-phrases">
      <div class="side">
        <div class="side-head"><strong>常用语分类</strong><p><a-icon @click="addPhrases" type="plus" /></p></div>
        <div class="group">
          <p style="margin-top:10px;">全部分组</p>
          <ul>
            <li v-for="(item,index) in groupList" :key="index">
              <h6>{{item.keyword}}</h6>
              <div><a-icon type="edit" @click="editGroup(item.id,item.keyword)"/><a-icon type="delete" @click="deleteGroupOK"/></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main">
        <div class="flex searchStyle">
          <p>常用语:</p>
          <a-input placeholder="请输入快捷键或内容"></a-input>
          <a-button type="primary"> 查询</a-button>
        </div>
        <div class="flex-between">
            <a-button> 删除 </a-button>
            <a-button type="primary" @click="handleAddWords"> 添加常用语</a-button>
        </div>
        <div style="width:100%">
           <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection"  :pagination='false'>
             <div slot="action" slot-scope="record,row,index">
               <span class="blue" style="margin-right:10px;" @click="editCommonWords(row,index)">编辑</span>
               <span class="blue" @click="deleteCommonWords(row,index)">删除</span>
             </div>
           </a-table>
        </div>
         <TablePagination :parentPager="pager" @paginationChange="paginationChange" />
      </div>
    </div>
    <!-- 添加常用语分类 -->
    <Model :modelObj="addGroupObj"  @formData="submitAddGroup" v-if="addGroupObj.visible"/>
    <!-- 添加常用语 -->
    <Model :modelObj="addWordsObj"  @formData="submitAddWords" v-if="addWordsObj.visible"/>
  </div> 
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
import Model from '../../../components/Modal/index'
const rowSelection = {
  // onChange: (selectedRowKeys, selectedRows) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  // },
  // onSelect: (record, selected, selectedRows) => {
  //   console.log(record, selected, selectedRows);
  // },
  // onSelectAll: (selected, selectedRows, changeRows) => {
  //   console.log(selected, selectedRows, changeRows);
  // },
};
export default {
    name: "group",
    components: {
      Model,
      TablePagination
    },
    props:{},
    data() {
        return {
          groupList:[],
          dataSource:[{}],
          rowSelection,
          columns:[
            {
              title: '快捷词',
              dataIndex: 'name',
              key: '1',
            },
            {
              title: '内容',
              dataIndex: 'name1',
              key: '2',
              width:"40%"
            },
            {
              title: '常用语分组',
              dataIndex: 'name2',
              key: '3',
            },
            {
              title: '操作',
              dataIndex: 'name3',
              key: '4',
              fixed:'right',
              width:"15%",
              scopedSlots: { customRender: 'action' },
            },
          ],
          addGroupShow:false,
          addGroupObj:{
            title:'添加分组',
            visible:false,
            ref:'addGroup',
            modelList:[
              {
                type:'input',
                label:'分组名称',
                model:'ddd',
                ruleName:'title',
                placeholer:'请输入',
                rules:{
                  required: true,
                  message: '请输入分组名称',
                  trigger: 'blur',
                }
              },
            ]
          },
          addWordsObj:{
            title:'添加常用语',
            visible:false,
            ref:'addWords',
             modelList:[
              {
                type:'select',
                label:'常用语分组',
                model:'',
                ruleName:'title',
                placeholer:'请选择分组',
                options:[{key:'c',value:'111'},{key:'d',value:'222'}],
                rules:{
                  required: true,
                  message: '请选择分组',
                  trigger: 'change',
                }
              },
              {
                type:'input',
                label:'快捷词',
                model:'',
                ruleName:'title',
                placeholer:'请输入内容',
                rules:{
                  required: true,
                  message: '请输入内容',
                  trigger: 'change',
                }
              },
               {
                type:'textarea',
                label:'回复内容',
                model:'',
                ruleName:'title',
                placeholer:'请输入内容',
                rules:{
                  required: true,
                  message: '请输入内容',
                  trigger: 'change',
                }
              },
            ]
          },
          pager: {
            pageSizeOptions: ["10", "20", "30", "40", "50"],
            currentPage: 1,
            pageSize: 10,
            totalRecord: 0,
            totalPage: 0
          },
        }
    },
    created(){
      // 获取分组
      this.getGroupList();
    },
    mounted(){},
    methods: {
      getGroupList(){
        this.Request.get('/common/speech/group/list').then(res => {
          this.groupList = res.data.list
        })
      },
      editGroup(){
        this.addGroupObj.visible= true
        this.addGroupObj.modelList[0].model = 'adfadsf'
      },
      // deleteGroup(){},
      // editGroupOK(id,keyword){

        // let params = {
        //   id,
        //   keyword
        // }
        // this.Request.post('/common/speech/save',{...params}).then(res => {
        //   console.log('分组编辑保存成功',res.data)
        //   this.$message.success('保存成功');
        // })
      // },
      deleteGroupOK(){
        this.Request.post('/common/speech/remove',{commonSpeechIds:'1'}).then(res => {
          console.log('分组删除成功',res.data)
          this.$message.success('删除成功');
        })
      },
      getCommonWordsList(){
        let params = {
          commonSpeech:'',
          parentCommonSpeechId:''
        }
        this.Request.post('/common/speech/search',params).then(res => {
          console.log('查询常用语列表',res.data)
        })
      },
      addPhrases(){
        this.addGroupObj.visible= true
      },
      editCommonWords(){

      },
      deleteCommonWords(){

      },
      submitAddGroup(data){ 
        if(data.status){
          let params = {
            keyword:data
          }
          this.Request.post('/common/speech/save',{...params}).then(res => {
            console.log('分组编辑保存成功',res.data)
            this.$message.success('保存成功');
          })
        }else{
          this.addGroupObj.visible = data.visible
        }
      },
      handleAddWords(){
        this.addWordsObj.visible = true
      },
      submitAddWords(){
          this.addWordsObj.visible = false
      },
      paginationChange(){

      }
    }
}
</script>

<style lang="less" scoped>
.common-phrases{
  display:flex;
  .side{
    padding:10px;
    width:175px;
    border-right:1px solid #e6e6e6;
    min-height:88vh;
    .side-head{
      display:flex;
      justify-content: space-between;
      width:100%;
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
          margin-bottom:10px;
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
