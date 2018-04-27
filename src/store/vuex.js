/**
 * Created by 呵呵哒 on 2018/4/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import One from './module_one'
Vue.use(Vuex)
const store = new Vuex.Store({
  //Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
  modules: {
    a:One
  },
  state: {
    user:'12',
    id:'44',
    status:true,
    gets:{name:'张三'}
  },
  mutations: {//更改 Vuex 的 store 中的状态,Mutation 必须是同步函数,通过 store.commit('方法名')触发
    upState(state,data) {// 接收 state 作为第一个参数,第二个参数为调用时传递过来的参数
      state.user = data;
      console.log('调用时传递过来的参数：',state.user)
    },
    upId(state,data) {
      state.id = data;
      console.log('data的值：',data,'更新id',state.id);
    },
    upStatus(state,data) {
      state.status = data;
      console.log('更新statue',state.status);
    }
  },
  actions: {//Action 类似于 mutation,不同：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
    upState(content) {//第一个参数：与 store 实例具有相同方法和属性的 context 对象。。Action 通过 store.dispatch('方法名') 方法触发：
      console.log('actions中第一个参数的值：',content);
    },
    ids({commit},data) {
      console.log('利用解构赋值,只取需要用到的commit');
      commit('upId',data);
      //支持异步操作
      setTimeout(() => {
        console.log('actions,我是异步操作')
      },1000)
    }
  },
  //类似计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  //Getter 会暴露为 store.getters 对象，可以以属性的形式访问这些值：this.$store.getters.tests
  getters: {
    tests(state,getter) {
      console.log('getter接收的参数：',state,getter);
      return {'name':'李四'}
    },
    //可以通过让 getter 返回一个函数，来实现给 getter 传参
    getTodoById:(state,getter) => (data) => {
      return {'age':data}
    }
    //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，与mapMutations和mapActions差不多
  }
})
export default store
