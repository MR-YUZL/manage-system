// 手机号验证
export function checkPhone(rule, value, callback) {
  let reg = /^1[3456789]\d{9}$/;
  if (value && (!reg.test(value) || value.length != 11)) {
    callback("手机号码格式错误");
  }
  callback();
}

// 邮箱验证
export function checkMail(rule, value, callback) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (value && !reg.test(value)) {
    callback("邮箱格式错误");
  }
  callback();
}
//QQ验证
export function checkQQ(rule, value, callback) {
  let reg = /^[1-9][0-9]{4,9}$/gim;
  if (value && !reg.test(value)) {
    callback("QQ格式错误");
  }
  callback();
}
// 密码格式验证
export function checkPassword(rule, value, callback) {
  let reg = /(?!^[0-9]+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,14}$/;
  if (value && !reg.test(value)) {
    callback("格式错误");
  }
  callback();
}

// 企业名称验证
//   export function checkCompanyName(rule, value, callback) {
//     let reg = /^[\u4e00-\u9fa5\(\)（）\da-zA-Z&]{2,50}$/;
//     if (value && !reg.test(value)) {
//       callback("格式错误")
//     }
//     callback();
//   }

// 注册帐号验证
export function checkAccount(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{6,32}$/;
  if (value && !reg.test(value)) {
    callback("格式错误");
  }
  callback();
}

// 身份证验证
export function checkCardId(rule, value, callback) {
  let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (value && !reg.test(value)) {
    callback("格式错误");
  }
  callback();
}

// 验证地址
export function checkAddress(rule, value, callback) {
  if (value && value.length != 3) {
    callback("请选择");
  }
  callback();
}

let validateFuns = {
  checkPhone,
  // checkMail,
  checkPassword,
  // checkCompanyName,
  checkAccount,
  checkCardId,
  checkAddress,
  checkMail,
  checkQQ
};

export default validateFuns;
