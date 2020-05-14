<template>
  <div>
    <a-page-header title="公共常用语"/>
    <div class="common-phrases">
      <div class="side">
        <div class="side-head"><strong>常用语分类</strong><p><a-icon @click="addPhrases" type="plus" /></p></div>
        <div class="group">
          <p style="margin-top:10px;">全部分组</p>
          <ul>
            <li>
              <h6>未分组</h6>
              <div><a-icon type="edit" /><a-icon type="delete" /></div>
            </li>
            <li>
              <h6>未分组</h6>
              <div><a-icon type="edit" /><a-icon type="delete" /></div>
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
            <a-button type="primary"> 添加常用语</a-button>
        </div>
        <div style="width:100%">
           <a-table :columns="columns" :data-source="dataSource" :row-selection="rowSelection">
             <div slot="action" slot-scope="record,row,index">
               <span class="blue" style="margin-right:10px;" @click="editCommonWords(row,index)">编辑</span>
               <span class="blue" @click="deleteCommonWords(row,index)">删除</span>
             </div>
           </a-table>
        </div>
      </div>
    </div>
    <Model :modelObj="modelObj"  @formData="submitAddGroup" v-if="modelObj.visible"/>
  </div> 
</template>

<script>
import Model from '../../../components/Modal/index'
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
export default {
    name: "group",
    components: {
      Model
    },
    props:{},
    data() {
        return {
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
              scopedSlots: { customRender: 'action' },
            },
          ],
          addGroupShow:false,
          modelObj:{
            title:'添加分组',
            visible:false,
            ref:'model',
            modelList:[
              {
                type:'input',
                label:'分组名称',
                model:'',
                ruleName:'title',
                placeholer:'请输入',
                rules:{
                  required: true,
                  message: '请输入分组名称',
                  trigger: 'blur',
                }
              },
            ]
          }
        }
    },
    created(){},
    mounted(){},
    methods: {
      addPhrases(){
        this.modelObj.visible= true
      },
      editCommonWords(){

      },
      deleteCommonWords(){

      },
      submitAddGroup(data){
        this.modelObj.visible = data.visible
        this.Request.post('/hfw/workbench/saveGuestLabel',{}).then(res => {
          console.log('标签selectTags',res.data)
          this.getTags()
        })
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
