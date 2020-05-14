<template>
    <div class="">
        <a-page-header title="系统树形设置" />
        <div class="sysmSort">
          <a-tabs :activeKey="activeKey" @change="clickTabs">
            <a-tab-pane key="1" tab="咨询分类"></a-tab-pane>
            <a-tab-pane key="2" tab="工单分类"></a-tab-pane>
            <a-tab-pane key="3" tab="客户标签"></a-tab-pane>
            <a-tab-pane key="4" tab="访客标签"></a-tab-pane>
            <a-tab-pane key="5" tab="客户分组"></a-tab-pane>
          </a-tabs>
          <div>
            <AddSort v-if="activeKey==1||activeKey==2"/>
            <TagsEdit v-if="activeKey==3||activeKey==4||activeKey==5"/>
          </div>
        </div>

    </div>
</template>

<script>
import AddSort from "./AddSort"
import TagsEdit from './TagsEdit'
export default {
    name: "",
    components: {
      AddSort,
      TagsEdit
    },
    props:{},
    data() {
        return {
          activeKey:'1'
        }
    },
    created(){},
    mounted(){},
    methods: {
      clickTabs(key){
         this.activeKey = key;
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
