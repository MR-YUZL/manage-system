<template>
  <div class="qf-home clearfix">
    <div class="l-left">
      <LeftMenu />
    </div>
    <div class="list-right">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { LeftMenu } from "./../../components";
import './index.less'
export default {
  name: "home",
  components: {
    LeftMenu
  },
  data: () => ({}),
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>
