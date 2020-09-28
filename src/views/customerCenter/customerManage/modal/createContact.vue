<template>
  <div>
    <!-- <a-modal v-model="visibles" title="创建联系人" @ok="handleSubmit" @cancel="handleCancel"> -->
    <FormModal
      :formObj="contactFormObj"
      @cusCloseForm="handleCancel"
      @cusSubmitForm="contactSubmitForm"
    />
    <!-- </a-modal> -->
  </div>
</template>
<script>
import api from "@/api/customerCenter";
import FormModal from "@/views/customerCenter/customerManage/formModal";
export default {
  data() {
    return {
      contactFormObj: {
        formList: []
      },
      // visibles: this.visible,
      valueObj: {},
      form: this.$form.createForm(this, { name: "createCustomer" }),
      dynamicValidateForm: {
        formList: []
      },
    };
  },
  props: {
    custIdParams: Object,
    contactsId:String,
  },
  components: {
    FormModal
  },
  // watch: {
  //   visible(val) {
  //     this.visibles = val;
  //   }
  // },

  mounted() {
    this.getEditContactsInfo();
  },
  methods: {
    getEditContactsInfo(){
      api.editContactsInfo({ contactsId: this.contactsId }).then(res=>{
        console.log("编辑联系人回显", res);
        if(res.data.status){
          // res.data.list.map(item => {
          //   if (item.fieldCode == "contactsArea")
          //     item.fieldValue = item.fieldValue.length?item.fieldValue.split(","):[];
          // });
          this.contactFormObj.formList = res.data.list;
          console.log( this.contactFormObj.formList)

        }
      })
    },
    cityChange(value) {},
    contactSubmitForm(arr,flag) {

      let params2 = {
        fields: arr,
        ...this.custIdParams,
        contactsId:this.contactsId
      };

      if(!flag){
        api.createLinkMan(params2).then(res => {
          console.log("新建联系人保存", res);
          if (res.data.status) {
            this.$message.success("保存成功");
            this.$emit("successLoadList");
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectChange() {},
    onChange() {},
    handleCancel() {
      this.$emit("closeCreateContact");
    }
  }
};
</script>