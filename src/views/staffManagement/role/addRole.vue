<template>
  <div>
    <a-page-header title="角色权限管理" />
    <div  class="Role">
      <a-form-model
      ref="ruleForm"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      >
      <div class="editRoleModal">
        <h5>基本设置</h5>
        <div>
          <!-- <p>角色类型</p> -->
           <a-form-model-item label="角色类型">
             <a-radio-group v-model="formData.roleType" @change="onChange">
              <a-radio  value="1">
                管理员 <span style="font-size:12px;color:#acacac">(可以选取使用管理端，客服端的所有功能呢，适用于客服主管，小组长，质检员等)</span>
              </a-radio>
              <br />
              <a-radio value="0">
                普通客服  <span style="font-size:12px;color:#acacac">(可以选取使用服务端所有功能，如在线会话，呼叫，工单等，适用于一线客服)</span>
              </a-radio>
            </a-radio-group>
           </a-form-model-item>
           <a-form-model-item label="角色名称" prop="roleName"> 
               <a-input v-model="formData.roleName" placeholder="请输入角色名称" :maxLength="16"/>
           </a-form-model-item>
           <a-form-model-item label="角色描述" prop="roleDesc"> 
              <a-textarea v-model="formData.roleDesc" placeholder="请输入角色描述" :auto-size="{ minRows: 3, maxRows: 5 }" :maxLength="50" />
           </a-form-model-item>
        </div>
        <h5>功能权限</h5>
         <div style="width:300px;margin-left:80px;">
            <a-form-model-item> 
            <a-tree
              v-model="formData.resourceIds"
             :expandedKeys.sync="expandedKeys"
              style="width: 100%"
              :tree-data="treeData"
              checkable
              placeholder="请选择"
              :autoExpandParent="autoExpandParent"
              :defaultExpandAll='true'
              :checkStrictly="true"
               @expand="onExpand"
            />
            </a-form-model-item>
         </div>
         <div class="btn">
           <a-button @click="goBack">取消</a-button>
           <a-button type="primary" @click="saveRoleFiled">保存</a-button>
         </div>
      </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue';
export default {
    name: "addRole",
    components: {},
    props:{},
    data() {
        return {
          SHOW_PARENT:TreeSelect.SHOW_PARENT,
          labelCol: { span: 3 },
          wrapperCol: { span: 14 },
          formData:{
            roleType:'',
            roleDesc:'',
            roleName:'',
            resourceIds:[]
          },
          autoExpandParent:true,
          expandedKeys:[],
          treeData:[],
          rules:{
            roleDesc:{ required: true, message: '请输入描述', trigger: 'blur'},
            roleName:{ required: true, message: '请输入名称', trigger: 'blur'},
          },
          roleId:''
        }
    },
    created(){
      let query = this.$route.query
      if(JSON.stringify(query)!='{}'){
         this.roleId = this.$route.query.roleId
         this.formData.roleDesc = this.$route.query.roleDesc
         this.formData.roleName = this.$route.query.roleName
         this.formData.roleType = this.$route.query.roleType
      }else{
        this.formData.roleType = '1'
      }
      this.getRoleFiled()
    },
    mounted(){},
    methods: {
       onExpand(expandedKeys) {
        this.expandedKeys = expandedKeys;
        this.autoExpandParent = false;
      },
      getRoleFiled(){
        let params = {
          roleType:this.formData.roleType,
          roleId:this.roleId
        }
        this.Request.get('/staff/hfwStaffRole/resourcesJson',params).then(res=>{
          let list = res.data.data.resrouces
          this.treeData = this.treeChangeData(list)
          this.formData.resourceIds = res.data.data.resourceIds || []
          this.expandedKeys = this.formData.resourceIds
        })
      },
      saveRoleFiled(){
        let resourceIds = this.formData.resourceIds.checked
        let params = {}
        console.log(resourceIds,'啦啦啦啦')
        this.$refs.ruleForm.validate(valid => {
          if(!resourceIds||resourceIds.length==0){
            this.$message.warning('权限至少选择一个')
            return false
          }
          if(valid){
            params = {
              roleId:this.roleId,
              ...this.formData,
              resources:resourceIds
            }
            delete params.resourceIds
            this.Request.post('/staff/hfwStaffRole/saveJson',params).then(()=>{
              this.$message.success('保存成功')
               this.$router.push({ path:'/staffManagement/role'})
            })
          }
        })
      },
      onChange(){
        this.getRoleFiled()
      },
      treeChangeData(array){
        array.map((item) => {
          item['key'] = item.resourceId;
          item['title'] = item.resourceName; 
          // item['children'] = item.childList;
          if(item.children.length>0){
            this.treeChangeData(item.children);
          }
        })
        return array;
      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
.Role{
  padding:20px;
  h5{
    font-size:16px;
  }
}
.btn{
  margin:20px auto;
  width:300px;
  button{margin-right:10px;}
}
</style>
