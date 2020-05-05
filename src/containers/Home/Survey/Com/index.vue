<template>
  <div>
    <div>{{ num }}</div>
    <div class="p-t-30">
      <a-button type="dashed" @click="handleChange1">Dashed</a-button>
    </div>
    <div class="p-t-30">
      <a-button type="danger" @click="handleChange2">Danger</a-button>
    </div>
     <debounce time="3000" :before="beforeFun">
      <a-input placeholder="Basic usage" size="small" v-model="inpModel" @input="inputChange" />
    </debounce>
    
    <!-- <debounce time="5000">
      <a-button type="primary" @click="Abutton">a-button</a-button>
    </debounce> -->
  </div>
</template>

<script>
import debounce from './../../../../utils/debounce'
export default {
  data: () => ({
    inpModel: 1,
  }),
  components: {
    debounce
  },
  mounted() {},
  methods: {
    handleChange1() {
      this.$store.commit("add",9);
    },
    handleChange2() {
      this.$store.commit("min",1);
    },
    inputChange(e){
      console.log(e.target.value, '防抖')
    },
    
    beforeFun(e){
      console.log(e.target.value, '不防抖')
    },
    
    Abutton(e){
      console.log(e.target.value, '防抖Button')
    },
  },
  watch: {},
  computed: {
    num() {
      return this.$store.state.count;
    }
  }
};
</script>
