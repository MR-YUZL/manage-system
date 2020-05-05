<template>
  <div class="search">
         <a-form :form="form" v-bind="formItemLayout"
          >
            <div v-for="(item,index) in searchList" :key="index" class="search_item" :class="item.type == 'time_interval'?'time_interval':''">
            
             
              <a-form-item :label="item.label" v-if="item.label && item.type == 'input'" >
                <a-input  v-decorator="[...item.model]" />
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'select'" :prop="item.ruleName" style="width:300px">
                <a-select  placeholder="please select your zone" v-decorator="[...item.model]" >
                    <a-select-option v-for="(val,index) in item.options" :key="index" :value="val.key">
                    {{val.value}}
                    </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="item.label" v-if="item.label && item.type == 'time'" :prop="item.ruleName">
                <!-- 日期选择器 -->
                <a-date-picker 
               showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="[...item.model]" />
              </a-form-item>
               <a-form-item :label="item.title" v-else-if="item.type == 'time_interval'" >
               
                <!-- 日期区间选择器 -->
                <a-range-picker  
                    showTime format="YYYY-MM-DD HH:mm:ss"  v-decorator="[...item.model]" />

                
            </a-form-item>
             <a-form-item :label="item.title" v-else-if="item.type == 'select_input'" :wrapper-col="{ span: 24, offset: 1.5 }">

                    <!-- 下拉 + 输入 -->
                <a-input-group compact >
                    <a-select  style="width:80px" :placeholder="item.placeholder" v-decorator="[...item.model[0]]">
                        <a-select-option v-for="(option,index1) in item.options" :key="index1" :value="option.value">
                            {{option.key}}
                        </a-select-option>
                    </a-select>
                    <a-input style="width: 200px" v-decorator="[...item.model[1]]" />
                </a-input-group>

                
            </a-form-item>
            <a-form-item :label="item.title" v-else-if="item.type == 'number_nterval'">
              

                <!-- 数字区间 -->
                <div  class="number" >
                    <a-input-number
                        :min="0"
                        :max="100"
                        style="width: 47%"
                        v-decorator="[...item.model[0]]"
                    />
                    <span>-</span>
                    <a-input-number
                        :min="0"
                        :max="100"
                        style="width: 47%"
                     
                        v-decorator="[...item.model[1]]"
                    /> 
                    <!-- <a-input-number
                        :min="0"
                        :max="100"
                        style="width: 47%"
                        :formatter="value => `${value}个`"
                        :parser="value => value.replace('个', '')"
                        v-decorator="[...item.model[1]]"
                    />  -->
                </div>
                
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }" v-else-if="item.type == 'btn'">
              <a-button type="primary" @click="onSubmit">
                  搜索
              </a-button>
           
            </a-form-item>
            
            </div>
           
            
        </a-form>
  </div>
</template>

<script>

export default {
  data(){
    return{
      form:this.$form.createForm(this, { name: 'transationFlow' }),
      
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        
      },
      
      
      searchList:[
            {
                model:['time'],              //参数数据
                type:'time',        //匹配组件
                name:'',              //参数名称
                label:'回访时间：'     //条件名称
            },
            {
                model:['input'],
                type:'input',
                name:'',
                label:'客户标签：'
            },
            
            {
                model:['select'],//单选下拉
                type:'select',
                name:'',
                label:'客户姓名：',
                options:[{key:'1111',value:'1111'},{key:'2222',value:'2222'}]
            },
            {
                model:['input1'],
                type:'input',
                name:'',
                label:'输入框：'
            },
            {
                model:['time1'],
                type:'time',
                name:'',
                label:'结束时间：'
            },
            {
                model:[['select_input1'],['select_input2']],
                type:'select_input',
                name:'',
                label:'',
                // placeholder:'ces',
                options:[{key:'1111',value:'1111'},{key:'2222',value:'2222'}]
            },
             {
                model:['time3'],
                type:'time',
                name:'',
                label:'回访时间：'
            },
            {
                model:['input3'],
                type:'input',
                name:'',
                label:'客户标签：'
            },
            {
              model:['time_interval3'],
              type:'time_interval',
              name:'',
              label:'时间区间：'
            },
            {
              model:[['number_nterval1'],['number_nterval2']],
              type:'number_nterval',
              name:'',
              label:'数字区间：'
            },
        
            {
                type:'btn',
            },
        ],
    
    
    }
  },
//   props:['searchList'],
  components: {
    
  },
  mounted() {},
  methods: {
  
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
  .search{
      .ant-form{
        //   display: flex;
        //   flex-wrap: wrap;
        .search_item{
            display: inline-block;
            .ant-row{
            width: 300px;
            }
        }
        .time_interval{
            margin:0 70px 0 20px;
        }
        
      }
  }
</style>
