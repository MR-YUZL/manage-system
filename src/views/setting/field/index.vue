<template>
    <div class>
        <a-page-header title="字段设置"/>
        <div class="box">
            <a-tabs :activeKey="activeKey" @change="clickTabs">
                <a-tab-pane key="1" tab="客户字段设置"></a-tab-pane>
                <a-tab-pane key="2" tab="联系人字段设置"></a-tab-pane>
                <a-tab-pane key="3" tab="工单字段设置"></a-tab-pane>
            </a-tabs>
            <div class="addField">
                <a-button type="primary" @click="addField">添加字段</a-button>
            </div>
            <div class="table-data">
                <a-table :columns="columns" :dataSource="dataSource" :pagination = 'false' :rowkey="record=> record.fieldId">
                    <div slot="action" slot-scope="record,row">
                        <span class="blue" style="margin-right:10px;" @click="editField(row)">编辑</span>
                        <span class="blue" @click="deleteField(row)">删除</span>
                    </div>
                </a-table>
            </div>
            <div style="padding-bottom:50px;"><TablePagination :parentPager="pager" @paginationChange="paginationChange"></TablePagination></div>
        </div>
        <a-modal
            title="添加字段"
            width="650px"
            v-if="addFieldShow"
            :visible="addFieldShow"
            @cancel="handleCancelAddField"
            @ok="handleOkAddfield">
            <a-form-model
                ref="addForm"
                :model="addFormData"
                :rules="rules"
                :label-col="labelCol"
                :wrapper-col="wrapperCol">
                <a-form-model-item label="字段名称" prop="fieldName">
                    <a-input @blur="fieldNameBlur" v-model="addFormData.fieldName" placeholder="请输入字段名称"></a-input>
                </a-form-model-item>
                <a-form-model-item label="状态">
                    <a-radio-group v-model="addFormData.enable">
                        <a-radio-button :value="0">禁用</a-radio-button>
                        <a-radio-button :value="1">启用</a-radio-button>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="必填属性">
                    <a-radio-group v-model="addFormData.isRequired">
                        <a-radio-button :value="0">否</a-radio-button>
                        <a-radio-button :value="1">是</a-radio-button>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="字段类型" prop="dataType">
                    <a-radio-group v-model="addFormData.dataType" @change="changeDataType">
                        <div class="radioStyle">
                            <div v-for="(item,index) in dataTypeList" :key="index">
                                <a-radio v-if="item.show" :value="item.value">{{item.name}}</a-radio>
                            </div>
                        </div>
                    </a-radio-group>
                </a-form-model-item>
                <div class="addChoice" v-if="addOptionsShow">
                    <div v-for="(it,idx) in addFormData.options" :key="idx">
                        <a-form-model-item
                            :wrapperCol="{ span: 20 }"
                            :labelCol="{ span: 4 }"
                            :prop="'options.'+idx+'.optionValue'"
                            :rules="{required: true, message: '请输入添加的选项', trigger: 'change' }">
                            <div class="singleChoice">
                                <a-input
                                    v-model="addFormData.options[idx].optionValue"
                                    placeholder="请输入要增加的字段"/>
                                <a-form-model-item>
                                    <a-checkbox
                                        @change="changeDefaultValue(idx)"
                                        v-model="addFormData.options[idx].isDefault">默认</a-checkbox>
                                </a-form-model-item>
                                <a-icon type="minus-circle-o" @click="removeDomain(idx)"/>
                            </div>
                        </a-form-model-item>
                    </div>
                    <a-button class="addBtn" type="primary" @click="addDomain">添加选项</a-button>
                </div>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import TablePagination from "@/components/Table/TablePagination";
    export default {
        name : "",
        components : {TablePagination},
        props : {},
        data() {
            return {
                activeKey: "1",
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
                    }, {
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
                    }, {
                        title: "必填字段",
                        dataIndex: "isDefined",
                        key: "3",
                        customRender: value => {
                            let obj = {
                                "0": "否",
                                "1": "是"
                            };
                            return obj[value];
                        }
                    }, {
                        title: "状态",
                        dataIndex: "enable",
                        key: "4",
                        customRender: value => {
                            let obj = {
                                "0": "否",
                                "1": "是"
                            };
                            return obj[value];
                        }
                    }, {
                        title: "操作",
                        dataIndex: "followAccName",
                        key: "5",
                        fixed:'right',
                        scopedSlots: {
                            customRender: "action"
                        }
                    }
                ],
                addFormData: {
                    fieldName: "",
                    isRequired: "0", //是否必填：0-否；1-是
                    dataType: "1", //1:文本字段，2：单选字段，3：多选字段，4：日期字段，5：数字字段
                    enable: "0", //是否启用：0-否；1-是
                    options: [],
                    isDefined:1,  // 所有新增的字段 这个值为1
                    state:''
                },
                addOptionsShow: false,
                rules: {
                    fieldName: [
                        {
                            required: true,
                            message: "请输入姓名",
                            trigger: "blur"
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
                        show: true
                    }, {
                        name: "单选字段",
                        value: 2,
                        show: true
                    }, {
                        name: "多选字段",
                        value: 3,
                        show: true
                    }, {
                        name: "日期字段",
                        value: 4,
                        show: true
                    }, {
                        name: "数字字段",
                        value: 5,
                        show: true
                    }
                ],
                pager: {
                  pageSizeOptions: ["10", "20", "30", "40", "50"],
                  currentPage: 1,
                  pageSize: 10,
                  totalRecord: 0,
                  totalPage: 0
                },
            };
        },
        created() {
            this.getList();
        },
        mounted() {},
        methods : {
            getList() {
                // 0-客户字段,1-联系人字段,2-工单字段
                let params = {
                    state: this.activeKey
                };
                this
                    .Request
                    .post("/config/hfwConfigFields/list", {
                        ...params
                    })
                    .then(res => {
                        console.log("字段设置", res.data);
                        this.dataSource = res.data.list
                    });
            },
            clickTabs(key) {
                this.activeKey = key;

                this.getList();
            },
            editField(row) {
                this.addFieldShow = true;
                console.log(row)
                let {fieldName,isRequired,dataType,enable,isDefined} = row
                this.addFormData = {
                  fieldName,
                  isRequired, //是否必填：0-否；1-是
                  dataType, //1:文本字段，2：单选字段，3：多选字段，4：日期字段，5：数字字段
                  enable, //是否启用：0-否；1-是
                  options: [],
                  isDefined
                }
            },
            deleteField(row) {
                let params = {
                    fieldCode: row.fieldCode,
                    state: this.activeKey
                }
                let that= this
                this.$confirm({
                  title:'',
                  content: <div style="color:red;"> 确定要删除吗？</div>,
                  onOk() {
                     that.Request
                    .post('/config/hfwConfigFields/delJson', {
                        ...params
                    })
                    .then(res => {
                        console.log('删除字段', res.data)
                    })
                  },
                  onCancel() {
                  },
                });
               
            },
            addField() {
                this.addFieldShow = true;
            },
            handleCancelAddField() {
                this.addFieldShow = false;
                this.$refs.addForm.resetFields();
            },
            handleOkAddfield() {
              let params = {
                ...this.addFormData,
                state:this.activeKey,
                isDefined:1  /// 所有新增 这个字段都为0
              }
                this
                    .$refs
                    .addForm
                    .validate(valid => {
                        if (valid) {
                            console.log("表单数据", params);
                            this
                                .Request
                                .post('/config/hfwConfigFields/edit', {
                                    ...params
                                })
                                .then(res => {
                                  this.$message.success('添加成功')
                                   this.addFieldShow = false
                                  console.log('添加字段', res.data)
                                })
                        }
                    });
            },
            // 切换字段类型
            changeDataType() {
                let dataType = this.addFormData.dataType;
                if (dataType == 2 || dataType == 3) {
                    this.addFormData.options = [
                        {
                            isDefault: false,
                            optionValue: ""
                        }
                    ];
                    this.addOptionsShow = true;
                } else {
                    this.addOptionsShow = false;
                    this.addFormData.options = []
                }
            },
            addDomain() {
                this
                    .addFormData
                    .options
                    .push({isDefault: false, optionValue: ""});
            },
            removeDomain(idx) {
                if (this.addFormData.options.length > 1) {
                    this
                        .addFormData
                        .options
                        .splice(idx, 1);
                }
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
            fieldNameBlur(){
              let params = {
                state:this.activeKey,
                fieldName:this.addFormData.fieldName
              }
              this
                .Request
                .post('/config/hfwConfigFields/detectJson', {
                    ...params
                })
                .then(res => {
                    console.log('字段查重', res.data)
                })
            },
            paginationChange(){

            }
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