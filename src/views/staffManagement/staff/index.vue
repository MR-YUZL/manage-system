<template>
  <div class="">
    <a-page-header title="员工管理" />
    <div>
        <Search ref="searchHeader" :tools="formList" @onSearch="searchFun" />
        <div style="padding:10px;text-align:right">
          <a-button type="primary">添加客服</a-button>
        </div>
        <div>
          <a-table 
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.id">
          <div slot="action">
            <span class="blue" style="margin-right:10px;">编辑</span>
            <span class="blue">删除</span>
          </div>
          </a-table>
        </div>
        <div><TablePagination :parentPager="pager" @paginationChange="paginationChange" ></TablePagination></div>
    </div>
    <a-modal title="批量匹配成员" :visible="addCustomerShow" v-if="addCustomerShow" >
        <p>选择企蜂云账号成员：<a-button type="link">点击选择</a-button></p>
        <div><p>当前剩余可添加账号：11</p><a-button type="primary">一键分配</a-button></div>
        <div>
          <a-table 
          :columns="columns"
          :dataSource="dataSource">

          </a-table>
        </div>
    </a-modal>
  </div>
</template>

<script>
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
          addCustomerShow:false,
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
          pager:{}
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
      paginationChange(){

      }
    }
}
</script>

<style lang="less" scoped>
</style>
