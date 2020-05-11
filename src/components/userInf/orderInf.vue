<template>
    <div class="user_data">
        <div class="header">
            <span class="workOrderIcon">工单信息</span>
            <span class="save" @click="addWorkOrder">新增工单</span>
        </div>
        <div class="content row_1" v-bind:class="{ expansion : active }">
            <a-icon :type="active ? 'up' : 'down'" class="icon" @click="showFn"/>
            <div class="content_item"  >
              <a-row type="flex" justify="space-between" align="bottom" >
                <a-col :span="20" v-for="(item,index) in userInfList" :key="index" class="item" @click="viewDetails(item)">
                  <div class="list">
                    <div class="item_left"><router-link to="/" >{{item.title}}</router-link></div>
                    <div class="item_right item_1" v-if="item.status == 1 ||  item.status == 0">受理中</div>
                    <div class="item_right item_2" v-else-if="item.status == 2">已完结</div>
                  </div>
                </a-col>
                </a-row>  
            </div>
        </div>
        <Model :modelObj="modelObj1" :formData="formData" />
    </div>
</template>
<script>
import Model from './../Modal'
export default {
  // props:{
    //   userInfList:{
    //     type:Array
    //   }
    // },
    components:{
      Model
    },
    data(){
        return{
            active:false,
            userInfList:[
                {
                    title:'名字safdffffasfdsafdsa股份的噶的噶阿发的所发生的',
                    status:'2',
                },
                {
                    title:'名字',
                    status:'1',
                },
                {
                    title:'名字',
                    status:'0',
                },
            ],
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
    methods:{
      showFn(){
        this.active = !this.active
      },
      viewDetails(item){
        console.log(item,'viewDetails(item)')
      },
      addWorkOrder(){
        this.$store.commit('getVisible',true)
      },
      formData(data){
        // this.$emit('',data)
        console.log('传过去提交的数据',data)
      }
    }
}
</script>
<style lang="less" scoped>
    .user_data{
        padding:20px;
        .header{
            display: flex;
            justify-content: space-between;
            .save{
                color:#3E7BF8;
                cursor: pointer;
            }
            .workOrderIcon{
              padding-left:26px;
              background:url('../../assets/imgs/text-icon3.png') left center no-repeat
            }
        }
        .row_1{
            position: relative;
            overflow: hidden;
        }
        .expansion{
           height: 40px;;
        }
        .content{
            
            // position: relative;
            
            .icon{
                position: absolute;
                right: 0;
                top: 18px;
            }
            .content_item{
                width: 93%;
                padding-top: 5px; 
                .item{
                
                    .list{
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        width: 100%;
                        
                        .item_left{
                            min-width: 0px;
                            overflow: hidden;
                            -webkit-box-flex: 1;
                            -ms-flex: 1;
                            flex: 1;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: #6D97F9;
                        }
                        .item_right{
                            padding:0 5px;
                            -ms-flex-negative: 0;
                            flex-shrink: 0;
                            text-align: right;
                            border: 1px solid #D3D3D3;
                            
                        }
                        .item_1{
                            color: #F8A28B;
                        }
                        .item_2{
                            color: #8BD6B8;
                        }
                    }
                display: flex; 
                padding-top: 12px; 
                
                
                }
            }
            
        }
    }
</style>