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
      options: [
        {
          value: "浙江",
          label: "浙江",
          children: [
            {
              value: "杭州",
              label: "杭州",
              children: [
                {
                  value: "西湖",
                  label: "西湖"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  props: {
    custIdParams: Object,
    contactsId:String
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
    this.getForm();
    this.getEditContactsInfo();
  },
  methods: {
    getEditContactsInfo(){
      api.editContactsInfo({ contactsId: this.contactsId }).then(res=>{
        console.log("编辑联系人回显", res);
        if(res.data.status){
          this.contactFormObj.formList = res.data.list;
        }
      })
    },
    getForm() {
      api.formFieldsJson({ state: 1 }).then(res => {
        console.log(res, "创建联系人");
        if (res.data.status) {
          this.contactFormObj.formList = res.data.list;
        }
      });
    },
    cityChange(value) {},
    contactSubmitForm(arr) {
      let fields = [];
      // this.contactFormObj.formList.map(v=>{
      //   fields.push({
      //     fieldCode:v.fieldCode,
      //     isDefined:v.isDefined,
      //     fieldValue:v.fieldValue
      //   })
      // })
      let params = {
        fields: arr,
        ...this.custIdParams,
        contactsId:this.contactsId
      };
      api.createLinkMan(params).then(res => {
        console.log("新建联系人保存", res);
        if (res.data.status) {
          this.$message.success("保存成功");
          this.$emit("successLoadList");
        }
      });
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