<template>
  <a-form-model :ref="formObject.ref" v-bind="formItemLayout" :model="formObject">
    <div v-for="(item,index) in formObject.modelList" :key="index">
      <div v-if="item.type == 'font'" :style="{textAlign:'center'}">
        <p v-for="(value,ind) in item.content" :key="ind">{{value}}</p>
      </div>
      <!-- {{item.rules}}
      {{item.ruleName}}-->
      <a-form-model-item :label="item.label" v-if="item.label && item.type == 'defaultText'">
        <span>{{item.value}}</span>
      </a-form-model-item>

        <a-form-model-item
          :label="item.label"
          v-if="item.label && item.type == 'textarea'"
          :prop="'defaultValues.'+item.ruleName"
          :rules="item.rules"
        >
        <a-input
          type="textarea"
          v-model="formObject.defaultValues[item.ruleName]"
          :placeholder="item.placeholder"
          :maxLength="item.maxLength"
          :auto-size="{ minRows: 6, maxRows: 6 }"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'input'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-input  :maxLength="item.maxLength" v-model="formObject.defaultValues[item.ruleName]" :placeholder="item.placeholder" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'select'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-select
          v-model="formObject.defaultValues[item.ruleName]"
          :placeholder="item.placeholder"
          :showSearch="item.showSearch?item.showSearch:false"
          option-filter-prop="children"
        >
          <a-select-option
            v-for="(val,index) in item.options"
            :key="index"
            :value="val.key"
          >{{val.value}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'selectmultiple'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-select
          v-model="formObject.defaultValues[item.ruleName]"
          :placeholder="item.placeholder"
           mode="multiple"
          :showSearch="item.showSearch?item.showSearch:false"
          option-filter-prop="children"
        >
          <a-select-option
            v-for="(val,index) in item.options"
            :key="index"
            :value="val.key"
          >{{val.value}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'selectCascader' && formObject.defaultValues[item.cascaderName]"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-select v-model="formObject.defaultValues[item.ruleName]" :placeholder="item.placeholder">
          <a-select-option
            v-for="(val,index) in item.options"
            :key="index"
            :value="val.key"
          >{{val.value}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'radio'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-radio-group
          v-model="formObject.defaultValues[item.ruleName]"
          v-for="(val,index) in item.options"
          :key="index"
        >
          <a-radio :value="val.key">{{val.value}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'checkbox'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-checkbox-group
          v-model="formObject.defaultValues[item.ruleName]"
          v-for="(val,index) in item.options"
          :key="index"
          :placeholder="item.placeholder"
        >
          <a-checkbox :value="val.key" name="type">{{val.value}}</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'upload'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <Upload @change="handleUploadChange"  ref="upload" :list="formObject.defaultValues[item.ruleName]" :propName="item.ruleName" :uploadParams="item.uploadParams" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'date'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-date-picker
          show-time
          type="date"
          style="width: 100%;"
          v-model="formObject.defaultValues[item.ruleName]"
          :valueFormat="item.format?item.format:'YYYY-MM-DD'"
          :placeholder="item.placeholder"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'treeSelect'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          allowClear
          v-model="formObject.defaultValues[item.ruleName]"
          :treeData="item.options"
          :placeholder="item.placeholder"
        ></a-tree-select>
      </a-form-model-item>
      
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'cascader'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <a-cascader
          v-model="formObject.defaultValues[item.ruleName]"
          :options="item.options"
          :placeholder="item.placeholder"
          :field-names="item.fieldNames"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'tag'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <template v-for="tag in item.options">
          <a-checkable-tag 
            :key="tag.key"
            :checked="selectedTags.indexOf(tag) > -1"
            @change="checked => handleChange(tag, checked,index)"
          >{{ tag.value }}</a-checkable-tag>
        </template>
      </a-form-model-item>

      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'areaCascader'"
        :prop="'defaultValues.'+item.ruleName"
        :rules="item.rules"
      >
        <!-- 省市区联动 -->
        <a-cascader
          v-if="item.type == 'areaCascader'"
          :options="areaDictionary"
          :field-names="item.fieldNames"
          v-model="formObject.defaultValues[item.ruleName]"
          change-on-select
          @change="areaOnChange"
        />
      </a-form-model-item>
    </div>
    <a-form-model-item
      :wrapper-col="{ span: 24 }"
      :style="formObject.type == 'modalForm'?{'text-align':'center'}:{'text-align':'right'}"
    >
      <a-button v-if="formObject.type == 'modalForm'" @click="handleModalState">取消</a-button>
      <a-button
        style="margin-left: 10px;"
        type="primary"
        @click="onSubmit"
      >{{formObject.sureBtn || '确定'}}</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import Upload from "@/components/Upload";
import { areaDictionary } from "@/utils/areaDictionary";
export default {
  props: {
    formObject: {
      type: Object
    }
  },
  components: {
    Upload
  },
  watch: {
    formObject: {
      handler(val, oldVal) {},
      deep: true
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      areaDictionary,
      selectedTags:[]
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(e) {
      e.preventDefault();
      let _that = this;
      _that.$refs[_that.formObject.ref].validate(valid => {
        if (valid) {
          // let obj = {};
          // _that.formObject.modelList.map(item => {
          //   // if (this.selectedTags.length && item.type == "tag") {
          //   //   obj[item.ruleName] = [...this.selectedTags];
          //   // } else {
          //   obj[item.ruleName] = item.model;
          //   // }
          // });
          console.log(_that.formObject.defaultValues);
          _that.$emit("formSubmit", _that.formObject.defaultValues);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      // debugger;
      let _that = this;
      _that.$refs[_that.formObject.ref].resetFields();
      let tempFormObject = _that.formObject;
      // debugger;
      // tempFormObject.modelList.filter(item=>item.type=="upload").forEach(item=>{
      //   tempFormObject.defaultValues[item.ruleName] = []
      // })
      tempFormObject.defaultValues = Object.assign({},_that.formObject.defaultValues);
      tempFormObject = Object.assign({},_that.formObject);
      // upload的不在弹窗内 重置upload
      // this.$refs.upload[0].fileList = []  
    },
    handleModalState() {
      this.$emit("toggleModal", false);
    },
    handleUploadChange(value, propName) {
      console.log("handleUploadChange",value)
      if(propName) {
        this.formObject.defaultValues[propName] = [...value]
      }
    },
    areaOnChange(value) {
      console.log(value)
    },
    handleChange(tag, checked) {
      const { selectedTags } = this;
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter(t => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      this.selectedTags = nextSelectedTags;
    },
  }
};
</script>