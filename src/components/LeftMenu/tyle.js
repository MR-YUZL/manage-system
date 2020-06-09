const listMenu = [
  {
    key: "currentSession",
    title: "当前会话",
    icon:require('./../../assets/imgs/menu_icon/conversation.png'),
    icon_s:require('./../../assets/imgs/menu_icon/conversation_s.png'),
    resourceId: "current_session"
  },
  {
    key: "messageRecord",
    title: "留言记录",
    icon:require('./../../assets/imgs/menu_icon/record.png'),
    icon_s:require('./../../assets/imgs/menu_icon/record_s.png'),
    resourceId: "message_record"
  },
  {
    key: "teleCustomerService",
    title: "电话客服",
    icon:require('./../../assets/imgs/menu_icon/tel.png'),
    icon_s:require('./../../assets/imgs/menu_icon/tel_s.png'),
    resourceId: "telephone_customer_service",
    item: [
      {
        key: "teleCustomerService/workbench",
        title: "电话工作台",
        resourceId: "telephone_work_bench"
      },{
        key: "teleCustomerService/record",
        title: "通话记录",
        resourceId: "telephone_call_record"
      }
    ]
  },
  {
    key: "customerCenter",
    title: "客户中心",
    icon:require('./../../assets/imgs/menu_icon/customer.png'),
    icon_s:require('./../../assets/imgs/menu_icon/customer_s.png'),
    resourceId: "customer_center",
    item: [
      {
        key: "customerCenter/customerManage",
        title: "客户管理",
        resourceId: "customer_manager"
      },{
        key: "customerCenter/clue",
        title: "线索管理",
        resourceId: "clue_manager"
      },{
        key: "customerCenter/record",
        title:'跟进记录',
        resourceId: "visit_record"
      }
    ]
  },
  
  {
    key: "historicalDialogue",
    title: "历史对话",
    icon:require('./../../assets/imgs/menu_icon/history.png'),
    icon_s:require('./../../assets/imgs/menu_icon/history_s.png'),
    resourceId: "history_session"
  },
  {
    key: "qualityTesting",
    title: "质量检测",
    icon:require('./../../assets/imgs/menu_icon/quality.png'),
    icon_s:require('./../../assets/imgs/menu_icon/quality_s.png'),
    resourceId: "quality_test_parent",
    item: [
      {
        key: "qualityTesting/session",
        title: "会话质检",
        resourceId: "session_quality_test"
      },{
        key: "qualityTesting/conversation",
        title:'电话质检',
        resourceId: "telephone_quality_test"
      },
    ]
  },
  {
    key: "workOrder",
    title: "工单管理",
    icon:require('./../../assets/imgs/menu_icon/order.png'),
    icon_s:require('./../../assets/imgs/menu_icon/order_s.png'),
    resourceId: "work_order_manager"
  },
  {
    key: "dataAnalysis",
    title: "数据分析",
    icon:require('./../../assets/imgs/menu_icon/data.png'),
    icon_s:require('./../../assets/imgs/menu_icon/data_s.png'),
    resourceId: "data_analysis",
    item:[
      {
        key: "dataAnalysis/overview",
        title: "总览",
        resourceId: "data_analysis_pandect"
      },{
        key: "dataAnalysis/personal",
        title: "电话个人统计",
        resourceId: "data_analysis_telephone_person"
      },{
        key: "dataAnalysis/department",
        title:'电话部门统计',
        resourceId: "data_analysis_department"
      },
      {
        key: "dataAnalysis/seat",
        title: "坐席管控",
        resourceId: "data_analysis_table_control"
      },{
        key: "dataAnalysis/IVR",
        title: "IVR导航分析",
        resourceId: "data_analysis_ivr"
      },{
        key: "dataAnalysis/orderAnalysis",
        title:'工单工作分析',
        resourceId: "data_analysis_work"
      },
      {
        key: "dataAnalysis/orderClassification",
        title:'工单分类统计',
        resourceId: "data_analysis_classify"
      },
    ]
  },
  {
    key: "staffManagement",
    title: "员工管理",
    icon:require('./../../assets/imgs/menu_icon/staff.png'),
    icon_s:require('./../../assets/imgs/menu_icon/staff_s.png'),
    resourceId: "staff_management",
    item:[
      {
        key: "staffManagement/staff",
        title:'员工管理',
        resourceId: "staff_management_page"
      },{
        key: "staffManagement/skillGroup",
        title:'技能组',
        resourceId: "skill_groups"
      },{
        key: "staffManagement/role",
        title:'角色管理',
        resourceId: "role_management"
      }
    ]
  },
  {
    key: "knowledgeBase",
    title: "知识库",
    icon:require('./../../assets/imgs/menu_icon/knowledge.png'),
    icon_s:require('./../../assets/imgs/menu_icon/conversation_s.png'),
    resourceId: "knowledge_base"
  },
  {
    key: "setting",
    title: "设置",
    icon:require('./../../assets/imgs/menu_icon/setting.png'),
    icon_s:require('./../../assets/imgs/menu_icon/setting_s.png'),
    resourceId: "config",
    item: [
      {
        key: "setting/onlineChannel",
        title: "渠道设置",
        resourceId: "config_channel_access"
      },{
        key: "setting/sessionAssignment",
        title: "会话分配设置",
        resourceId: "config_session_allot"
      },{
        key: "setting/IVRSettings",
        title:'语音导航设置',
        resourceId: "config_ivr_voice"
      },
      {
        key: "setting/leavingMessage",
        title: "会话辅助设置",
        resourceId: "config_message"
      },{
        key: "setting/field",
        title: "字段设置",
        resourceId: "config_field"
      },{
        key: "setting/system",
        title:'系统属性设置',
        resourceId: "config_sys_optioin"
      },{
        key: "setting/commonWords",
        title:'公共常用语',
        resourceId: "config_common_useful"
      },
      {
        key: "setting/qualityTesting",
        title: "质检设置",
        resourceId: "config_quality_test"
      },{
        key: "setting/informationSafety",
        title: "信息安全设置",
        resourceId: "config_cust_security"
      },
    ]
  }
  
  
  
  
];
export { listMenu };
