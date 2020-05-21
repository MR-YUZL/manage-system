<template>
  <div>
    <a-modal v-model="visibles" title="创建客户" :footer="null" @cancel="handleCancel">
      <a-form-model ref="dynamicValidateForm" :model="dynamicValidateForm">
        <a-form-model-item
          v-for="(item,index) in dynamicValidateForm.formList"
          :key="item.fieldId"
          :label="item.fieldName"
          :prop="'formList.' + index + '.fieldValue'"
          :rules="[{ required: item.isRequired?true:false, message: '不能为空' }]"
        >
          <a-input
            v-if="item.dataType==1"
            v-model="item.fieldValue"
            style="width: 200px"
            placeholder="请输入"
          />

          <a-select
            v-if="item.dataType==2"
            style="width: 170px"
            @change="onChange($event,item)"
            v-model="item.fieldValue"
            placeholder="请选择"
          >
            <a-select-option
              v-for="(item,index) in item.options"
              :key="index"
              :value="item.optionId"
            >{{item.optionName}}</a-select-option>
          </a-select>

          <a-cascader
            v-if="item.dataType==3"
            :options="options"
            placeholder="请选择省市"
            @change="cityChange"
          />

          <a-range-picker
            v-if="item.dataType==4"
            format="YYYY-MM-DD"
            style="width:240px"
            v-model="item.fieldValue"
            allowClear
          />
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            @click="submitForm('dynamicValidateForm')"
          >保存</a-button>
          <a-button style="margin-left: 10px" >取消</a-button>
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
      visibles: this.visible,
      valueObj: {},
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
    visible: Boolean
  },
  watch: {
    visible(val) {
      this.visibles = val;
    }
  },

  mounted() {
    this.getForm();
  },
  methods: {
    getForm() {
      api.setFieldsJson({ state: 0 }).then(res => {
        console.log(res, "列表字段");
        if (res.data.status) {
          this.dynamicValidateForm.formList = res.data.list;
        }
      });
    },
    cityChange(value) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm.formList)
          let fields = [];
          this.dynamicValidateForm.formList.map(v=>{
            fields.push({
              fieldCode:v.fieldCode,
              isDefined:v.isDefined,
              fieldValue:v.fieldValue
            })
          })
          let params = {
            custId:'',
            fields:fields
          }
          api.createCustomer(params).then(res => {
            console.log('新建客户保存',res)
            if(res.data.status){
              this.$Message.success('保存成功')
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectChange() {},
    onChange() {},
    handleCancel(e) {
      this.visibles = false;
      this.$emit("closeUpdate");
    }
  }
};
</script>