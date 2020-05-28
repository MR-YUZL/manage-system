<template>
  <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item
      v-for="(item,index) in formList"
      :key="'formModalItem_'+index"
      :label="item.label"
    >
      <!-- input -->
      <a-input
        v-if="item.type == 'input'"
        v-model="formInline[item.name]"
        :placeholder="item.placeholder"
        allowClear
      ></a-input>
      <!-- select 下拉框 -->
      <a-select
        style="width: 174px;"
        v-if="item.type=='select'"
        v-model="formInline[item.name]"
        :mode="item.mode?item.mode:'default'"
        optionFilterProp="children"
        :placeholder="item.placeholder"
        allowClear
      >
        <a-select-option
          v-for="(it,idx) in item.options"
          :key="'formModelOption_'+idx"
          :value="item.optionValue?it[item.optionValue]:it['value']"
        >{{item.optionLabel?it[item.optionLabel]:it['label']}}</a-select-option>
      </a-select>
      <!-- select group 下拉框 -->
      <a-select
        style="width: 174px;"
        v-if="item.type=='selectGroup'"
        v-model="formInline[item.name]"
        :mode="item.mode?item.mode:'default'"
        optionFilterProp="children"
        :placeholder="item.placeholder"
        allowClear
      >
        <a-select-opt-group
          v-for="(group,groupIdx) in item.list"
          :key="'formModelSelectGroup_'+groupIdx+'_'+group.groupId"
        >
          <span slot="label">
            <a-icon type="apartment" />
            {{group.groupName}}
          </span>
          <a-select-option
            v-for="(groupOption,optionIdx) in item.groupOptionsName?group[item.groupOptionsName]:group['staffs']"
            :key="'groupOption_'+optionIdx"
            :value="groupOption.value"
          >{{groupOption.name}}</a-select-option>
        </a-select-opt-group>
      </a-select>
      <!-- compact 组合 -->
      <a-input-group compact v-if="item.type=='compact'">
        <a-select style="min-width: 94px;" v-model="formInline[item.compactName]">
          <a-select-option
            v-for="(it,idx) in item.options"
            :key="'formModelOption_'+idx"
            :value="it.value"
          >{{it.label}}</a-select-option>
        </a-select>
        <a-input
          v-if="item.compact=='input'"
          v-model="formInline[item.name]"
          :placeholder="item.placeholder"
          style="width:174px;"
        />
        <a-range-picker
          v-if="item.compact=='datepicker'"
          format="YYYY-MM-DD"
          v-model="formInline[item.name]"
        />
      </a-input-group>
      <a-input-group compact v-if="item.type=='inputCompact'">
        <a-input v-model="formInline[item.name][0]" style=" width: 80px;" allowClear />
        <a-input
          style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="~"
          disabled
        />
        <a-input v-model="formInline[item.name][1]" style="width: 80px; border-left: 0" allowClear />
      </a-input-group>

      <!-- datepicker 时间选择器 -->
      <a-date-picker
        v-if="item.type=='datepicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format?item.format:'YYYY-MM-DD'"
      />
      <a-month-picker
        v-if="item.type=='monthpicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format?item.format:'YYYY-MM'"
      />
      <a-range-picker
        style="width: 200px"
        v-if="item.type=='rangepicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format?item.format:'YYYY-MM-DD'"
        :ranges="item.ranges?item.ranges:dateRanges"
      />
      <a-week-picker v-if="item.type=='weekpicker'" v-model="formInline[item.name]" />

      <!-- treeselect -->
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" html-type="submit">search</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
// :ranges=""
import moment from "moment";
export default {
  props: {
    formList: {
      type: Array
    },
    defaultFormValues: {
      type: Object
    }
  },
  watch: {
    defaultFormValues: {
      handler(val, oldVal) {
        this.formInline = Object.assign({}, this.formInline, val);
      },
      deep: true
    }
  },
  data() {
    return {
      formInline: {},
      dateRanges: {
        今日: [moment(), moment()],
        本周: [moment().startOf("week"), moment().endOf("week")],
        本月: [moment().startOf("month"), moment().endOf("month")],
        本季度: [moment().startOf("quarter"), moment().endOf("quarter")]
      }
    };
  },
  created() {
    this.formInline = Object.assign(
      {},
      this.formInline,
      this.defaultFormValues
    );
    this.formList.map((item, index) => {
      if (
        item.type == "inputCompact" &&
        !(this.formInline[item.name] && thisformInline[item.name].length)
      ) {
        this.formInline[item.name] = [undefined, undefined];
      } else if (
        item.type == "datepicker" ||
        item.type == "monthpicker" ||
        item.type == "weekpicker" ||
        (item.type == "compact" && item.compact == "datepicker")
      ) {
        // this.formInline[item.name] = null;
      } else if (item.type == "rangepicker") {
        // this.formInline[item.name] = [null, null];
      }
    });
  },
  methods: {
    handleSubmit(e) {
      console.log(this.formInline);
    }
  }
};
</script>
