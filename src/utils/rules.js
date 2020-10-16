let validatorNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入报名数!"));
  } else {
    if (parseInt(value)>50) {
      callback(new Error("最大不能超过50!"));
    } else {
      callback();
    }
  }
}

export const rules = {
  post: [{
    required: true,
    message: "请输入对应岗位",
    trigger: "blur",
  }, ],
  level: [{
    required: true,
    message: "请输入职位级别",
    trigger: "blur",
  }, ],
  // recruit: [{
  //   required: true,
  //   message: "请输入招聘部门",
  //   trigger: "blur",
  // }, ],
  num: [{
    validator: validatorNum,
    trigger: "blur",
  }, ],
  education: [{
    required: true,
    message: "请输入最低学历要求",
    trigger: "blur",
  }, ],
}