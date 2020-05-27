<template>
  <div class="">
    <a-page-header title="员工管理" />
    <div>
        <Search ref="searchHeader" :tools="formList" @onSearch="searchFun" />
        <div style="padding:10px;text-align:right">
          <a-button type="primary" @click="addCustmoer">添加客服</a-button>
        </div>
        <div>
          <a-table 
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.userAccount">
          <div slot="action" slot-scope="record,row">
            <span class="blue" style="margin-right:10px;" @click="editStaff(row)">编辑</span>
            <span class="blue" @click="deleteStaff(record.userAccount)">删除</span>
          </div>
          </a-table>
        </div>
        <div style="padding:10px 0 30px;"><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div>
    </div>
    <a-modal title="添加成员" :visible="addCustomerShow" v-if="addCustomerShow" @cancel="handleCancelAdd" @ok="handleOkAdd" >
      <div>
        选择成员：<a-tree-select
                  v-model="value"
                  style="width: 80%"
                  :tree-data="treeData"
                  tree-checkable
                  :show-checked-strategy="SHOW_PARENT"
                  search-placeholder="请选择"
                />

      </div>
    </a-modal>
    <a-modal title="编辑成员" :visible="editStaffShow" v-if="editStaffShow" @cancel="handleCancelEditStaff" @ok="handleOkEditStaff">
      <div class="editStaff">
        <span>成员：</span><span>{{editData.userName}}</span>
      </div>
      <div class="editStaff">
        <span>角色:</span>
        <a-select
          v-model="editRole"
          style="width: 200px">
          <a-select-option v-for="(item,index) in roleList" value="item.roleType" :key="index">{{item.roleName}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
import TablePagination from "@/components/Table/TablePagination";
import Search from "@/components/Search/index2";
export default {
    name: "staff",
    components: {
      Search,
      TablePagination
    },
    props:{},
    data() {
      return {
          SHOW_PARENT:TreeSelect.SHOW_PARENT,
          value:'',
          addCustomerShow:false,
          editStaffShow:false,
          formList:[
             {
              type: "select",
              title: "角色",
              key: "roleId",
              options:[
                { value: "null", name: "所有角色" },
                { value: 0, name: "未质检" },
                { value: 1, name: "已质检" }
              ]
            },
            {
              type: "compact",
              key: "queryType", //s1:姓名,2:手机号
              defaultValue:'1',
              name:'queryText',
              defaultName: null,
              options: [
                {
                  name: "客服姓名",
                  value: "1"
                },
                {
                  name: "手机号",
                  value: "2"
                }
              ]
            },
            {
              type: 'search',
              title: '查询',
               btnType:'primary'
            }
          ],
          dataSource:[{}],
          columns:[
            {
              title: "姓名",
              dataIndex: "userName",
              key: "userName"
            },
             {
              title: "手机号",
              dataIndex: "phone",
              key: "phone"
            },
             {
              title: "角色",
              dataIndex: "roleName",
              key: "roleName"
            },
            {
              title: "类型",
              dataIndex: "roleType",
              key: "roleType",
              customRender:(value)=>{
                let obj = {
                  "0":'销售',
                  "1":'管理者',
                  "2":'超级管理员',
                }
                return obj[value]
              }
            },
             {
              title: "操作",
              key: "action",
              slot:'action',
              fixed:"right",
              scopedSlots: { customRender: 'action' },
            },
          ],
          searchField:{
            roleId:'',
            queryText:'',
            queryType:''
          },
          pager:{
            currentPage:1
          },
          treeData:[ {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
            ],
            },
            {
              title: 'Node2',
              value: '0-1',
              key: '0-1',
              children: [
                {
                  title: 'Child Node3',
                  value: '0-1-0',
                  key: '0-1-0',
                  disabled: true,
                },
                {
                  title: 'Child Node4',
                  value: '0-1-1',
                  key: '0-1-1',
                },
                {
                  title: 'Child Node5',
                  value: '0-1-2',
                  key: '0-1-2',
                },
              ],
            }
          ],
          roleList:[],
          editData:{
            name:'',
            roleName:'',
            roleType:''
          },
          editRole:''
      }
    },
    created(){
      this.getRoleList()
      this.getStaffList()

    },
    mounted(){}, 
    methods: {
      // 获取角色
      getRoleList(){
        this.Request.post('/staff/hfwStaffRole/listJson',{}).then(res=>{
          console.log(res.data.list,'角色列表')
          let list = res.data.list
          this.roleList = list
          list.map(item=>{
            this.formList[0].options.push({
              value:item.roleType,
              name:item.roleName
            })
          })
        })
      },
      getStaffList(){
        let params = {
          ...this.pager,
          ...this.searchField
        }
         this.Request.post('/staff/hfwStaffMember/listPageJson',params).then(res=>{
          console.log(res.data.list)
          this.dataSource = res.data.list
          this.pager = res.data.pager
        })
      },
      searchFun(data){
        console.log(data)
      },
      editStaff(row){
        console.log(row,'编辑员工角色')
        let {roleName,roleType,userName} = row
        this.editData={
          roleName,roleType,userName
        }
        this.editRole = roleType
        this.editStaffShow = true

      },
      deleteStaff(userAccount){
        this.$error({
          title: '该客服有未处理的工单，请完成相关的工 单操作后再进行修改删除',
        });
         this.$confirm({
          title: '确认删除此客服？删除后不可恢复，但会保留历史  数据。',
          onOk() {
            let params = {
              userAccount
            }
            this.Request.post('/staff/hfwStaffMember/delJson',params).then(res=>{
                this.$message.success('删除成功!')
            })
          },
        });
        
      },
      addCustmoer(){
        this.addCustomerShow = true
      },
      handleCancelAdd(){
        this.addCustomerShow = false
      },
      handleOkAdd(){},
      handleCancelEditStaff(){
        this.editStaffShow = false
      },
      handleOkEditStaff(){},
      paginationChange(page){
        this.pager = {...page}
        this.getStaffList()
      }
    }
}
</script>

<style lang="less" scoped>
.editStaff{
  display:flex;
  width:300px;
  margin:0 auto 15px;
  span{
    display: block;
    padding-right:10px;
    line-height:30px;
  }
}
</style>
