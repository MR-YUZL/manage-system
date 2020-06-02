<template>
  <div>
    <a-modal v-model="visibles" title="设置负责人" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="指定客服人员">
          <a-select
            style="width: 200px"
            @change="handleChange"
            v-decorator="['principals', { rules: [{ required: true, message: '请选择客服人员或请选择客服组' }] }]"
          >
            <a-select-opt-group v-for="(item,index) in optList" :key="index">
              <span slot="label">{{item.groupName}}</span>
              <a-select-option
                :value="it.value"
                v-for="(it,idx) in item.staffs"
                :key="idx"
              >{{it.name}}</a-select-option>
            </a-select-opt-group>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "setManager" }),
      visibles: this.visible,
      optList: []
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
    getStaffSkillGroups() {
      api.staffSkillGroups({ type: 1 }).then(res => {
        console.log("设置负责人", res);
        if (res.data.status) {
          this.optList = res.data.list;
        }
      });
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        let params = {
          ...values,
          custIds: this.custIds
        };
        if (!err) {
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
    handleChange() {}
  }
};
</script>