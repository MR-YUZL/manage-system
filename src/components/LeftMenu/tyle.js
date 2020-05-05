const listMenu = [
  {
    key: "currentSession",
    title: "当前会话",
    icon:require('./../../assets/imgs/menu_icon/conversation.png'),
    icon_s:require('./../../assets/imgs/menu_icon/conversation_s.png'),
  },
  {
    key: "messageRecord",
    title: "留言记录",
    icon:require('./../../assets/imgs/menu_icon/record.png'),
    icon_s:require('./../../assets/imgs/menu_icon/record_s.png'),
  },
  {
    key: "teleCustomerService",
    title: "电话客服",
    icon:require('./../../assets/imgs/menu_icon/tel.png'),
    icon_s:require('./../../assets/imgs/menu_icon/tel_s.png'),
    item: [
      {
        key: "teleCustomerService/workbench",
        title: "电话工作台",
      },{
        key: "teleCustomerService/record",
        title: "通话记录",
      }
    ]
  },
  {
    key: "customerCenter",
    title: "客户中心",
    icon:require('./../../assets/imgs/menu_icon/customer.png'),
    icon_s:require('./../../assets/imgs/menu_icon/customer_s.png'),
    item: [
      {
        key: "customerCenter/customerManage",
        title: "客户管理",
      },{
        key: "customerCenter/clue",
        title: "线索管理",
      },{
        key: "customerCenter/record",
        title:'回访记录'
      }
    ]
  },
  
  {
    key: "historicalDialogue",
    title: "历史对话",
    icon:require('./../../assets/imgs/menu_icon/history.png'),
    icon_s:require('./../../assets/imgs/menu_icon/history_s.png'),
  },
  {
    key: "qualityTesting",
    title: "质量检测",
    icon:require('./../../assets/imgs/menu_icon/quality.png'),
    icon_s:require('./../../assets/imgs/menu_icon/quality_s.png'),
    item: [
      {
        key: "qualityTesting/session",
        title: "会话检测",
      },{
        key: "qualityTesting/conversation",
        title:'通话检测'
      },
    ]
  },
  {
    key: "workOrder",
    title: "工单管理",
    icon:require('./../../assets/imgs/menu_icon/order.png'),
    icon_s:require('./../../assets/imgs/menu_icon/order_s.png'),
  },
  {
    key: "dataAnalysis",
    title: "数据分析",
    icon:require('./../../assets/imgs/menu_icon/data.png'),
    icon_s:require('./../../assets/imgs/menu_icon/data_s.png'),
    item:[
      {
        key: "dataAnalysis/overview",
        title: "总览",
      },{
        key: "dataAnalysis/personal",
        title: "电话客服-个人统计",
      },{
        key: "dataAnalysis/department",
        title:'电话客服-部门统计'
      },
      {
        key: "dataAnalysis/seat",
        title: "坐席管控",
      },{
        key: "dataAnalysis/IVR",
        title: "ivr导航分析",
      },{
        key: "dataAnalysis/orderAnalysis",
        title:'工单工作分析'
      },
      {
        key: "dataAnalysis/orderClassification",
        title:'工单分类统计'
      },
    ]
  },
  {
    key: "staffManagement",
    title: "员工管理",
    icon:require('./../../assets/imgs/menu_icon/staff.png'),
    icon_s:require('./../../assets/imgs/menu_icon/staff_s.png'),
    item:[
      {
        key: "staffManagement/staff",
        title:'员工管理',
      },{
        key: "staffManagement/skillGroup",
        title:'技能组',
      },{
        key: "staffManagement/role",
        title:'角色管理'
      }
    ]
  },
  {
    key: "knowledgeBase",
    title: "知识库",
    icon:require('./../../assets/imgs/menu_icon/knowledge.png'),
    icon_s:require('./../../assets/imgs/menu_icon/conversation_s.png'),
  },
  {
    key: "setting",
    title: "设置",
    icon:require('./../../assets/imgs/menu_icon/setting.png'),
    icon_s:require('./../../assets/imgs/menu_icon/setting_s.png'),
    item: [
      {
        key: "setting/onlineChannel",
        title: "在线会话渠道设置",
      },{
        key: "setting/sessionAssignment",
        title: "会话分配设置",
      },{
        key: "setting/IVRSettings",
        title:'IVR语音导航设置'
      },
      {
        key: "setting/leavingMessage",
        title: "留言设置",
      },{
        key: "setting/field",
        title: "字段设置",
      },{
        key: "setting/system",
        title:'系统属性设置'
      },{
        key: "setting/commonWords",
        title:'公共常用语'
      },
      {
        key: "setting/qualityTesting",
        title: "质检设置",
      },{
        key: "setting/informationSafety",
        title: "客户信息安全设置",
      },
    ]
  }
  
  
  
  
];
export { listMenu };
