<template functional>
  <a-sub-menu :key="props.subMenu.path">
    <span slot="title"
      ><a-icon type="appstore" /><span>{{
        props.subMenu.meta.title
      }}</span></span
    >
    <template v-for="v in props.subMenu.children">
      <SubMenu
        :key="v.path"
        :subMenu="v"
        v-if="v.children && !v.isChildMenu"
      ></SubMenu>
      <a-menu-item :key="v.path" v-else>
        <a-icon type="desktop" />
        <span>{{ v.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: "SubMenu",
};
</script>

<style lang="less" scoped></style>