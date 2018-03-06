/*
* 存储到本地 localstorage
* 存储格式：{id:{key:value},id:{key:value}} // {123:{favorite:true}}
* */
// localstorage存储一些商家信息 __seller__,id:商家的id,key：需要存储的属性，value:需要存储的属性的属性值
export function saveToLocal(id,key,value) {
  let seller = window.localStorage.__seller__;
  if(!seller) {// 如果还未存储过，新建商家信息
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if(!seller[id]) {// 如果id不存在，新建
      seller[id] = {};
    };
  }
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller);
};

// 获取 localstorage存储的信息 id:商家id,key:需要从localstorage中获取的属性，defaul:如果获取不到返回的默认值
export function loadFromLocal(id,key,defaul) {
  let seller = window.localStorage.__seller__;
  if(!seller) {//不存在时　返回默认值
    return defaul;
  };
  seller = JSON.parse(seller);
  if(!seller[id]) {
    return defaul;
  };
  let val = seller[id][key];
  return val || defaul;
}
