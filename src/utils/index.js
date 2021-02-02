function flatten(arr = []) { //扁平化
  while (arr.some(r => Array.isArray(r))) {
    arr = [].concat.apply([], arr)
  }
  return arr;
}



function deepClone(obj, hash = new WeakMap()) { //深拷贝
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}


function throttle(fn, gapTime) { //节流
  let _lastTime = null;
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}

function compareUp(property) { //以某一个属性正序
  return function (a, b) {
    var value1 = parseFloat(a[property]);
    var value2 = parseFloat(b[property]);
    return value1 - value2;
  }
}

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hours = date.getHours();       // 获取当前小时数(0-23)
  var min = date.getMinutes();     // 获取当前分钟数(0-59)
  // var sec = date.getSeconds();     // 获取当前秒数(0-59)
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }

  var currentdate = year + seperator1 + month + seperator1 + strDate + seperator1 + hours + seperator2 + min;
  // var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

function compareDown(property) { //以某一个属性倒叙
  return function (a, b) {
    var value1 = parseFloat(a[property]);
    var value2 = parseFloat(b[property]);
    return value2 - value1;
  }
}

function toThousand(val) { //千位符
  let s = val.toString().split('.')[0]
  let d = 0
  if (val.split('.')[1]) {
    d = val.split('.')[1]
  }
  var reg = /\d{1,3}(?=(\d{3})+$)/g;
  s = (s + '').replace(reg, '$&,')
  let result = ''
  d ? result = s + '.' + d : result = s
  return result
}

function compose(...funcs) { //组合函数
  return function (x) {
    return funcs.reduce(function (arg, fn) {
      return fn(arg);
    }, x);
  };
}

function uniqueArr(arr) { //去重
  return Array.from(new Set(arr))
}
// function deepClone(source) {
//   if (!source && typeof source !== 'object') {
//     throw new Error('error arguments', 'deepClone')
//   }
//   const targetObj = source.constructor === Array ? [] : {}
//   Object.keys(source).forEach(keys => {
//     if (source[keys] && typeof source[keys] === 'object') {
//       targetObj[keys] = deepClone(source[keys])
//     } else {
//       targetObj[keys] = source[keys]
//     }
//   })
//   return targetObj
// }

function resetScreenSizeTwo() {  //单位像素响应
  var docEl = document.documentElement,

    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

    recalc = function () {

      var clientWidth = docEl.clientWidth;

      if (!clientWidth) return;

      docEl.style.fontSize = 100 * (clientWidth / 1440) + 'px';

    };

  if (!document.addEventListener) return;

  window.addEventListener(resizeEvt, recalc, false);

  document.addEventListener('DOMContentLoaded', recalc, false);

}

function resetScreenSize() { //页面自适应
  function init() {
    var _el = document.getElementById('app');
    var hScale = window.innerHeight / 757;
    var wScale = window.innerWidth / 1440;
    // console.log(window.innerHeight, window.innerWidth)
    _el.style.transform = 'scaleX(' + wScale + ') scaleY(' + hScale + ')'
    _el.style.marginLeft = -((1440 - window.innerWidth) / 2) + 'px'
    _el.style.marginTop = -((757 - window.innerHeight) / 2) + 'px'
    //   console.log(window.innerHeight, window.innerWidth)
  }

  var lazyFun;

  window.onresize = () => {
    clearTimeout(lazyFun);
    lazyFun = setTimeout(() => {
      init()
    }, 600)
  }
  init()
}

let utils = {
  flatten,
  deepClone,
  throttle,
  compareUp,
  compareDown,
  toThousand,
  uniqueArr,
  compose,
  resetScreenSize,
  resetScreenSizeTwo,
  getNowFormatDate
}

export default utils;