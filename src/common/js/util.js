/*
* 解析url参数
* @example ?id=123&a=1
* @return {id:123,a:1}
* */

export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg); // match结果为：["?id=123","&a=1"]
  if(arr) {//说明url中有参数
    arr.forEach((item) => {
      let itemArr = item.substring(1).split('=');
      let key = itemArr[0];
      let val = itemArr[1];
      obj[key] = val;
    })
  };
  console.log('url参数对象',obj);
  return obj;
}
