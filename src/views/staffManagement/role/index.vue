<template>
    <div class="roleManage">
      <a-page-header title="角色权限管理" />
      <div  class="flex-between">
        <div>类型：
          <a-select v-model="roleType" default-value="1" style="width:200px;" @change="roleTypeChange">
            <a-select-option :value="null">全部类型</a-select-option>
            <a-select-option :value="1">管理员</a-select-option>
            <a-select-option :value="0">普通客服</a-select-option>
          </a-select>
        </div>
        <router-link to="role/addRole" ><a-button type="primary">新增角色</a-button></router-link>
      </div>
      <div>
        <a-table 
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record => record.roleId">
          <div slot="action" slot-scope="record,row">
            <router-link :to="'role/addRole?roleId='+record.roleId+'&roleDesc='+record.roleDesc+'&roleName='+record.roleName"><span class="blue" style="margin-right:10px;" >编辑</span></router-link>
            <span class="blue" @click="deleteRole(record)">删除</span>
          </div>
        </a-table>
      </div>
      <div style="padding:10px 0 30px;"><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div>
    </div>
</template>

<script>
import TablePagination from "@/components/Table/TablePagination";
export default {
    name: "",
    components: {
      TablePagination
    },
    props:{},
    data() {
      return {
        roleType:'',
        pager:{},
        columns:[
          {
            title: "角色名称",
            dataIndex: "roleName",
            key: "roleName"
          },
          {
            title: "角色名称",
            dataIndex: "roleType",
            key: "roleType",
            customRender:(values)=>{
              let obj = {
                '0':'销售',
                '1':'管理者'
              }
              return obj[values]
            }
          },
          {
            title: "角色描述",
            dataIndex: "roleDesc",
            key: "roleDesc"
          },
          {
            title: "操作",
            key: "action",
            slot:'action',
            fixed:"right",
            scopedSlots: { customRender: 'action' },
          },
        ],
        dataSource:[{}]
      }
    },
    created(){
      this.getList({})
    },
    mounted(){},
    methods: {
      getList(data){
        let params = {
          ...this.pager,
          ...data
        }
        this.Request.get('/staff/hfwStaffRole/listPageJson',params).then(res=>{
          console.log('角色列表',res.data.list)
          this.dataSource = res.data.list
          this.pager = res.data.pager
        })
      },
      roleTypeChange(){
        let params = {
          roleType:this.roleType
        }
        this.getList(params)
      },
      deleteRole(row){
        let that = this
        this.$confirm({
          title: '确定删除该角色？',
          content: '',
          onOk() {
            that.Request.get('/staff/hfwStaffRole/delete',{roleId:row.roleId}).then(()=>{
              that.$message.success('删除成功')
              that.getList()
            })
          },
          onCancel() {
            console.log('Cancel');
          },
          class: 'test',
        });
      },
      paginationChange(page){
        this.pager = page
        this.getList()
      }
    }
}
</script>

<style lang="less" scoped>
.roleManage{
  .flex-between{
    padding:20px;
  }
}
</style>
