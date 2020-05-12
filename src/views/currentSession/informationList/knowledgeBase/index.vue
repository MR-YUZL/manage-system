
<template>
    <div class='knowledgeBase'>
         <a-input-search placeholder="请输入关键词" style="width: 250px" @search="onSearch" />
    </div>
</template>

<script>

export default {
name:'knowledgeBase',
components: {},
data() {
    return {

    };
},
computed: {},
watch: {},
//方法集合
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='less' scoped>
    .knowledgeBase{
        .ant-tabs-content{
            text-align: center;
        }
    }
</style>