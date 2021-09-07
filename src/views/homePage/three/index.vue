<template>
  <div>
    <h1 class="" v-label id="msg" ref="msg">
      {{ msg }}
    </h1>

    <div id="qrcode"></div>

    <a-popover>
      <a-button type="primary">
        Hover me
      </a-button>
    </a-popover>

    <h3 v-for="(value, key) in obj" :key="key">{{ key + "---" + value }}</h3>
    <h3 v-for="(value, index) in arr" :key="index">{{ value }}</h3>

    <a-button @click="(e) => handleClick(e)">测试</a-button>

    <a-table :columns="columns" :data-source="data" bordered>
      <template slot="name" slot-scope="text">
        <a>{{ text }}</a>
      </template>
    </a-table>
    <a-radio-group v-model="buttonVal">
      <a-radio-button value="a"> Hangzhou </a-radio-button>
      <a-radio-button value="b"> Shanghai </a-radio-button>
      <a-radio-button value="c"> Beijing </a-radio-button>
      <a-radio-button value="d"> Chengdu </a-radio-button>
    </a-radio-group>
    <router-view @test="handleClick"></router-view>
  </div>
</template>

<script>
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {},
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jake White",
    // age: 18,
    // tel: "0575-22098909",
    // phone: 18900010002,
    // address: "Dublin No. 2 Lake Park",
  },
];
import QRCode from "exports-loader?QRCode!qrcodejs/qrcode";
import { GetUserInfo } from "@/api/login";
export default {
  name: "three",
  components: {},
  props: {},
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5,
            },
          };
        },
      },
      {
        title: "Age",
        dataIndex: "age",
        customRender: renderContent,
      },
      {
        title: "Home phone",
        colSpan: 2,
        dataIndex: "tel",
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {},
          };
          if (index === 2) {
            obj.attrs.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.attrs.rowSpan = 0;
          }
          if (index === 4) {
            obj.attrs.colSpan = 0;
          }
          return obj;
        },
      },
      {
        title: "Phone",
        colSpan: 0,
        dataIndex: "phone",
        customRender: renderContent,
      },
      {
        title: "Address",
        dataIndex: "address",
        customRender: renderContent,
      },
    ];
    return {
      msg: "Hello World!",
      data,
      columns,
      buttonVal: "",
      obj: {
        a: 1,
        b: 2,
      },
      arr: [{ a: 1, b: { text: "嘿嘿嘿" } }],
    };
  },
  watch: {
    obj: {
      handler: function(val, olVal) {
        console.log("val", val, olVal);
      },
    },
    "obj.a": {
      handler: function(val, olVal) {
        console.log("valaaaaaaa", val, olVal);
      },
    },
    arr: {
      handler: function(val, olVal) {
        console.log("val------", val, olVal);
      },
      deep: true,
    },
    arrClone: {
      handler: function(val, olVal) {
        console.log("arrClone", val, olVal);
      },
    },
    userInfo: {
      handler: function(val, olVal) {
        console.log("userInfo", val, olVal);
      },
    },
  },
  computed: {
    arrClone() {
      return JSON.parse(JSON.stringify(this.obj));
    },
  },
  created() {},
  mounted() {
    this.msg = "11111";
    this.$nextTick(() => {
      console.log("vm.$el.msg", this.$refs.msg);
    });
    this.msg = "aaaaa";
    const qrcode = new QRCode(
      document.getElementById("qrcode"),
      "http://jindo.dev.naver.com/collie"
    );

    let arr = [
      { name: "book", number: 10 },
      { name: "paper", number: 10 },
      { name: "ruber", number: 10 },
      { name: "book", number: 20 },
      { name: "paper", number: 40 },
      { name: "ruber", number: 50 },
      { name: "book", number: 70 },
      { name: "paper", number: 80 },
      { name: "ruber", number: 90 },
    ];

    let newArr = arr.reduce((ret, { name, number }) => {
      (ret[name] = ret[name] || { name, value: [] }).value.push(number);
      return ret;
    }, {});

    let newArr7 = arr.reduce((ret, { name, number }) => {
      // ret[name] = ret[name] ? [...ret[name], number] : [number];
      (ret[name] = ret[name] || []).push(number);
      return ret;
    }, {});

    console.log("newArr7", newArr7);
    let pro = new Promise((resolve) => {
      resolve();
    });

    let pro1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    let arr1 = [];

    // arr.forEach(async (v, index) => {
    //   if (v.name === "book") {
    //     let res = await pro1;
    //     v.test = res;
    //   } else {
    //     let res = await pro;
    //   }
    //   console.log("v", v, index);
    //   arr1.push(v);
    // });

    new Promise((resolve) => {
      resolve();
    }).then(() => {
      // console.log("newArr", arr1);
    });

    let newArr1 = Array(100).fill(1);
    let newArr2 = Array(100).keys();
    let newArr3 = Array.from({ length: 100 }, (v, k) => k);
    let newArr4 = Object.keys(Array.from({ length: 100 })).map(function(item) {
      return item;
    });
    // console.log("newArr1", [...newArr1]);
    // console.log("newArr2", [...newArr2]);
    // console.log("newArr3", newArr3.copyWithin(2, 0));
    // console.log("newArr4", [...arr.keys()]);
    // console.log("newArr5", [1, [2, [3]]].flat(Infinity));
    // console.log(
    //   "newArr6",
    //   Array.from(arr, (v, k) => v.name)
    // );
    // console.log(
    //   "newArr7",
    //   Array(3).map(() => 1)
    // );

    let obj = {
      0: "a",
      1: "b",
      3: "c",
      length: 4,
    };
    console.log(
      "objArr",
      Array.from(obj, (v) => v + 1)
    );

    let arrr = [true, false, true, false];
    for (const iterator of arr.values()) {
      // console.log("iterator", iterator);
    }

    const arrq = ["a", "b", "c"];
    const tempIterator = arrq.entries();
    // console.log("tempIterator", tempIterator.next().value);

    arrq.sort(function(a, b) {
      return 1;
    });
    console.log("arrq", arrq);
  },
  updated() {
    console.log("parent", this);
  },
  methods: {
    handleClick(e) {
      console.log("e", e);
      const msg = "aaa";
      const buttonVal = "a";
      // Object.assign(this, {
      //   msg,
      //   buttonVal,
      // });
      // this.obj.c = 1;
      // this.obj.b = 1;
      // this.$set(this.obj, "c", 1);
      // this.$set(this.obj, "a", 17687);
      this.arr.push("adashd");
      this.$set(this.arr[0].b, "text", "123");
      // this.obj.a = 123;
      let obj = Object.assign({}, this.obj, { a: 123 });
      // let obj = Object.assign({},JSON.parse(JSON.stringify(this.obj)),{a:11111111})

      this.obj = obj;
      console.log("this", this);
    },
  },
};
</script>

<style lang="scss" scoped></style>
