<template>
  <a-row>
      <a-form
            :form="form"
            v-bind="formItemLayout"
        >
        <!-- <a-col v-for="(item,index) in searchList" :key="index" :xs="24" :sm="24" :md="12" :lg="8" :xl="6"> -->
        <div v-for="(item,index) in searchList" :key="index" >   
             <a-form-item :label="item.title" v-if="item.status == 'input'">
                <!-- 输入框 -->
                <a-input  style="width: 200px" placeholder="请输入" v-decorator="[item.model]" />

            </a-form-item>
            <a-form-item :label="item.title" v-else-if="item.status == 'select'" >
              
                <!-- 下拉选择 -->
                <a-select
                    placeholder="请选择实现"
                    v-decorator="[item.model]"
                    style="width: 200px"
                    >
                   <a-select-option v-for="(option,index1) in item.options" :key="index1" :value="option.value">
                            {{option.name}}
                    </a-select-option>
                </a-select>

            </a-form-item>
           
            <a-form-item :label="item.title" v-else-if="item.status == 'time'">
               

                <!-- 日期选择器 -->
                <a-date-picker 
               showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['dateRange_'+item.model]" />

               
            </a-form-item>
            <a-form-item :label="item.title" v-else-if="item.status == 'time_interval'" >
               
                <!-- 日期区间选择器 -->
                <a-range-picker  
                    showTime format="YYYY-MM-DD HH:mm:ss"  v-decorator="['intervals_'+item.model]"/>

                
            </a-form-item>
            <a-form-item :label="item.title" v-else-if="item.status == 'select_input'" :wrapper-col="{ span: 24, offset: 1.5 }">

                    <!-- 下拉 + 输入 -->
                <a-input-group compact >
                    <a-select  style="width:80px" :placeholder="item.placeholder" v-decorator="[item.model[0]]">
                        <a-select-option v-for="(option,index1) in item.options" :key="index1" :value="option.value">
                            {{option.name}}
                        </a-select-option>
                    </a-select>
                    <a-input style="width: 200px" v-decorator="[item.model[1]]" />
                </a-input-group>

                
            </a-form-item>
            <a-form-item :label="item.title" v-else-if="item.status == 'number_nterval'">
              

                <!-- 数字区间 -->
                <div  class="number" >
                    <a-input-number
                        :min="0"
                        :max="100"
                        style="width: 47%"
                        :formatter="value => `${value}个`"
                        :parser="value => value.replace('个', '')"
                        v-decorator="['NUMF'+'_'+item.model]"
                    />
                    <span>-</span>
                    <a-input-number
                        :min="0"
                        :max="100"
                        style="width: 47%"
                        :formatter="value => `${value}个`"
                        :parser="value => value.replace('个', '')"
                        v-decorator="['NUMS'+'_'+item.model]"
                    /> 
                </div>
                
            </a-form-item>
            <a-form-item  v-else-if="item.status == 'btn'">
          
                <a-button type="primary"  @click="handleSubmit">搜索</a-button>
            </a-form-item>
        </div>
      </a-form>
  </a-row>
</template>

<script>
import moment from 'moment'
export default {
  data(){
      return{
        form:this.$form.createForm(this, { name: 'transationFlow' }),
        formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        }, 
      }
  },
  props:['searchList'],

  components: {},
  mounted() {},
  methods: {
    moment,
    handleChange(value) {
        console.log(`Selected: ${value}`);
    },
    popupScroll() {
        console.log('popupScroll');
    },
     
    onChange(date, dateString ,index) {
            
        // this.searchList[index].model = dateString
        console.log(index ,date, dateString);
            
    },
    sendMsg(){
        this.$emit('func',this.searchList)
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          let obj = {}
          let numArr  = []
          for(let val in values){
              console.log(val + '---' + values[val])
              console.log(val.substr(10))
              if(val.substr(0,10) == 'dateRange_'){
                  if(values[val]){
                      obj[val.substr(10)] = values[val].format("YYYY-MM-DD")
                  }else{
                      obj[val.substr(10)] = undefined
                  }
                  
              }
              else if(val.substr(0,10) == 'intervals_'){
                  console.log(values[val])
                  if(values[val]){
                      obj[val.substr(10)] = [values[val][0].format("YYYY-MM-DD"),values[val][1].format("YYYY-MM-DD")]
                  }else{
                      obj[val.substr(10)] = undefined
                  }
                  
              }
              
              else if(val.substr(0,3) == 'NUM'){
                  let index = val.indexOf('_')
                  console.log(index)
                  values[val] ? numArr.push(values[val]):numArr
                  obj[val.substr(index+1)] = numArr
              }
              else{
                  obj[val] = values[val]
              }
           
              
          }
       
        console.log(obj)

        }
      });
    },
  },
  watch: {},
  computed: {}
};
</script>
<style lang="less" scoped>
    .ant-form{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    // .ant-form::after{
    //     content: '';
    //     flex:1;
    // }
</style>
