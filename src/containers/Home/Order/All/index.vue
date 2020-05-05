<template>
  <div>
      <!-- <div v-for="(item,index) in dataList" :key="index">
        <div :style="{ borderBottom: '1px solid #E9E9E9',marginTop: '50px' }" >
          <a-checkbox  @change="onCheckAllChange" :checked="checkAll">
            {{item.checkedAll}}
          </a-checkbox>
        </div>
        <br />
        <a-row >
          <a-col :span="6" v-for="(option,i) in item.plainOptions" :key="i">
          
            <a-checkbox  @change="onCheckAllChange" >
              {{option}}
            </a-checkbox>
          </a-col>
          
        </a-row>
    </div> -->
    <div v-for="(item,index) in testList" :key="index" style="margin-top:50px">
      <span>{{item.title}}</span>
      <div style="display:flex">
         <div v-for="(val,ind) in item.list" :key="ind" style="width:300px" >
           <div :style="{ borderBottom: '1px solid #E9E9E9'}" v-if="val.checkedAll">
          <a-checkbox  @change="onCheckAllChange" :checked="checkAll">
            {{val.checkedAll}}
          </a-checkbox>
        </div>
        <!-- <br /> -->
        <div>
           <div v-for="(option,i) in val.plainOptions" :key="i">
          
            <a-checkbox  @change="onCheckAllChange">
              {{option}}
            </a-checkbox>
          </div>
        </div>
      </div>
      <div>

      </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import "./index.less";
export default {
  data: () => ({
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    plainOptions:['Apple', 'Pear', 'Orange'],
    dataList:[{
      checkedAll:'在线系统',
      plainOptions:['实时数据', '历史记录', '会话记录','留言记录'],
      select:[]
    },{
      checkedAll:'工单系统',
      plainOptions:['数据报表', '工单管理', '设置'],
      select:[]
    },{
      checkedAll:'质检系统',
      plainOptions:[],
      select:[]
    }],
    testList:[
    {
      title:'在线测试',
      list:[
        {
          checkedAll:'工单系统',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        },
        {
          checkedAll:'工单系统',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        }
      ]
    },
    {
      title:'在线测试2',
      list:[
        {
          checkedAll:'',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        },
        {
          checkedAll:'工单系统',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        }
      ]
    },
    {
      title:'在线测试3',
      list:[
        {
          checkedAll:'工单系统',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        },
        {
          checkedAll:'工单系统',
          plainOptions:['数据报表', '工单管理', '设置'],
          select:[]
        }
      ]
    },
  ],
  }),
  
  components: {},
  mounted() {},
  methods: {
    onChange(checkedList) {
        this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
        this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
        Object.assign(this, {
          checkedList: e.target.checked ? this.plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
    }
  },
  watch: {},
  computed: {}
};
</script>
