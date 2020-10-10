<template>
  <div>
    <a-modal v-model="visibles" title="设置负责人" @ok="handleSubmit" @cancel="handleCancel">
      <a-form-model
        ref="ruleForm"
        :mode="formObj"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-model-item label="指定客服人员" prop="principals">
          <a-select
            style="width: 200px"
            @change="handleChange"
            @popupScroll="popupScroll"
            :getPopupContainer="getPopupContainer"
            v-model="formObj.principals"
          >
            <a-select-opt-group v-for="(item,index) in optList" :key="item.groupId">
              <span slot="label" class="groupName">{{item.groupName}}</span>
              <a-select-option
                :value="it.value + '&&&' + item.groupId"
                v-for="(it,idx) in item.staffs"
                :key="it.value + '&&&' + item.groupId"
              >{{it.name}}</a-select-option>
            </a-select-opt-group>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      formObj: {
        principals:''
      },
      visibles: this.visible,
      optList: [],
      rules:{
        principals:[
          { required: true, message: '不能为空',trigger:'blur'}
        ],
      },
    };
  },
  props: {
    visible: Boolean,
    custIds: Array
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },
  mounted() {
    this.getStaffSkillGroups();
  },
  methods: {
    
    getPopupContainer (triggerNode) {
      // return triggerNode.parentNode || document.body
      return triggerNode.parentNode
    },
    popupScroll(e){
    },
    getStaffSkillGroups() {
      api.staffSkillGroups().then(res => {
        console.log("设置负责人", res);
        if (res.data.status) {
          this.optList = res.data.list;
        }
      });
    },
    handleSubmit() {
      let principals = this.formObj.principals;
      let arr = principals.split('&&&');
      let params = {
        principals:arr[0],
        custIds: this.custIds
      };
      if(!params.principals){
        this.$message.error('请选择客服人员');
        return;
      }
      console.log(params,'params')
      this.$refs.ruleForm.validate(valid => {
        if(valid){
          api.setPrincipalJson(params).then(res => {
            console.log(res);
            if(res.data.status){
              this.$message.success('设置成功');
              this.visibles = false
              this.$emit('successLoadList');
            }
          });
        }
      });
    },
    handleCancel() {
      this.visibles = false;
      this.$emit("closeUpdate");
    },
    handleChange(value) {
      console.log(value,'value2')
      // this.formObj.principals = value
    }
  }
};
</script>
<style lang="less" scoped>
.groupName{
  display: block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>