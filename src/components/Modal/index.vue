<template>
  <div class="model">
     <a-modal
      :title="modelObj.title"
      :visible="modelObj.visible"
      :confirmLoading="confirmLoading"
      @ok="onSubmit"
      @cancel="handleCancel"
    
    >
     
      <div>
         <a-form-model ref="modelObj" v-bind="formItemLayout" :model="modelObj"
          >
            <div v-for="(item,index) in modelObj.modelList" :key="index">
              <div v-if="item.type == 'font'" :style="{textAlign:'center'}">
                  <p v-for="(value,ind) in item.content" :key="ind" >{{value}}</p>
              </div>
              
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'textarea'" :prop="item.ruleName" :rules="item.rules">
                <a-input  type="textarea" v-model="item.model" />
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'input'" :prop="item.ruleName" :rules="item.rules">
                <a-input  v-model="item.model" />
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'select'" :prop="item.ruleName" :rules="item.rules">
                <a-select  placeholder="" v-model="item.model" >
                    <a-select-option v-for="(val,index) in item.options" :key="index" :value="val.key">
                    {{val.value}}
                    </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'radio'" :prop="item.ruleName" :rules="item.rules">
                <a-radio-group v-model="item.model" v-for="(val,index) in item.options" :key="index">
                    <a-radio :value="val.key">
                    {{val.value}}
                    </a-radio>
                 
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'checkbox'" :prop="item.ruleName" :rules="item.rules">
                <a-checkbox-group v-model="item.model" v-for="(val,index) in item.options" :key="index">
                    <a-checkbox :value="val.key" name="type">
                    {{val.value}}
                    </a-checkbox>
                </a-checkbox-group>
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'upload'" :prop="item.ruleName" :rules="item.rules">
                <a-textarea v-model="item.model" />
                <a-upload
                  name="file"
                  :action="item.action"
                  list-type="text"
                  @change="uploadFile"
                >
                  <a-button> <a-icon type="upload" /> 附件上传 </a-button>
                </a-upload>
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'date'" :prop="item.ruleName" :rules="item.rules">
                <a-date-picker
                    show-time
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%;"
                    v-model="item.model"
                />
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'treeSelect'" :prop="item.ruleName" :rules="item.rules">
                <a-tree-select
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  placeholder="Please select"
                  allowClear
                  v-model="item.model"
                  :treeData="item.options"
                >
                 
                </a-tree-select>
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'cascader'" :prop="item.ruleName" :rules="item.rules">
                 <a-cascader
                  v-model="item.model"
                  :options="item.options"
                />
              </a-form-model-item>
              <a-form-model-item :label="item.label" v-if="item.label && item.type == 'tag'" :prop="item.ruleName" :rules="item.rules">
                 <template v-for="tag in item.options">
                  <a-checkable-tag
                    :key="tag.value"
                    :checked="selectedTags.indexOf(tag) > -1"
                    @change="checked => handleChange(tag, checked,index)"
                  >
                    {{ tag.value }}
                  </a-checkable-tag>
                </template>
              </a-form-model-item>
            </div>
           
            <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
              <a-button  @click="handleCancel()">
                  取消
              </a-button>
              <a-button style="margin-left: 10px;" type="primary" @click="onSubmit">
                  确定
              </a-button>
            </a-form-model-item> -->
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      // form:this.$form.createForm(this, { name: 'transationFlow' }),
      // visible: false,
      confirmLoading: false,
      selectedTags: [],
      obj:{},
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      
     
      modelObj1:{
          title:'新增',
          visible:true,
          modelList:[
              {
                  type:'font', //文字
                  content:['确认完结工单吗？完结后，可重新开启工单','共删除xxx条数据'],
                  model:'',
                  ruleName:'font'
              },
              {
                  type:'textarea',
                  label:'文本框',
                  model:'',
                  ruleName:'textarea'
              },
              {
                  type:'input',
                  label:'输入框',
                  model:'',
                  ruleName:'input'
              },
              {
                  type:'select',
                  label:'下拉选择',
                  model:undefined,
                  ruleName:'select',
                  options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                  type:'radio',
                  label:'单选',
                  model:'',
                  ruleName:'radio',
                  options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                type:'checkbox' ,
                label:'多选',
                model:[],
                ruleName:'checkbox',
                options:[{key:'111',value:'111'},{key:'222',value:'222'}]
              },
              {
                  type:'upload',
                  label:'上传',
                  ruleName:'upload',
                  action:'https://www.mocky.io/v2/5cc8019d300000980a055e76',//配置文件上传路径
                  model:'',
              },
              {
                  type:'date',
                  label:'日期',
                  model:'',
                  ruleName:'date',
              },
              {
                  type:'treeSelect',
                  label:'树形选择',
                  model:[],
                  ruleName:'treeSelect',
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
                  model:[],
                  ruleName:'cascader',
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
                model:[],
                ruleName:'tag',
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
    console.log(this.modelObj)
  this.selectedTags = []
   this.modelObj.modelList.map((item) => {
     if(item.type == 'tag'){
       item.options.map((val) => {
         if(val.selected){
           this.selectedTags.push(val)
         }
       })
     }
   })
  },
  methods: {
   
     uploadFile(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info)
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    handleCancel() {
      // this.modelObj.visible = false
      this.selectedTags = []
      let status = {
        visible:false,
        data:{}
      }
      this.reset(this.modelObj.modelList)
      // this.modelObj.modelList.map(item => {
      //   item.model = undefined
      // })
      this.$emit('formData',status)
    
      // this.$refs[formName].resetFields();
     
    },
    //重置弹框
    reset(list){
      list.map(item => {
        item.model = undefined
      })
    },
    onSubmit(e) {
      e.preventDefault();
    
   
      let  obj = {}
    
      this.modelObj.modelList.map((item) => {
        if(this.selectedTags.length && item.type == 'tag'){
         
          obj[item.ruleName] = [...this.selectedTags]
        }else{
          obj[item.ruleName] = item.model
        }
          
      })
      console.log(obj)
      let status = {
        visible:false,
        data:obj
      }
      this.$emit('formData',status)
      this.selectedTags = []
      this.reset(this.modelObj.modelList)
      
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
      // console.log('You are interested in: ', nextSelectedTags);
      this.selectedTags = nextSelectedTags;
      // this.$emit('selectGetTags',this.selectedTags)
      
    },
  },
  watch: {
   
  },
  computed: {
    ...mapState({
      visible: state => state.basic.visible,
    })
  }
};
</script>
<style lang="less" scoped>
  
</style>
