<template>
  <div>
    <a-modal
      v-model="paramsObj.visible"
      :title="paramsObj.title"
      :footer="null"
      @cancel="handleCancel"
    >
      <FormModal
        :formObj="cusFormObj"
        @cusCloseForm="handleCancel"
        @cusSubmitForm="cusSubmitForm"
      />
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
import FormModal from "@/views/customerCenter/customerManage/formModal";
export default {
  data() {
    return {
      // visibles: this.visible,
      cusFormObj: {
        formList: []
      },
      paramsObj: this.createCusObj,
      custId: this.detailId,
      valueObj: {},
      dynamicValidateForm: {
        formList: []
      }
    };
  },
  components: {
    FormModal
  },
  props: {
    visible: Boolean,
    detailId: String,
    createCusObj: Object
  },
  watch: {
    createCusObj(val) {
      console.log(val, "编辑还是新增");
      this.paramsObj = val;
    },
    detailId(val) {
      this.custId = val;
    }
  },
  mounted() {
    this.getForm();
    if (this.custId) {
      this.getEditInfo();
    }
  },
  methods: {
    getForm() {
      api.formFieldsJson({ state: 0 }).then(res => {
        console.log(res, "列表字段**********-------------");
        if (res.data.status) {
          res.data.list.map(item => {
            if (item.fieldCode == "custArea")
              item.fieldValue = item.fieldValue.split(",");
          });
          this.cusFormObj.formList = res.data.list;
        }
      });
    },
    //编辑客户
    getEditInfo() {
      api.customerDetail({ custId: this.custId }).then(res => {
        console.log("编辑客户回显", res);
        res.data.list.map(item => {
          if (item.fieldCode == "custArea")
            item.fieldValue = item.fieldValue.split(",");
        });
        this.cusFormObj.formList = res.data.list;
        // let editArray = res.data.list;
        // this.cusFormObj.formList.map((item, index) => {
        //   this.cusFormObj.formList[index] = Object.assign(
        //     {},
        //     item,
        //     editArray[index]
        //   );
        // });
        console.log(this.cusFormObj.formList, "aaaaaaaaaaaaaa==========");
      });
    },

    cusSubmitForm(arr) {
      console.log(arr);
      let fields = [];
      // this.dynamicValidateForm.formList.map(v=>{
      //   fields.push({
      //     fieldCode:v.fieldCode,
      //     isDefined:v.isDefined,
      //     fieldValue:v.fieldValue
      //   })
      // })
      arr.map(item => {
        if (item.fieldCode == "custArea")
          item.fieldValue = item.fieldValue.join(",");
      });
      let params = {
        fields: arr
      };
      api.createCustomer(params).then(res => {
        console.log("新建客户保存", res);
        if (res.data.status) {
          this.paramsObj.visible = false;
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
      this.paramsObj.visible = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>
