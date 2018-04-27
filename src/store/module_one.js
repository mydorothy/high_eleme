/**
 * Created by 呵呵哒 on 2018/4/26.
 */

//vuex 的分模块开发
//对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
//调用：state调用：this.$store.state.one.id ，， mutations调用：this.$store.commit('ids')
const one = {
  //如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块,设置以后调用mutations、actions、getters时就不能直接调用this.$store.commit('ids'),需要这样写：this.$store.commit('one/ids');one注册模块时起的名字
  namespaced: true,
  state: {
    id:12
  },
  mutations: {
    ids(state,data) {//加了namespaced属性后：commit('one/ids')，不加就是commit('ids')
      console.log('1模块one的state值：',state,data);
      return state;
    },
    test() {
      console.log('测试模块one的mutations的test');
    }
  },
  actions: {//加了namespaced属性后：dispatch('one/conten')，不加就是commit('ids')
     conten(content,data) {//局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
      console.log('模块one的actions:',content,data);
    },
    root({commit,dispatch,state,rootState},data) {
      //在带命名空间的模块内访问全局内容,将 { root: true } 作为第三参数传给 dispatch 或 commit 即可,不传则代表当前模块
      //第一个参数是其他模块的actions路径, 第二个是传给 actions 的数据, 必须预留, 第三个参数是配置选项, 声明这个 acitons 不是当前模块的
      dispatch('upState',null,{root:true});
      dispatch('upState');//当前模块
      dispatch('two/upState',data,{root:true});//one模块调用two模块的actions
      console.log('根节点的state',rootState);//从rootState可以取到父节点和其他节点的state
      commit('two/test',null,{root:true});//one模块调用two模块的mutations
    },
    upState(content) {
      console.log('我是one模块的actions/upState');
    },
    //在带命名空间的模块注册全局 action,调用时：store.dispatch('rootAction')
    rootAction: {
      root: true,
      handler(namespacedContext, payload){
        console.log('one模块注册全局action',namespacedContext,payload);
      }
    }
  },
  getters: {

  }
}
export default one;
