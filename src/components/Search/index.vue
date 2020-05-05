<template>
  <div class="search">
    <a-row>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="(item,index) in searchList" :key="index" class="condition">
          <span >{{item.title}}</span>
          <!-- <span v-else></span> -->
          <!-- 输入框 -->
          <a-input v-if="item.status == 'input'" v-model="item.model" placeholder="请输入" />
          <!-- 下拉选择 -->
           <a-select
            v-else-if="item.status == 'select'" 
            v-model="item.model"
            placeholder="请选择实现"
            style="width: 60%"
            @change="handleChange"
            @popupScroll="popupScroll"
            >
            <a-select-option v-for="option in item.options" :key="option">
                {{option}}
            </a-select-option>
          </a-select>

          <!-- 日期选择器 -->
          <a-date-picker v-else-if="item.status == 'time'"
           v-model="item.model" showTime format="YYYY-MM-DD HH:mm:ss" @change="onChange(...arguments,index)" />

          <!-- 日期区间选择器 -->
           <a-range-picker  v-else-if="item.status == 'time_interval'" v-model="item.model" 
            showTime format="YYYY-MM-DD HH:mm:ss" @change="onChange(...arguments,index)" />

            <!-- 下拉 + 输入 -->
          <a-input-group compact v-else-if="item.status == 'select_input'" >
            <a-select  style="width: 35%" :placeholder="item.placeholder">
                <a-select-option v-for="option in item.options" :key="option" >
                    {{option}}
                </a-select-option>
            </a-select>
            <a-input style="width: 65%"  />
          </a-input-group>

          <!-- 数字区间 -->
          <div v-else-if="item.status == 'number_nterval'" class="number">
               <a-input-number
                :min="0"
                :max="100"
                style="width: 47%"
                v-model="item.model[0]"
                :formatter="value => `${value}个`"
                :parser="value => value.replace('个', '')"
                />
                <span>-</span>
               <a-input-number
                :min="0"
                :max="100"
                style="width: 47%"
                v-model="item.model[1]"
                :formatter="value => `${value}个`"
                :parser="value => value.replace('个', '')"
                /> 
          </div>
          <a-button type="primary" v-else-if="item.status == 'btn'" @click="sendMsg">搜索</a-button>
      </a-col>
    </a-row>
    
  </div>
</template>

<script>

export default {
    props:['searchList'],
    data: () => ({
        formItemLayout: {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        },
    }),
    components: {},
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'validate_other' });
    },
    mounted() {
        console.log("goods/groups加载");
    },
    methods: {
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
        .condition{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            margin: 10px 0;
        }
        .condition::after{
            content: '';
            flex:1 //flex:auto
        }
        // .ant-col-6 {
        //     display: flex;
        //     justify-content: space-between;
        //     align-items: center;
        //     padding: 0 20px;
        //     margin: 10px 0;
        // }
        .ant-calendar-picker{
            width: 60% !important;
            min-width: 0 !important;
        }
        
        .ant-input{
            width: 60%;
        }
        .number{
            width: 60%;
        }
    }
    
</style>
