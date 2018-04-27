<template>
    <div class="vuex">
      <div>hello</div>
      <input type="text" v-model="tests">
      <button @click="test">点击取值</button>
    </div>
</template>

<script type="text/ecmascript-6">

  import {mapMutations} from 'vuex'//在组件中提交 Mutation
  import {mapActions} from 'vuex'//在组件中分发 Action (methods映射为store.dispatch调用)
  import {mapGetters} from 'vuex'//mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
  import {createNamespacedHelpers} from 'vuex'//创建基于某个命名空间辅助函数,它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
  const {mapState:sta,mapActions:act} = createNamespacedHelpers('one/')//...mapActions(...act)会 在 `one/` 中查找


  import Two from '../store/module_two'// 模块的动态注册
  export default {
    name:"vuex",
    data() {
      return {

      }
    },
    computed:{
      ...mapGetters([// 使用对象展开运算符将 getter 混入 computed 对象中
        'tests',
        'getTodoById'
      ]),
      ...mapGetters({//如果想将一个 getter 属性另取一个名字，使用对象形式：
        getTest:'tests'
      }),
      tests: {////表单：当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 v-model 会报错,解决方法：使用带有 setter 的双向绑定计算属性
        get() {
          return this.$store.state.user;
        },
        set() {
          console.log()
          return this.upState(this.tests);
        }
      }
    },
    methods: {
      //在组件中提交 Mutation
      //你可以在组件中使用 this.$store.commit('xxx') 调用 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
      ...mapMutations([// upState会自动写入 this下，使用this可直接调用，不需要再次声明
        'upState'// 将 `this.upState()` 映射为 `this.$store.commit('upState')`,
      ]),
      ...mapMutations({
        getId: 'upId', // 将 `this.getId()` 映射为 `this.$store.commit('getId')`
        getStatus: function(state) {
          console.log('state：',state);
          if(true) {
            this.$store.commit('upStatus',false);
          }
        }
      }),
      test() {//调用 mapMutations映射好的
        this.upState({'name':'linger'})
        this.getId({'name':'linger'})
        this.getStatus();
        console.log('修改以后的值：',this.$store.state.status);

        //调用actions ,载荷方式和对象方式调用都可以
        this.$store.dispatch('upState',{user:'dorothy'});
        this.$store.dispatch({
          type:'ids',
          newid:'80'
        });
      },
      //在组件中使用 this.$store.dispatch('xxx') 分发(调用) action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
      ...mapActions([
        'ids'
      ]),
      ...mapActions({
        'getid':'ids'
      }),
      action() {//调用mapActions 映射好的
        this.ids({age:'90'});
        this.getid({sex:'女'})
      },
      //带命名空间的绑定函数,one模块下的mutations,,将模块的空间名称字符串作为第一个参数传递给mapMutations函数
      ...mapMutations('one/',{
        oneTest:'test'
      }),
      module() {
        this.oneTest();
      }
    },
    mounted() {
      console.log('vuex:',this.$store,this.$store.state.user);
      //this.$store.commit('upState',{name:'linger'}); // 调用vuex方法实现更改vuex的state参数值
      console.log('vuex:',this.$store.state.user);


      this.action();
      this.module();

      console.log('getter调用：',this.$store.getters.tests);
      console.log('通过方法实现传参：',this.$store.getters.getTodoById(1));
      console.log('映射到计算属性，直接调用：',this.tests,this.getTest);
      console.log('vuex调用a模块state：',this.$store.state.one.id);
      //vuex调用a模块mutations(设置了namespaced命名空间属性)：commit('one/ids')
      this.$store.commit('one/ids',{'name':'sunshine'});
      //调用a模块的actions
      this.$store.dispatch('one/root',{'name':'测试'});
      //onw模块注册全局action
      this.$store.dispatch('rootAction');

      //动态注册模块
      this.$store.registerModule('two',Two);
      console.log('动态注册模块：',this.$store.state.two.twoState);
    }
  }
</script>

<style lang="scss">

</style>
