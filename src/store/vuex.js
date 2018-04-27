/**
 * Created by 呵呵哒 on 2018/4/25.
 */

/*Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

应用层级的状态应该集中到单个 store 对象中。

提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。

异步逻辑都应该封装到 action 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。*/

const debug = process.env.NODE_ENV !== 'production';//非发布环境

import Vue from 'vue'
import Vuex from 'vuex'
import One from './module_one'
import Two from './module_two'
Vue.use(Vuex)
const store = new Vuex.Store({
  //Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
  modules: {
    one:One,
    two:Two
  },
  //strict: true 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  //不要在发布环境下启用严格模式！
  //strict: process.env.NODE_ENV !== 'production'
  strict: true,//表单：当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会报错,
  //有时我们可能需要创建一个模块的多个实例,创建多个 store，他们公用同一个模块,,
  //如果我们使用一个纯对象state:{}来声明模块的状态，那么这个状态对象会通过引用被共享,导致模块间的数据被同时修改，这和 Vue 组件内的 data 是同样的问题，解决办法：使用函数来声明模块状态state() {return { }}
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
    },
    ids(state) {
      console.log('我是父模块的mutations 的ids')
    }
  },
  actions: {//Action 类似于 mutation,不同：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
    upState(content,data) {//第一个参数：与 store 实例具有相同方法和属性的 context 对象。。Action 通过 store.dispatch('方法名') 方法触发：
      //content.state.user = data;
      console.log('actions中第一个参数的值：',content,content.state.user);
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
      return '李四'
    },
    //可以通过让 getter 返回一个函数，来实现给 getter 传参
    getTodoById:(state,getter) => (data) => {
      return {'age':data}
    }
    //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，与mapMutations和mapActions差不多
  }
})
export default store
