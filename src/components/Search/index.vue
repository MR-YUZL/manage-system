<template>
  <div class="tool-bar">
      <div class="item" v-for="(item, index) in tools" :key="index">
        <div v-if="!!item.title && item.type !== 'search'" style="margin-right:10px">
            {{item.title}}
        </div>
        <div v-if="item.type === 'input'">
            <a-input
                style="width: 170px"
                :placeholder="item.placeholder"
                @pressEnter="onSearch"
                @change="eonChange($event,item)"
                :value="valueObj[item.key]"
                :allowClear="!!item.allowClear"
            />
        </div>
        <div v-else-if="item.type === 'select'">
            <a-select
                style="width: 170px"
                @change="onChange($event,item)"
                :value="valueObj[item.key]"
                :allowClear="!!item.allowClear"
                :mode="item.mode || 'default'"
            >
                <a-select-option
                    v-for="(it, ind) in item.options"
                    :key="ind"
                    :value="it.value"
                >
                    {{it.name}}
                </a-select-option>
            </a-select>
        </div>
        <div v-else-if="item.type === 'dateRange'">
            <a-range-picker
                :value="valueObj[item.key]"
                @change="onChange($event,item)"
                :ranges="item.ranges"
                style="width: 240px"
            />
        </div>
        <div v-else-if="item.type === 'inputRange'">
            <a-input-group compact style="width: 170px">
                <a-input :value="valueObj[item.key[0]]" @change="eonChange($event,{...item,key: item.key[0]})" style=" width: 70px; text-align: center"/>
                <a-input style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff" placeholder="~" disabled />
                <a-input :value="valueObj[item.key[1]]" @change="eonChange($event,{...item,key: item.key[1]})" style="width: 70px; text-align: center; border-left: 0" placeholder=""/>
            </a-input-group>
        </div>
        <div v-else-if="item.type === 'search'">
            <a-button @click="onSearch" :type="item.btnType || 'default'">筛选</a-button>
        </div>

      </div>
      
  </div>
</template>

<script>
export default {
  props: {
    tools:{
      type: Array,
      required: false,
      default: []
    // tools 传参示例
    //   [
    //       {
    //         type: 'input',
    //         title: '活动名称:',
    //         placeholder: '请输入标签',
    //         key: 'searchText',
    //         defaultValue: null,
    //     },
    //     {
    //         type: 'select',
    //         title: '活动类型:',
    //         key: 'type',
    //         defaultValue: 'null',
    //         options: [
    //           {value: 'null', name: '全部'},
    //           {value: '1', name: '店铺满减'},
    //         ]
    //     },
    //     {
    //         type: 'search',
    //         title: '筛选',
    //         btnType: 'default'
    //     }
    //   ]
    },
  },
  data() {
    return {
        valueObj: {},
    };
  },
  created() {
    this.tools.forEach((item) => {
        if(item.key != null) {
            if(item.type === 'inputRange') {
                this.$set(this.valueObj, item.key[0], item.defaultValue[0] || null)
                this.$set(this.valueObj, item.key[1], item.defaultValue[1] || null)
            } else {
                this.$set(this.valueObj, item.key, item.defaultValue || null) // 需要用$set方法去设置data中valueObj的属性值，不然无法实现双向绑定
            }
        }
    })
    // console.log(this.tools, this.valueObj)
  },
  methods: {
      eonChange(e,targetItem) {
            this.valueObj[targetItem.key] = e.target.value;
            // console.log(this.valueObj,targetItem,e.target.value);
            this.$emit('onChange',targetItem.key, e.target.value, this.valueObj); // 返回当前改变的字段名，改变的内容，改变后valueObj的内容
      },
      onChange(value,targetItem) {
            this.valueObj[targetItem.key] = value;
            // console.log(this.valueObj,targetItem,value);
            this.$emit('onChange',targetItem.key, value, this.valueObj); // 返回当前改变的字段名，改变的内容，改变后valueObj的内容
      },
      onSearch() {
          console.log(this.valueObj)
          let data = this.valueObj
          let obj = {}
          for(let key in data){
            if(data[key]!==null&&data[key]!='null'){
              obj[key] = data[key]
            }
          }
          this.$emit('onSearch',obj);
      }
  },
  watch: {
    tools: {
        handler(ee) {
            console.log(ee)
            this.tools.forEach((item) => {
                if(item.key != null) {
                    // this.valueObj[item.key] = item.defaultValue || null;
                this.$set(this.valueObj, item.key, item.defaultValue || null) // 需要用$set方法去设置data中valueObj的属性值，不然无法实现双向绑定
                }
            })
            // console.log(this.tools, this.valueObj)
        },
        deep: true
    },
  }
};
</script>

<style lang="less">
.tool-bar{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .item{
        margin: 10px 10px 0 0;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
}
</style>
