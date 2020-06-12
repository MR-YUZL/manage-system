<template>
  <div>
    <a-form-model ref="dynamicValidateForm" v-bind="formItemLayout" :model="formObj">
      <a-form-model-item
        v-for="(item,index) in formObj.formList"
        :key="item.fieldId"
        :label="item.fieldName"
        :prop="'formList.' + index + '.fieldValue'"
        :rules="[{ required: item.isRequired?true:false, message: '不能为空' },{validator:checkForm}]"
      >
        <a-input
          v-if="item.dataType==1"
          v-model="item.fieldValue"
          placeholder="请输入"
        />

        <a-select
          v-if="item.dataType==2"
          @change="onChange($event,item)"
          v-model="item.fieldValue"
          placeholder="请选择"
        >
          <a-select-option
            v-for="(it,idx) in item.options"
            :key="idx"
            :value="it.optionId"
          >{{it.optionName}}</a-select-option>
        </a-select>

        <!-- <a-cascader
          v-if="item.dataType==3"
          :options="cityOptions"
          placeholder="请选择省市"
          v-model="item.fieldValue"
          @change="cityChange"
        /> -->

        <a-range-picker
          v-if="item.dataType==4"
          format="YYYY-MM-DD"
          v-model="item.fieldValue"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
        <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">保存</a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      cityOptions: [
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
    formObj: {
      type: Object
    }
  },
  methods: {
    submitForm(formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("cusSubmitForm", this.formObj.formList);
        }else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit("cusCloseForm");
    },
    onChange() {},
    cityChange(value) {},
    checkForm(rule, value, callback) {
      console.log(rule, value,1)
      let ind =  rule.field.replace(/[^0-9]/ig,"");
      this.formObj.formList.map((item,index)=>{
        if(ind == index){
          if(item.fieldCode == 'contactsPhone'){
            let reg = /^((1[123456789][0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
            if(value!=''&&!reg.test(value)){
              callback('联系人号码不正确');
            }else{
              callback();
            }
          }
          if(item.fieldCode == 'contactsEmail'){
            let regs = /\w@\w*\.\w/;
            if(value!=''&&!regs.test(value)){
              callback('邮箱格式不正确');
            }else{
              callback();
            }
          }
        }
      })
    },
  }
};
</script>

<style>
</style>