<template>
    <div class="flex-container">
        <a-page-header class="flex-page-header" title="渠道设置" />
        <div class="flex-content">
            <iframe width="100%" height="100%" src="../channelSettings/index.html" frameborder="0"></iframe>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props:{},
    data() {
        return {}
    },
    created(){},
    mounted(){},
    methods: {}
}
</script>

<style lang="less" scoped>
.flex-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .flex-page-header {
        flex-shrink: unset;
    }

    .flex-content {
        flex: 1;
    }
}
</style>
