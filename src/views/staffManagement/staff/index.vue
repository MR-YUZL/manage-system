<template>
  <div class="">
    <a-page-header title="员工管理" />
    <div>
        <div class="search"><FormModelSearchForm :formList="formList"  @prevHandleSubmit="prevHandleSubmit"  :defaultFormValues="defaultSearchFormValues"></FormModelSearchForm></div>
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
                  @change="changeTree"
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
          <a-select-option v-for="(item,index) in roleList" :value="item.roleId" :key="index">{{item.roleName}}</a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
import TablePagination from "@/components/Table/TablePagination";
// import Search from "@/components/Search/index2";
import FormModelSearchForm from "@/components/Search/FormModelSearchForm";
export default {
    name: "staff",
    components: {
      // Search,
      FormModelSearchForm,
      TablePagination
    },
    props:{},
    data() {
      return {
          SHOW_PARENT:TreeSelect.SHOW_PARENT,
          value:[],
          addCustomerShow:false,
          editStaffShow:false,
          formList:[
             {
              type: "select",
              label: "角色",
              name: "roleId",
              placeholder: "请输入",
              options:[
              ]
            },
            {
              type: "compact",
              name: "queryText",
              compact: "input",
              compactName: "queryType",
              options: [
                { label: "客服姓名", value: "1" },
                { label: "手机号", value: "2" },
              ]
            }
          ],
          defaultSearchFormValues: {
            queryType:'1',
          },
          dataSource:[{}],
          columns:[
            {
              title: "姓名",
              dataIndex: "name",
              key: "name"
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
          treeData:[],
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
      this.getMemberList()
    },
    mounted(){}, 
    methods: {
      // 获取角色
      getRoleList(){
        this.Request.post('/staff/hfwStaffRole/listJson',{}).then(res=>{
          let list = res.data.list
          this.roleList = list
          list.map(item=>{
            this.formList[0].options.push({
              value:item.roleId,
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
          this.dataSource = res.data.list
          this.pager = res.data.pager
        })
      },
      //添加成员列表
      getMemberList(){
        this.Request.post('/staff/hfwStaffMemberRole/addressJson',{}).then(res=>{
          let list = res.data.list
          this.treeData = this.treeChangeData(list)
          console.log('批量匹配成员列表',list)
        })
      },
      prevHandleSubmit(data){
        console.log(data)
      },
      editStaff(row){
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
      handleOkAdd(){
        let params = {
          userAccounts:[]
        }
        this.Request.post('/staff/hfwStaffMember/batchSaveJson',params).then(res=>{
          console.log(res)
        })
        // console.log('选中的成员列表',this.value)
      },
      handleCancelEditStaff(){
        this.editStaffShow = false
      },
      handleOkEditStaff(){},
      paginationChange(page){
        this.pager = {...page}
        this.getStaffList()
      },
      treeChangeData(array){
        array.map((item) => {
          item['value'] = item.dId;
          item['key'] = item.dId;
          item['title'] = item.dName;
          item['children'] = item.staffsDtos;
          if(item.childDeparments.length>0){
            this.treeChangeData(item.childDeparments);
          }
        })
        return array;
      },
      changeTree(value,label){
        console.log(value,label)
        this.userAccounts = []
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
  .search{
    padding:20px 0 0 10px;
  }
</style>
