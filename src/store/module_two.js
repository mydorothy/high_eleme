/**
 * Created by 呵呵哒 on 2018/4/26.
 */

import Three from './module_three'
//模块动态注册
const two = {
  namespaced: true,
  modules:{//模块中还可以再嵌套模块
    three:Three
  },
  state: {
    twoState: 40
  },
  mutations: {
    test() {
      console.log('我是two模块的mutations')
    }
  },
  actions: {
    upState(content,data) {
      console.log('我是two模块的upState',data);
    }
  }
}

export default two
