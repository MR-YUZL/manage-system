<template>
  <div>
    <a-modal
      v-model="paramsObj1.visible"
      :title="paramsObj.title"
      :footer="null"
      @cancel="handleCancel"
    >
      <FormModal
        style="height:500px;overflow-x:hidden;overflow-y:auto"
        :formObj="cusFormObj"
        @cusCloseForm="handleCancel"
        @cusSubmitForm="cusSubmitForm"
        :detailId="this.detailId"
        :custype="0"
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
      paramsObj1: {},
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
    createCusObj: Object,
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
    this.getEditInfo();
    // if (this.custId) {
    //   this.getEditInfo();
    // }
  },
  methods: {
    //编辑客户
    getEditInfo() {
      api.customerDetail({ custId: this.custId }).then(res => {
        console.log("编辑客户回显", res);
        // res.data.list.map(item => {
        //   if (item.fieldCode == "custArea")
        //     item.fieldValue = item.fieldValue.split(",");
        // });
        res.data.list.map(item=>{
          if(item.fieldCode == 'custArea'){
            item.fieldValue = item.fieldValue?item.fieldValue:[]
          }
        });
        this.paramsObj1 = Object.assign({},this.paramsObj)

        this.cusFormObj.formList = res.data.list;
        // let editArray = res.data.list;
        // this.cusFormObj.formList.map((item, index) => {
        //   if(item.dataType == 3) {
        //     if(!!!item.fieldValue){
        //       item.fieldValue = []
        //     }
        //   }
        // });
        console.log(this.cusFormObj.formList, "aaaaaaaaaaaaaa==========");
      });
    },

    cusSubmitForm(arr,flag) {
      console.log(arr);

      let params2 = {
        fields: arr,
        id: this.detailId,
        custId: this.detailId,
      };

      if(!flag){
        api.createCustomer(params2).then(res => {
          console.log("新建客户保存", res);
          if (res.data.status) {
            this.paramsObj.visible = false;
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
      this.paramsObj.visible = false;
      this.$emit("closeUpdate");
    },
    getForm() {
      api.formFieldsJson({ state: this.bothTypeFlag }).then(res => {
        console.log(res, "列表字段**********-------------");
        if (res.data.status) {
          // res.data.list.map(item => {
          //   if (item.fieldCode == "custArea")
          //     item.fieldValue = item.fieldValue.split(",");
          // });
          this.cusFormObj.formList = res.data.list;
          this.cusFormObj.formList.map((item, index) => {
          if(item.dataType == 3) {
            if(!!!item.fieldValue){
              if(item.options && item.options.length){
                let tempArr = []
                item.options.forEach(element => {
                  if(!!element.isDefault){
                    tempArr.push(element.optionId)
                  }
                });
                item.fieldValue = tempArr;
              }
              else {
                item.fieldValue = []
              }
            }
          }
        });
        }
      });
    },
  }
};
</script>
