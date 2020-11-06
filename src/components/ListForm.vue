<template>
  <a-form-model class="ListForm" ref="changeableForm" :model="changeableForm">
    <a-row type="flex" justify="end" style="margin-bottom: 18px">
      <a-col>
        <a-button @click="handleAdd" class="add"> 新增地区 </a-button>
      </a-col>
    </a-row>

    <a-table
      bordered
      :data-source="list"
      :columns="columns"
      :pagination="false"
      :rowClassName="handleClass"
      :rowKey="(row) => row.key"
    >
      <template slot="cityName" slot-scope="text, record, index">
        <a-form-model-item
          :prop="`item.${index}.${record.first}`"
          :rules="{
            required: true,
            message: '地区不能为空',
            trigger: 'change',
          }"
        >
          <a-cascader
            :options="record.firstOption"
            placeholder="选择地区"
            change-on-select
            :default-value="[]"
            v-model="changeableForm.item[index].cityName"
          />
        </a-form-model-item>
      </template>
      <template slot="rule" slot-scope="text, record, index">
        <a-form-model-item
          :prop="`item.${index}.${record.second}`"
          :rules="{
            required: true,
            message: '规则不能为空',
            trigger: 'change',
          }"
        >
          <a-select
            v-model="changeableForm.item[index].rule"
            placeholder="请选择规则"
            style="width: 100%"
          >
            <a-select-option
              v-for="(v, index) in record.secondOption"
              :key="index"
              :value="v"
            >
              {{ v }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </template>
      <template slot="name" slot-scope="text, record, index">
        <a-form-model-item
          :prop="`item.${index}.${record.third}`"
          :rules="{
            required: true,
            message: '人名不能空',
            trigger: 'change',
          }"
        >
          <component
            :is="changeableForm.item[index].rule | filterComponent"
            v-model="changeableForm.item[index].name"
            placeholder="请输入人名"
            :options="record.thirdOption"
            style="width: 100%"
          ></component>
        </a-form-model-item>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-popconfirm
          v-if="index !== 0"
          title="确认删除?"
          @confirm="() => remove(record, index)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>

        <span v-else> / </span>
      </template>
    </a-table>

    <a-row>
      <a-col>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            @click="submitForm('changeableForm')"
          >
            提交
          </a-button>
          <a-button
            style="margin-left: 10px"
            @click="resetForm('changeableForm')"
          >
            重置
          </a-button>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { ListForm2 } from "@/utils/name";
export default {
  name: "ListForm",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      ListForm2,
      changeableForm: {
        item: [{ cityName: ["jiangsu"], name: "张三", rule: "销售手动自取" }],
      },
    };
  },
  filters: {
    filterComponent(val) {
      switch (val) {
        case "销售手动自取":
          return "Input";
          break;
        case "1":
          return "Select";
          break;
        case "2":
          return "Select";
          break;
        default:
          return "Input";
          break;
      }
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          this.changeableForm.item.push(
            { cityName: ["jiangsu"], name: "李四", rule: "1" },
            { cityName: ["jiangsu"], name: "王五", rule: "2" }
          );
          resolve();
        }, 1000);
      });

      let arr = [];
      let length = this.changeableForm.item.length;
      for (let index = 0; index < length; index++) {
        arr.push({
          key: parseInt(Math.random() * 100) + index,
          first: "cityName",
          firstOption: [
            {
              value: "zhejiang",
              label: "浙江",
              children: [
                {
                  value: "hangzhou",
                  label: "浙江",
                  children: [
                    {
                      value: "xihu",
                      label: "西湖",
                    },
                  ],
                },
              ],
            },
            {
              value: "jiangsu",
              label: "江苏",
              children: [
                {
                  value: "nanjing",
                  label: "南京",
                  children: [
                    {
                      value: "zhonghuamen",
                      label: "中华门",
                    },
                  ],
                },
              ],
            },
          ],
          second: "rule",
          secondOption: ["销售手动自取", "2", "3"],
          third: "name",
          thirdOption: [
            {
              value: "1",
              title: "测试",
            },
            {
              value: "2",
              title: "测试2",
            },
          ],
        });
        this.$emit("update:list", arr);
      }
    },

    handleClass(record, index) {
      return "itemRow";
    },

    resetForm(formName) {
      this.changeableForm.item = this.changeableForm.item.map((v) => {
        return { cityName: undefined, name: undefined, rule: undefined };
      });
      // this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("changeableForm", this.changeableForm);
        } else {
          return false;
        }
      });
    },

    remove(item, idx) {
      let arr = JSON.parse(JSON.stringify(this.list));
      let index = this.list.findIndex((v) => v.key === item.key);

      if (index !== -1) {
        arr.splice(index, 1);
        this.$emit("update:list", arr);

        this.changeableForm.item.splice(index, 1);
      }
    },

    handleAdd() {
      let arr = JSON.parse(JSON.stringify(this.list));
      arr.push({
        key: Date.now(),
        first: "cityName",
        firstOption: [
          {
            value: "zhejiang",
            label: "浙江",
            children: [
              {
                value: "hangzhou",
                label: "浙江",
                children: [
                  {
                    value: "xihu",
                    label: "西湖",
                  },
                ],
              },
            ],
          },
          {
            value: "jiangsu",
            label: "江苏",
            children: [
              {
                value: "nanjing",
                label: "南京",
                children: [
                  {
                    value: "zhonghuamen",
                    label: "中华门",
                  },
                ],
              },
            ],
          },
        ],
        second: "rule",
        secondOption: ["销售手动自取", "2", "3"],
        third: "name",
        thirdOption: [
          {
            value: "1",
            title: "测试",
          },
          {
            value: "2",
            title: "测试2",
          },
        ],
      });
      this.$emit("update:list", arr);

      this.changeableForm.item.push({
        cityName: undefined,
        name: undefined,
        rule: undefined,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.ListForm {
  width: 100%;
  background: #ffffff;
}
/deep/ .ant-table-thead tr th {
  text-align: center;
}
/deep/ .ant-table-tbody tr td {
  padding: 0;
}
/deep/ .ant-select-selection {
  border: 0;
}
/deep/ .ant-input {
  border: 0;
}
</style>
