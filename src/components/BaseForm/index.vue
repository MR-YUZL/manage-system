<template>
  <a-form-model :ref="formObject.ref" v-bind="formItemLayout" :model="formObject">
    <div v-for="(item,index) in formObject.modelList" :key="index">
      <div v-if="item.type == 'font'" :style="{textAlign:'center'}">
        <p v-for="(value,ind) in item.content" :key="ind">{{value}}</p>
      </div>
      <!-- {{item.rules}}
      {{item.ruleName}}-->
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'textarea'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-input type="textarea" v-model="formData[item.ruleName]" :placeholder="item.placeholder" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'input'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-input v-model="formData[item.ruleName]" :placeholder="item.placeholder" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'select'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-select v-model="formData[item.ruleName]" :placeholder="item.placeholder">
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
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-radio-group v-model="formData[item.ruleName]" v-for="(val,index) in item.options" :key="index">
          <a-radio :value="val.key">{{val.value}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'checkbox'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-checkbox-group
          v-model="formData[item.ruleName]"
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
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <Upload :list="formData[item.ruleName]" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'date'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-date-picker
          show-time
          type="date"
          style="width: 100%;"
          v-model="formData[item.ruleName]"
          :placeholder="item.placeholder"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'treeSelect'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-tree-select
          style="width: 100%"
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          allowClear
          v-model="formData[item.ruleName]"
          :treeData="item.options"
          :placeholder="item.placeholder"
        ></a-tree-select>
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'cascader'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <a-cascader v-model="formData[item.ruleName]" :options="item.options" :placeholder="item.placeholder" />
      </a-form-model-item>
      <a-form-model-item
        :label="item.label"
        v-if="item.label && item.type == 'tag'"
        :prop="item.ruleName"
        :rules="item.rules"
      >
        <template v-for="tag in item.options">
          <a-checkable-tag
            :key="tag.value"
            :checked="selectedTags.indexOf(tag) > -1"
            @change="checked => handleChange(tag, checked,index)"
          >{{ tag.value }}</a-checkable-tag>
        </template>
      </a-form-model-item>
    </div>
    <a-form-model-item
      :wrapper-col="{ span: 24 }"
      :style="formObject.type == 'modalForm'?{'text-align':'center'}:{'text-align':'right'}"
    >
      <a-button v-if="formObject.type == 'modalForm'" @click="handleModalState">取消</a-button>
      <a-button style="margin-left: 10px;" type="primary" @click="onSubmit">确定</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import Upload from "@/components/Upload";
export default {
  props: {
    formObject: {
      type: Object
    },
    defaultValues: {
      type: Object
    }
  },
  components: {
    Upload
  },
  watch: {
    // 'defaultValues.updateTime': (val, oldVal) => {
    //   console.log("defaultValues======", val, oldVal);
    // }
    defaultValues: {
      handler(val,oldVal){
        this.formData = Object.assign({},this.formData,val)
        console.log(this.formData,"=====this.formData=====")
      },
      deep: true
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      formData: {}
    };
  },
  created() {
    this.formData = this.defaultValues
    console.log(this.formData,"=====this.formData=====")
  },
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
          // _that.$emit("formSubmit", obj);
          console.log(_that.formData)
        } else {
          return false;
        }
      });
    },
    handleModalState() {
      this.$emit("toggleModal", false);
    }
  }
};
</script>