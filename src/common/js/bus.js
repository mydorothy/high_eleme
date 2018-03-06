
/*
  on和emit的事件必须是在一个公共的实例上，才能触发。
  所以需要新建一个Vue实例作为公共的实例
*/

import Vue from 'vue'

export var bus = new Vue();
