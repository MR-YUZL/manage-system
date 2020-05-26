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
          <div slot="action">
            <span class="blue" style="margin-right:10px;">编辑</span>
            <span class="blue">删除</span>
          </div>
          </a-table>
        </div>
        <div><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div>
    </div>
    <a-modal title="添加成员" :visible="addCustomerShow" v-if="addCustomerShow" @cancle="handleCancelAdd" @ok="handleOkAdd" >
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
    <a-modal title="编辑成员" :visible="editStaffShow" v-if="editStaffShow" @cancle="handleCancelEditStaff" @ok="handleOkEditStaff">
        <div>
          <span>成员：</span><span></span>
          <span>角色</span>
        </div>
        <div>
          <span>角色:</span>
          <a-select>
            <a-select-option>拉拉啊</a-select-option>
          </a-select>
        </div>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
import TablePagination from "@/components/Table/TablePagination";
import Search from "@/components/Search";
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
              defaultValue: "null",
              options: [
                { value: "null", name: "所有角色" },
                { value: 0, name: "未质检" },
                { value: 1, name: "已质检" }
              ]
            },
            {
              type: "input",
              title: "查找",
              key: "queryText",
              placeholder: "请输入客服姓名或者手机号"
            },
            {
              type: 'search',
              title: '查询',
              btnType: 'default'
            }
          ],
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
          pager:{},
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
        },]
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
          console.log(res.data.list)
        })
      },
      getStaffList(){
        let params = {
          ...this.searchField
        }
         this.Request.post('/staff/hfwStaffMember/listPageJson',params).then(res=>{
          console.log(res.data.list)
          this.dataSource = res.data.list
          this.pager = res.data.pager
        })
      },
      searchFun(){

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
      paginationChange(){

      }
    }
}
</script>

<style lang="less" scoped>
</style>
