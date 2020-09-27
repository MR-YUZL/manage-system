<template>
  <div>
    <a-form-model ref="dynamicValidateForm" v-bind="formItemLayout" :model="formObj">
      <a-form-model-item
        v-for="(item,index) in formObj.formList"
        :key="item.fieldId"
        :label="item.fieldName"
        :prop="'formList.' + index + '.fieldValue'"
        :rules="[{ required: item.isRequired?true:false, message: '不能为空',trigger:'blur' },{validator:checkForm}]"
      >
      <!-- {validator: (rule, value, callback) => {vv(rule, value, callback,item.fieldCode)} -->
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

        <a-cascader
          v-if="item.dataType==6"
          :options="areaDictionary"
          :field-names="fieldNames"
          placeholder="请选择省市"
          change-on-select
          @change="cityChange"
          v-model="item.fieldValue"
        />

        <a-range-picker
          v-if="item.dataType==4"
          format="YYYY-MM-DD"
          v-model="item.fieldValue"
          allowClear
        />

        <a-select
          v-if="item.dataType==3"
          mode="multiple"
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

      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 10 }">
        <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">保存</a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { areaDictionary } from "@/utils/areaDictionary";
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      fieldNames:{
        label: "name",
        value: "adcode",
        children: "districts"
      },
      areaDictionary,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      
    };
  },
  props: {
    formObj: {
      type: Object
    },
    repeatList:Array,
    detailId: String
  },
  methods: {
    submitForm(formName) {
    
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.formObj.formList,'this.formObj.formList==========')
          let arr = [...this.formObj.formList]
          // arr.map((item,index) => {
          //   if(item.fieldCode == "contactsArea"){
          //     item.fieldValue = item.fieldValue.join(',')
          //   }
          // })
          this.$emit("cusSubmitForm", arr);
        }else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit("cusCloseForm");
    },
    onChange() {},
    cityChange(value) {
      // console.log(value)
    },
    checkForm(rule, value, callback) {
      let ind =  rule.field.replace(/[^0-9]/ig,"");
      const index = Number(ind);
      let fieldCode = this.formObj.formList[index].fieldCode;
      if(fieldCode == 'custPhone' || fieldCode == 'contactsPhone'){
        let reg = /^((1[123456789][0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
        if(value!=''&&!reg.test(value)){
          callback('联系人号码不正确');
        }else{
          callback();
        }
      }
      if(fieldCode == 'custName'){
        if(!value.trim()){
          callback('客户名称不正确');
        }else{
          callback();
        }
      }
      if(fieldCode == 'custEmail' || fieldCode == 'contactsEmail'){
        let regs = /\w@\w*\.\w/;
        if(value!=''&&!regs.test(value)){
          callback('邮箱格式不正确');
        }else{
          callback();
        }
      }
      
      callback();
    },
    async vv(rule, value, callback,a) {
      if(a === 'custPhone') {
        let params1 = {
        fields: [{
            fieldCode: 'custPhone',
            fieldValue: value
          }],
        id: this.detailId,
        type:0
      };
      let flag=true
      await api.detectRepeat(params1).then(response=>{
          console.log(response,'去重数组')
          if(response.data.status){
          }else{
            flag = false;
          }
        })
        if(flag) {
          callback()
          } else {
            callback('重复率')
            
        }
      } else {
         callback()
      }
      
    }
  }
};
</script>

<style>
</style>