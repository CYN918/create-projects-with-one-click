import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "./plugins/element.js"; // element-ui
import "@/common/scss/base.scss";
import "@/common/scss/index.scss";
import "@/common/scss/yz.scss";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import dx_base from "@/common/js/dx_base.js";
import "./permission";
import "@/common/icons"; // icon'
import Print from 'vue-print-nb'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { sysusercurrent } from '@/api/supplier'
import { platformOpenInfo, findRouterInfo } from '@/api/platformOpenInfo'
import { currentMenuTree } from "@/api/permissions";

//全局过滤
import * as filters from './utils/filters'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VueQuillEditor)

Vue.use(ElementUI)

// import './permission'
Vue.use(Print);
Vue.use(dx_base);
Vue.config.productionTip = false;
Vue.prototype.baseUrl1 = process.env.VUE_APP_SERVICE_URL;

//注册权限判断指令
Vue.directive("permit", {
  inserted: function (el, data, vnode) {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    //超级管理员不做判断
    if (userInfo.data.sysuserAccount == "admin") return;

    //如果没有权限则禁用可禁用的组件，不可禁用则删除
    const permission = data.value;
    if (!(userInfo.authorities && userInfo.authorities.indexOf(permission) != -1)) {
      el.remove();
    }
  }
});

// 定义loading变量(这里的loading为单例模式，如果不是单例则需要封装变成单例模式)
let loading;
//定义vue实例
let that = new Vue()

// 开始loading
Vue.prototype.startLoading = function() {
  loading = that.$loading({
    lock: true,
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'white',
    target: '.el-table', 
  });
}

// 结束loading
Vue.prototype.endLoading = function() {
  if (loading) {
      loading.close();
  }
}

Vue.directive("focus", function (el, option) {
  var defClass = "el-input",
    defTag = "input";
  var value = option.value || true;
  if (typeof value === "boolean")
    value = { cls: defClass, tag: defTag, foc: value };
  else
    value = {
      cls: value.cls || defClass,
      tag: value.tag || defTag,
      foc: value.foc || false
    };
  if (el.classList.contains(value.cls) && value.foc)
    el.getElementsByTagName(value.tag)[0].focus();
});

/**
 * 并行加载初始化数据
 * 完成后加载 VUE 框架 (防止异常后未加载)
 */
Promise.all([
  async () => {
    const token = new URL(location.href).searchParams.get("token");

    //如果在转跳时携带了Token 则获取该用户信息
    if (token) {
      localStorage.clear();
      const res = await sysusercurrent(token);
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("Admin-token", token);
    }
  },
  async () => {
    const Admintoken = localStorage.getItem("Admin-token");

    if (Admintoken) {
      const { data } = await currentMenuTree()
      const user = JSON.parse(localStorage.getItem('user'))
      user.menuItems = data
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  async () => {
    const { data } = await findRouterInfo();
    Vue.prototype.$routerInfo = data;
  },
  async () => {
    const { data } = await platformOpenInfo();
    Vue.prototype.$platformOpenInfo = data;
    
  }
].map(method => method())).finally(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
