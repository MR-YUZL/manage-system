function flatten(arr = []) {     //扁平化
  while (arr.some(r => Array.isArray(r))) {
    arr = [].concat.apply([], arr)
  }
  return arr;
}

let utils = {
  flatten
}

export default utils;