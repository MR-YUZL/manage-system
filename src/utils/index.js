/**
 *
 * @param {*} path 必填 string 原始路由参数
 * @param {*} rank 非必填 默认 1 最大为3 number 需要返回的是几级路由
 * @return string
 */
export const routeMatching = (path, rank = 1) => {
  if (!path) throw "path不应该为undefined";
  if (rank > 3) throw `暂不支持截取${rank}级路由`;
 
  const routerArr = path.split("/");
  // let router;
  
  // router =
  //   rank === 1
  //     ? "/" + routerArr[1]
  //     : rank === 2
  //     ? "/" + routerArr[1] + "/" + routerArr[2]
  //     : "/" + routerArr[1] + "/" + routerArr[2] + "/" + routerArr[3];
 
  let router = []
  routerArr[routerArr.length - 2] ? router.push(routerArr[routerArr.length - 2]):router
  router = [...router,routerArr[routerArr.length - 1]]
 
 
  return router
};
export function throttle(func, wait) {
  let timeout
  return function () {
    let that = this
    let args = arguments

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(that, args)
      }, wait)
    }
  }
}

/**
 * 利用 document.title 做新消息提示
 * @export
 * @param {Number} count
 */
export function titleNotify(count) {
  const hasNewMessage = count > 0
  if (hasNewMessage) {
    if (document.title.search(/\((.*?)\)/) >= 0) {
      document.title = document.title.replace(/\((.*?)\)/, `(${count > 99 ? '99+' : count})`)
    } else {
      document.title = `(${count})${document.title}`
    }
  } else {
    document.title = document.title.replace(/\((.*?)\)/, '')
  }
}


//剔除历史消息中无用消息
export function deleteHistory(list, account) {
  console.log(account);
  list.map((item, index) => {
    console.log(item.toAccount, item.subMsgType);
    if (
      (item.toAccount != account &&
        item.imMsgType == "TIMCustomElem" &&
        item.subMsgType == "queuinglocation") ||
      item.subMsgType == "inviteevaluate" ||
      item.subMsgType == "transfer" ||
      item.subMsgType == "reception" ||
      item.subMsgType == "stopsession" ||
      item.subMsgType == "createsession"
    ) {
      list.splice(index, 1, "");
    }
    if (
      item.toAccount != account &&
      item.imMsgType == "TIMCustomElem" &&
      item.subMsgType == "prompts"
    ) {
      list.splice(index, 1, "");
    }
  });
  let arr = [];
  list.forEach(item => {
    if (item) arr.push(item);
  });
  // console.log(list, arr, arr.length);
  return arr;
}
// export function deleteHistory(list, account) { 
//   console.log(account)
//   list.map((item, index) => {
//     console.log(item.toAccount, item.subMsgType);
//     if (
//       (item.toAccount != account &&
//         item.imMsgType == "TIMCustomElem" &&
//         item.subMsgType == "queuinglocation") ||
//       item.subMsgType == "inviteevaluate" ||
//       item.subMsgType == "transfer" ||
//       item.subMsgType == "reception" ||
//       item.subMsgType == "stopsession" ||
//       item.subMsgType == "createsession"
//     ) {
//       list.splice(index,1,'')
//     }
//     if (
//       item.toAccount != account &&
//       item.imMsgType == "TIMCustomElem" &&
//       item.subMsgType == "prompts"
//     ) {
//       list.splice(index, 1, "");
//     }
//   });
//   let arr = []
//   list.forEach(item => {
//     if (item) arr.push(item);
//   });
//   // console.log(list, arr, arr.length);
//   return arr
// }

//数组去空
export function arrEmpty(list) {
  let arr = []
  list.map(item => {
    if(item) arr.push(item)
  })
  return arr
}
