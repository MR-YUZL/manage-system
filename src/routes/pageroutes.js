// 该页面为所有二级路由嵌套，所有路由嵌套请按照此对象来写
// 概况
const survey = {
  name: "概览"
};
// 商品
const goods = {
  name: "商品管理",
  item: [
    // {
    //   name: "商品中心",
    //   item: [
    //     {
    //       name: "商品管理",
    //       key: "goods/control"
    //     },
    //     {
    //       name: "商品分组",
    //       key: "goods/groups"
    //     },
    //     {
    //       name: "商品标签",
    //       key: "goods/tags"
    //     }
    //   ]
    // }
   
      {
        name:'当前会话',
        key:'goods/control'
      },
      {
        name:'电话客服',
        key:'goods/groups'
      }
  ]
};
// 订单
const order = {
  name: "订单管理",
  item: [
    {
      name: "订单查询",
      item: [
        {
          name: "全部订单",
          key: "order/all"
        }
      ]
    },
    {
      name: "订单测试",
      key: "order/ceshi"
    },
    {
      name: "订单处理",
      item: [
        {
          name: "退款管理",
          key: "order/refund"
        },
        {
          name: "核销管理",
          key: "order/check"
        }
      ]
    }
  ]
};
// 客户
const custom = {
  name: "客户管理",
  item: [
    {
      name: "客户管理",
      item: [
        {
          name: "客户查询",
          key: "custom/query"
        },
        {
          name: "客户标签",
          key: "custom/tags"
        }
      ]
    }
  ]
};
// 促销
const market = {
  name: "营销中心",
  item: [
    {
      name: "营销玩法",
      item: [
        {
          name: "店铺促销",
          key: "market/shop"
        },
        {
          name: "优惠券",
          key: "market/coupon"
        }
      ]
    },
    {
      name: "营销管理",
      item: [
        {
          name: "营销审核",
          key: "market/exam"
        }
      ]
    }
  ]
};
// 资产
const asset = {
  name: "资产中心",
  item: [
    {
      name: "我的账户",
      item: [
        {
          name: "账户概况",
          key: "asset/survey"
        },
        {
          name: "店铺余额",
          key: "asset/balance"
        }
      ]
    },
    {
      name: "资金对账",
      item: [
        {
          name: "账单明细",
          key: "asset/reco"
        }
      ]
    }
  ]
};
// 设置
const setting = {
  name: "设置中心",
  item: [
    {
      name: "店铺信息",
      item: [
        {
          name: "店铺信息",
          key: "setting/message"
        },
        {
          name: "通用设置",
          key: "setting/currency"
        }
      ]
    },
    {
      name: "店铺设置",
      item: [
        {
          name: "核销员",
          key: "setting/clerk"
        },
        {
          name: "商家地址",
          key: "setting/address"
        },
        {
          name: "成员管理",
          key: "setting/member"
        },
        {
          name: "角色管理",
          key: "setting/role"
        }
      ]
    }
  ]
};
export { survey, goods, order, custom, market, asset, setting };
