<template>
  <div>
    <SecondMenu :routes="goods" />
  </div>
</template>

<script>
import { goods } from "./../../../routes/pageroutes";
import { SecondMenu } from "./../../../components";
export default {
  data: () => ({
    goods
  }),
  components: {
    SecondMenu
  },
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

