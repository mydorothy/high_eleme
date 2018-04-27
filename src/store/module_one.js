/**
 * Created by 呵呵哒 on 2018/4/26.
 */

//vuex 的分模块开发
//对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
const one = {
  state: {
    id:12
  },
  mutations: {
    ids(state) {
      console.log('模块one的state值：',state);
    }
  },
  actions: {
    test(content,data) {//局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
      console.log('模块one的actions:',content,data);
    }
  },
  getters: {

  }
}
export default one;
