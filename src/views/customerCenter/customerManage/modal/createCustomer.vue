<template>
  <div>
    <a-modal v-model="visibles" title="创建客户" @ok="handleSubmit" @cancel="handleCancel">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item v-for="(item,index) in formList" :key="index" :label="item.label">
          <a-input
            v-if="item.type=='input'"
            v-decorator="['note', { rules: [{ required: true, message: '' }] }]"
            style="width: 200px"
            placeholder="请输入"
          />


          <a-select
            v-if="item.type=='select'"
            style="width: 170px"
            @change="onChange($event,item)"
            :value="valueObj[item.key]"
            :allowClear="!!item.allowClear"
            :mode="item.mode"
          >
            <a-select-option
              v-for="(item,index) in item.child"
              :key="index"
              :value="item.value"
            >{{item.name}}</a-select-option>
          </a-select>

          <a-range-picker
            v-if="item.type=='DatePicker'"
            format="YYYY-MM-DD"
            style="width:240px"
            v-decorator="[
              'inputTimeArr',
            ]"
            allowClear
            :defaultValue="item.defaultValue?item.defaultValue:[]"
          />

        </a-form-item>

        
        <!--
        <a-form-item label="行业">
          <a-select
            v-decorator="[
          'gender',
          { rules: [{ required: true, message: '' }] },
        ]"
            placeholder=""
            @change="handleSelectChange"
          >
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="客户分组">
          <a-select
            v-decorator="[
          'gender',
          { rules: [{ required: true, message: '' }] },
        ]"
            placeholder=""
            @change="handleSelectChange"
          >
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="所在地区">
            <a-cascader :options="options" placeholder="" @change="onChange" />
        </a-form-item>
        <a-form-item label="详细地址">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: '' }] }]"
          />
        </a-form-item>
        <a-form-item label="备注">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: '' }] }]"
          />
        </a-form-item>
        <a-form-item label="公司电话">
          <a-input
            v-decorator="['note', { rules: [{ required: true, message: '' }] }]"
          />
        </a-form-item>-->
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import api from "@/api/customerCenter";
export default {
  data() {
    return {
      visibles:this.visible,
        valueObj: {},
      form: this.$form.createForm(this, { name: "createCustomer" }),
      formList: [
        {
          type: "input",
          label: "客户名称",
          key: "source"
        },
        {
          type: "select",
          label: "客户级别",
          key: "queryTime",
          mode: "multiple"
        },
        {
          type: "select",
          label: "客户分组",
          key: "status",
          mode: "multiple"
        },
        
        
      ],
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
  watch:{
    visible(val){
      this.visibles = val
    },
  },
  created() {
    this.formList &&
      this.formList.forEach(item => {
        if (item.key != null) {
          // this.valueObj[item.key] = item.defaultValue || null;
          this.$set(this.valueObj, item.key, item.defaultValue || null); // 需要用$set方法去设置data中valueObj的属性值，不然无法实现双向绑定
        }
      });
    console.log(this.formList, this.valueObj);
  },
  methods: {
    handleSubmit() {
      api.createCustomer().then(res=>{

      })
    },
    handleSelectChange() {},
    onChange() {},
    handleCancel(e) {
      this.visibles = false
      this.$emit('closeUpdate')
    },
  }
};
</script>