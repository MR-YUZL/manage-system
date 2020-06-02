<template>
  <div>
    <a-page-header title="角色权限管理" />
    <div  class="Role">
      <a-form-model
      ref="ruleForm"
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      >
      <div class="editRoleModal">
        <h5>基本设置</h5>
        <div>
          <!-- <p>角色类型</p> -->
           <a-form-model-item label="角色类型">
             <a-radio-group @change="onChange">
              <a-radio :style="radioStyle" :value="1">
                管理员 <span style="font-size:12px;color:#acacac">(可以选取使用管理端，客服端的所有功能呢，适用于客服主管，小组长，质检员等)</span>
              </a-radio>
              <br />
              <a-radio :style="radioStyle" :value="2">
                普通客服  <span style="font-size:12px;color:#acacac">(可以选取使用服务端所有功能，如在线会话，呼叫，工单等，适用于一线客服)</span>
              </a-radio>
            </a-radio-group>
           </a-form-model-item>
           <a-form-model-item label="角色名称"> 
               <a-input placeholder="请输入角色名称" />
           </a-form-model-item>
           <a-form-model-item label="角色描述"> 
              <a-textarea placeholder="请输入角色描述" :auto-size="{ minRows: 3, maxRows: 5 }" />
           </a-form-model-item>
        </div>
        <h5>管理端</h5>
      </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
    name: "addRole",
    components: {},
    props:{},
    data() {
        return {
          labelCol: { span: 3 },
          wrapperCol: { span: 14 },
          formData:{}
        }
    },
    created(){
      this.getRoleFiled()
    },
    mounted(){},
    methods: {
      getRoleFiled(){
        this.Request.post('/staff/hfwStaffRole/resourcesJson',{}).then(res=>{
          console.log(res.data,'角色列表')
        })
      },
      saveRoleFiled(){
        this.Request.post('/staff/hfwStaffRole/saveJson',{}).then(res=>{
          // console.log(res.data,'角色列表')
        })
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
</style>
