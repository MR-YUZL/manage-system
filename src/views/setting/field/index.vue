<template>
  <div class>
    <a-page-header title="字段设置" />
    <div class="box">
      <a-tabs :activeKey="activeKey" @change="clickTabs">
        <a-tab-pane key="0" tab="客户字段设置"></a-tab-pane>
        <a-tab-pane key="1" tab="联系人字段设置"></a-tab-pane>
        <a-tab-pane key="2" tab="工单字段设置"></a-tab-pane>
      </a-tabs>
      <div class="addField">
        <a-button type="primary" @click="addField">添加字段</a-button>
      </div>
      <div class="table-data">
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          :rowKey="record=> record.fieldId"
        >
          <div slot="action" slot-scope="record,row">
            <span class="blue" style="margin-right:10px;" @click="editField(row)">编辑</span>
            <span class="blue" v-if="row.isDefined!=0" @click="deleteField(row)">删除</span>
          </div>
        </a-table>
      </div>
      <div style="padding-bottom:50px;">
        <!-- <TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination> -->
      </div>
    </div>
    <a-modal
      :title="addType=='add'?'添加字段':'编辑字段'"
      width="650px"
      v-if="addFieldShow"
      :visible="addFieldShow"
      @cancel="handleCancelAddField"
      @ok="handleOkAddfield"
    >
      <a-form-model
        ref="addForm"
        :model="addFormData"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="字段名称" prop="fieldName">
          <a-input @blur="fieldNameBlur" v-model="addFormData.fieldName" :disabled="addFormData.isDefined==0 ? true : false" :maxLength='8' placeholder="请输入字段名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-radio-group v-model="addFormData.enable" :disabled="addFormData.dataType== 1 ? true : false">
            <a-radio-button :value="0">禁用</a-radio-button>
            <a-radio-button :value="1">启用</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="必填属性">
          <a-radio-group v-model="addFormData.isRequired" :disabled="addFormData.dataType== 1 ? true : false">
            <a-radio-button :value="0">否</a-radio-button>
            <a-radio-button :value="1">是</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="字段类型" prop="dataType">
          <a-radio-group v-model="addFormData.dataType" @change="changeDataType">
            <div class="radioStyle">
              <div v-for="(item,index) in dataTypeList" :key="index">
                <!-- <a-radio v-if="item.show" :disabled="item.disabled" :value="item.value">{{item.name}}</a-radio> -->
                <a-radio v-if="item.show" :disabled="addType=='add' ? false : true" :value="item.value">{{item.name}}</a-radio>
              </div>
            </div>
          </a-radio-group>
        </a-form-model-item>
        <div class="addChoice" v-show="addFormData.dataType==2||addFormData.dataType==3">
          <div v-for="(it,idx) in addFormData.options" :key="idx">
            <a-form-model-item
              :wrapperCol="{ span: 20 }"
              :labelCol="{ span: 4 }"
              :prop="'options.'+idx+'.optionName'"
              :rules="{required: true, message: '请输入添加的选项', trigger: 'blur',  whitespace: true}">
              <div class="singleChoice">
                <a-input v-model="addFormData.options[idx].optionName" :maxLength='10' placeholder="请输入要增加的字段" />
                <a-form-model-item>
                  <a-checkbox
                    @change="changeDefaultValue(idx)"
                    v-model="addFormData.options[idx].isDefault"
                  >默认</a-checkbox>
                </a-form-model-item>
                <a-icon type="minus-circle-o" @click="removeDomain(idx)" />
              </div>
            </a-form-model-item>
          </div>
          <a-button v-if="addFormData.options.length>0" class="addBtn" type="primary" @click="addDomain">添加选项</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import TablePagination from "@/components/Table/TablePagination";
export default {
  name: "",
  components: { TablePagination },
  props: {},
  data() {
    return {
      activeKey: "0",
      addFieldShow: false,
      dataSource: [
        // {
        //     fieldName: "微信",
        //     dataType: "2",
        //     isDefined: "0",
        //     enable: 0
        // }
      ],
      columns: [
        {
          title: "字段名称",
          dataIndex: "fieldName",
          key: "1"
          // scopedSlots: { customRender: 'guestName' },
        },
        {
          title: "字段类型",
          dataIndex: "dataType",
          key: "2",
          customRender: value => {
            let obj = {
              "1": "文本字段",
              "2": "单选字段",
              "3": "多选字段",
              "4": "日期字段",
              "5": "数字字段"
            };
            return obj[value];
          }
        },
        {
          title: "必填属性",
          dataIndex: "isRequired",
          key: "3",
          customRender: value => {
            let obj = {
              "0": "否",
              "1": "是"
            };
            return obj[value];
          }
        },
        {
          title: "状态",
          dataIndex: "enable",
          key: "4",
          customRender: value => {
            let obj = {
              "0": "禁用",
              "1": "启用"
            };
            return obj[value];
          }
        },
        {
          title: "操作",
          dataIndex: "followAccName",
          key: "5",
          fixed: "right",
          scopedSlots: {
            customRender: "action"
          }
        }
      ],
      addFormData: {
        fieldName: "",
        isRequired: 0, //是否必填：0-否；1-是
        dataType: 1, //1:文本字段，2：单选字段，3：多选字段，4：日期字段，5：数字字段
        enable: 0, //是否启用：0-否；1-是
        options: [ {
            isDefault: false,
            optionName: ""
          }],
        isDefined: "" // 所有新增的字段 这个值为1
      },
      // addOptionsShow: false,
      rules: {
        fieldName: [
          {
            required: true,
            message: "请输入字段名称",
            trigger: "blur",
            whitespace: true
          }
        ]
      },
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      dataTypeList: [
        {
          name: "文本字段",
          value: 1,
          show: true,
          disabled:false
        },
        {
          name: "单选字段",
          value: 2,
          show: true,
          disabled:false
        },
        {
          name: "多选字段",
          value: 3,
          show: true,
          disabled:false
        },
        {
          name: "日期字段",
          value: 4,
          show: true,
          disabled:false
        },
        {
          name: "数字字段",
          value: 5,
          show: true,
          disabled:false
        }
      ],
      addType: ""
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      // 0-客户字段,1-联系人字段,2-工单字段
      let params = {
        state: this.activeKey
      };
      this.Request.get("/config/hfwConfigFields/list", {
        ...params
      }).then(res => {
        this.dataSource = res.data.list;
      });
    },
    clickTabs(key) {
      this.activeKey = key;
      this.getList();
    },
    editField(row) {
      console.log(row)
      this.addFieldShow = true;
      this.addType = "edit";
      let { fieldName, isRequired, dataType, enable, isDefined, options, fieldId} = row;
      if(options.length>0){
        options.map(item=>{
          item.isDefault = item.isDefault==1?true:false
        })
      }
      //isDefined==1 自定义字段  字段类型才能编辑  0  字段类型不能编辑
      if(isDefined==0){
        this.dataTypeList.map(item=>{
          item.disabled = true
        })
      }else{
         this.dataTypeList.map(item=>{
          item.disabled = false
        })
      }
      
      this.addFormData = {
        fieldName,
        isRequired, //是否必填：0-否；1-是
        dataType, //1:文本字段，2：单选字段，3：多选字段，4：日期字段，5：数字字段
        enable, //是否启用：0-否；1-是
        options,
        isDefined,
        stata: this.activeKey,
        fieldId
      };
      this.$forceUpdate()
      console.log(this.addFormData,'lalalalal')
    },
    deleteField(row) {
      let params = {
        fieldCode: row.fieldCode,
        state: this.activeKey
      };
      let that = this;
      this.$confirm({
        title: "",
        content: <div style="color:red;"> 确定要删除吗？</div>,
        onOk() {
          that.Request.get("/config/hfwConfigFields/delJson", {
            ...params
          }).then(res => {
            that.getList()
            console.log("删除字段", res.data);
          });
        },
        onCancel() {}
      });
    },
    addField() {
      this.addFieldShow = true;
      this.addType = "add";
      this.addFormData = {
        fieldName: "",
        isRequired: 0,
        dataType: 1,
        enable: 1,
        isDefined: 1,
        options:[]
      };
      this.dataTypeList.map(item=>{
        item.disabled = false
      })
    },
    handleCancelAddField() {
      this.addFieldShow = false;
      this.$refs.addForm.resetFields();
    },
    handleOkAddfield() {
      let {options,...others} = this.addFormData
      let params = {
        state: this.activeKey,
        ...others
      };  
      let optionsNews = JSON.parse(JSON.stringify(options));
      optionsNews.map((item)=>{
        item.isDefault=item.isDefault?1:0
      })
      params.options = optionsNews
      if(!(this.addFormData.dataType==2||this.addFormData.dataType==3)){
        params.options = []
      }
      if (this.addType == "add") {
        params.isDefined = 1; // 所有新增 这个字段都为0
      }
      this.$refs.addForm.validate(valid => {
        if (valid) {
          console.log("表单数据", params);
           // 先进行字段名称查重复
          this.Request.get("/config/hfwConfigFields/detectJson", { state:this.activeKey, fieldName:this.addFormData.fieldName,fieldId:this.addFormData.fieldId}).then( () => {
            this.Request.post("/config/hfwConfigFields/edit", {
              ...params
            }).then(() => {
              this.$message.success("添加成功");
              this.getList();
              this.addFieldShow = false;
            });
          });
        }
      });
    },
    // 切换字段类型
    changeDataType() {
      let dataType = this.addFormData.dataType;
      if (dataType == 2 || dataType == 3) {
        if(this.addFormData.options.length==0){
          this.addFormData.options = [
            {
              isDefault: false,
              optionName: ""
            }
          ];
        }
      }
      this.$forceUpdate()
    },
    addDomain() {
      this.addFormData.options.push({ isDefault: false, optionName: "" });
      this.$forceUpdate()
    },
    removeDomain(idx) {
      if (this.addFormData.options.length > 1) {  
        this.addFormData.options.splice(idx, 1);
      }
      this.$forceUpdate()
    },
    changeDefaultValue(idx) {
      let dataType = this.addFormData.dataType,
        options = this.addFormData.options;
      if (dataType == 2) {
        options.map((item, index) => {
          options[index].isDefault = false;
          options[idx].isDefault = true;
        });
      }
    },
    // 字段查重
    fieldNameBlur() {
    //   console.log('我来查重啦')
    //   let params = {
    //     state: this.activeKey,
    //     fieldName: this.addFormData.fieldName
    //   };
    //   this.Request.post("/config/hfwConfigFields/detectJson", {
    //     ...params
    //   }).then(res => {
    //     console.log("字段查重", res.data);
    //   });
    },
    paginationChange() {}
  }
};
</script>

<style lang="less" scoped>
.radioStyle {
  display: flex;
  justify-content: space-around;
}
.addField {
  margin-bottom: 20px;
  padding-right: 24px;
  text-align: right;
}
</style>
<style lang="less">
.singleChoice {
  display: flex;
  align-items: center;
  margin-left: 20%;
  .ant-form-item {
    margin-bottom: 0;
    margin-left: 15px;
  }
  input {
    width: 200px;
  }
}
.addChoice {
  position: relative;
  .ant-form-explain {
    padding-left: 20%;
  }
  .addBtn {
    position: absolute;
    right: 80px;
    bottom: 5px;
  }
}
</style>