<template>
  <a-cascader
    :options="options"
    @change="onChange"
    :loadData="loadData"
    placeholder="请选择"
    changeOnSelect
    style="width:330px"
  />
</template>
<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'zhejiang',
            label: '浙江省',
            isLeaf: false,
          },
          {
            value: 'jiangsu',
            label: '江西省',
            isLeaf: false,
          },
        ],
      };
    },
    methods: {
      onChange(value) {
        console.log(value);
      },
      //这个是模拟的ajax请求，你可以把这部分代码改成真正的ajax请求
      loadData(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
          targetOption.loading = false;
          targetOption.children = [
            {
              label: `${targetOption.label} 服务器端加载1`,
              value: 'dynamic1',
              isLeaf:false
            },
            {
              label: `${targetOption.label} 服务器端加载2`,
              value: 'dynamic2',
            },
          ];
          this.options = [...this.options];
        }, 1000);
      },
    },
  };
</script>