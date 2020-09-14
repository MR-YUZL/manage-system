<template>
  <div class="transfer-container">
    <div class="transfer-left">
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          :indeterminate="true"
          :checked="leftCheckAll"
          @change="onLeftCheckAllChange"
        >Left Check all</a-checkbox>
      </div>
      <a-checkbox-group v-model="leftDataChecked" :options="leftDataOptions" @change="onLeftChange">
        <draggable>
          <span slot="label" slot-scope="{ option }">{{ option.value }}</span>
        </draggable>
      </a-checkbox-group>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      leftCheckAll: false,
      rightCheckAll: false,
      dataList: [
        {
          fieldId: "eabc1c11349e46d588e8b9524367b707",
          fieldName: "客户名称",
          isRequired: 1,
          dataType: 1,
          enable: 1,
          isDefined: 0,
          fieldCode: "custName",
          state: 0,
          isShow: 1
        },
        {
          fieldId: "8c4107ba1d924bfab610f90bde170929",
          fieldName: "客户级别",
          isRequired: 1,
          dataType: 2,
          enable: 1,
          isDefined: 0,
          fieldCode: "custLevel",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "df15c0eb7a8f42eba23d867848e4092a",
          fieldName: "客户行业",
          isRequired: 0,
          dataType: 2,
          enable: 1,
          isDefined: 0,
          fieldCode: "custTrade",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "ec07ef66db0d4cde8d491b9707a2db57",
          fieldName: "客户分组",
          isRequired: 1,
          dataType: 2,
          enable: 1,
          isDefined: 0,
          fieldCode: "custGroup",
          state: 0,
          isShow: 1
        },
        {
          fieldId: "abef9dadd76042edbc3cccacf32029b5",
          fieldName: "所在地区",
          isRequired: 0,
          dataType: 3,
          enable: 1,
          isDefined: 0,
          fieldCode: "custArea",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "01efd97704b044f09396e0a2b0e30e79",
          fieldName: "客户详细地址",
          isRequired: 0,
          dataType: 1,
          enable: 1,
          isDefined: 0,
          fieldCode: "custAddress",
          state: 0,
          isShow: 1
        },
        {
          fieldId: "e6ee8a0ee72c4d5dbdf2d5b16a39005e",
          fieldName: "备注",
          isRequired: 0,
          dataType: 1,
          enable: 1,
          isDefined: 0,
          fieldCode: "custRemarks",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "a4bd562dab8848259a1a9b69d3d5fc90",
          fieldName: "公司电话",
          isRequired: 0,
          dataType: 1,
          enable: 1,
          isDefined: 0,
          fieldCode: "custPhone",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "db9de083027042b2b86dc15815e33d90",
          fieldName: "自定义字段4",
          isRequired: 1,
          dataType: 3,
          enable: 1,
          isDefined: 1,
          fieldCode: "defined4",
          state: 0,
          isShow: 0
        },
        {
          fieldId: "",
          fieldName: "联系人名称",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "custLinkMan",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "最近跟进时间",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "lastFollowDate",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "下次跟进时间",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "nextFollowDate",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "负责人",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "custPrincipals",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "创建人",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "inputAcc",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "联系人号码",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "custLinkPhone",
          state: "",
          isShow: 1
        },
        {
          fieldId: "",
          fieldName: "客户经理",
          isRequired: "",
          dataType: 1,
          enable: "",
          isDefined: 0,
          fieldCode: "custManager",
          state: "",
          isShow: 1
        }
      ],
      leftDataList: [],
      leftDataChecked: [],
      leftDataOptions: [],
      rightDataList: [],
      rightDataChecked: [],
      rightDataOptions: []
    };
  },
  props: {},
  components: {
    draggable
  },
  created() {
    this.dataInit();
  },
  methods: {
    dataInit() {
      this.leftDataList = this.dataList.filter(item => item.isShow == 0);
      this.leftDataOptions = this.leftDataList.map(item => {
        return { label: item.fieldName, value: item.fieldCode };
      });
      this.rightDataList = this.dataList
        .filter(item => item.isShow == 1)
        .map(item => {
          return { label: item.fieldName, value: item.fieldCode };
        });
      this.rightDataOptions = this.rightDataList.map(item => {
        return { label: item.fieldName, value: item.fieldCode };
      });
    },
    onLeftCheckAllChange() {},
    onLeftChange() {}
  }
};
</script>
<style lang="less" scoped>
</style>