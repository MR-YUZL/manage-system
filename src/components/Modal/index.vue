<template>
  <div class="model">
     <!-- <a-button type="primary" @click="showModal">Open Modal with async logic</a-button> -->
     <a-modal
      :title="modelObj.title"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
    >
     
      <div>
         <a-form :form="form" v-bind="formItemLayout"
          >
            <div v-for="(item,index) in modelObj.modelList" :key="index">
              <div v-if="item.type == 'font'" :style="{textAlign:'center'}">
                  <p v-for="(value,ind) in item.content" :key="ind" >{{value}}</p>
              </div>
              
              <a-form-item :label="item.label" v-if="item.label && item.type == 'textarea'" >
                <a-input  type="textarea" v-decorator="[...item.model]" />
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'input'" >
                <a-input  v-decorator="[...item.model]" />
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'select'" :prop="item.ruleName">
                <a-select  placeholder="please select your zone" v-decorator="[...item.model]" >
                    <a-select-option v-for="(val,index) in item.options" :key="index" :value="val.key">
                    {{val.value}}
                    </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'radio'" :prop="item.ruleName">
                <a-radio-group v-decorator="[...item.model]" v-for="(val,index) in item.options" :key="index">
                    <a-radio :value="val.key">
                    {{val.value}}
                    </a-radio>
                    <!-- <a-radio value="2">
                    Venue
                    </a-radio> -->
                </a-radio-group>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'checkbox'" >
                <a-checkbox-group v-decorator="[...item.model[0]]" v-for="(val,index) in item.options" :key="index">
                    <a-checkbox :value="val.key" name="type">
                    {{val.value}}
                    </a-checkbox>
                    <!-- <a-checkbox value="2" name="type">
                    Promotion
                    </a-checkbox>
                    <a-checkbox value="3" name="type">
                    Offline
                    </a-checkbox> -->
                </a-checkbox-group>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'upload'" >
                <a-textarea v-decorator="[...item.model]" />
                <a-upload
                  v-decorator="[...item.model[1]]"
                  name="file"
                  :action="action"
                  list-type="text"
                >
                  <a-button> <a-icon type="upload" /> 附件上传 </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'date'" >
                <a-date-picker
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%;"
                    v-decorator="[...item.model]"
                />
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'treeSelect'">
                <a-tree-select
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  placeholder="Please select"
                  allowClear
                  v-decorator="[...item.model]"
                  :treeData="item.options"
                >
                 
                </a-tree-select>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'cascader'" >
                 <a-cascader
                  v-decorator="[...item.model]"
                  :options="item.options"
                />
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'tag'" >
                 <template v-for="tag in item.options">
                  <a-checkable-tag
                    :key="tag.value"
                    :checked="selectedTags.indexOf(tag) > -1"
                    @change="checked => handleChange(tag, checked)"
                  >
                    {{ tag.value }}
                  </a-checkable-tag>
                </template>
              </a-form-item>
            </div>
           
            <a-form-item :wrapper-col="{ span: 14, offset: 8 }">
              <a-button  @click="handleCancel">
                  取消
              </a-button>
              <a-button style="margin-left: 10px;" type="primary" @click="onSubmit">
                  确定
              </a-button>
            </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      form:this.$form.createForm(this, { name: 'transationFlow' }),
      // visible: false,
      confirmLoading: false,
      selectedTags: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      
    
      modelObj1:{
          title:'新增',
          modelList:[
              {
                  type:'font', //文字
                  content:['确认完结工单吗？完结后，可重新开启工单','共删除xxx条数据'],
                  model:'',
                  ruleName:''
              },
              {
                  type:'textarea',
                  label:'文本框',
                  model:[
                    'textarea',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your textarea!',
                        },
                      ],
                    },
                  ],
                 
              },
              {
                  type:'input',
                  label:'输入框',
                  model:[
                    'input',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your input!',
                        },
                      ],
                    },
                  ],
                 
              },
              {
                  type:'select',
                  label:'下拉选择',
                  model:[
                    'select',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your select!',
                        },
                      ],
                    },
                  ],
                  options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                  type:'radio',
                  label:'单选',
                  model:[
                    'radio',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your radio!',
                        },
                      ],
                    },
                  ],
                  options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                type:'checkbox' ,
                label:'多选',
                model:[
                    'checkbox',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your checkbox!',
                        },
                      ],
                    },
                  ],
                options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                  type:'upload',
                  label:'上传',
                  action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',//配置文件上传路径
                  model:[
                    ['upload_text'],
                    [
                    'upload',
                      {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                      },
                    ]
                  ],
              },
              {
                  type:'date',
                  label:'日期',
                  model:[
                    'date',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your date!',
                        },
                      ],
                    },
                  ],
              },
              {
                  type:'treeSelect',
                  label:'树形选择',
                  model:[
                    'treeSelect',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your treeSelect!',
                        },
                      ],
                    },
                  ],
                  options:[
                    {
                      title: 'Node1',
                      value: '0-0',
                      key: '0-0',
                      children: [
                        {
                          value: '0-0-1',
                          key: '0-0-1',
                          title:'0-0-1',
                          children:[
                            {
                              value: '0-0-0-1',
                              key: '0-0-0-1',
                              title:'0-0-0-1',
                            },
                          ]
                        },
                        {
                          title: 'Child Node2',
                          value: '0-0-2',
                          key: '0-0-2',
                        },
                      ],
                    },
                    {
                      title: 'Node2',
                      value: '0-1',
                      key: '0-1',
                    },
                  ]
              },
              {
                  type:'cascader',
                  label:'联级选择',
                  model:[
                    'cascader',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your cascader!',
                        },
                      ],
                    },
                  ],
                  options:[
                    {
                      value: 'zhejiang',
                      label: 'Zhejiang',
                      children: [
                        {
                          value: 'hangzhou',
                          label: 'Hangzhou',
                          children: [
                            {
                              value: 'xihu',
                              label: 'West Lake',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      value: 'jiangsu',
                      label: 'Jiangsu',
                      children: [
                        {
                          value: 'nanjing',
                          label: 'Nanjing',
                          children: [
                            {
                              value: 'zhonghuamen',
                              label: 'Zhong Hua Men',
                            },
                          ],
                        },
                      ],
                    },
                  ]
              },
              {
                type:'tag' ,
                label:'标签',
                model:[
                    'tag',
                  ],
                options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
          ]

      },
    
    }
  },
  
  components: {
    
  },
  props:['modelObj'],
  mounted() {
   
  },
  methods: {
   
    handleOk(e) {
      console.log(e)
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log(e)
      console.log('Clicked cancel button');
      this.$store.commit('getVisible',false)
    },  
    onSubmit(e) {
      e.preventDefault();
      this.$store.commit('getVisible',false)
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },

    // 附件上传
     normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    //标签选择
     handleChange(tag, checked) {
      const { selectedTags } = this;
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter(t => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      this.selectedTags = nextSelectedTags;
      this.$emit('selectGetTags',this.selectedTags)
    },
  },
  watch: {},
  computed: {
    ...mapState({
      visible: state => state.basic.visible,
    })
  }
};
</script>
<style lang="less" scoped>
  
</style>
