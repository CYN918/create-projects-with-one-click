import axios from "axios";
import Vue from "vue";
import {getToken} from "@/utils/auth";
import {throttleTipPop, throttleTipPop2} from "@/utils/throttle";

// 创建axios实例
var axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVICE_URL,
  timeout: 600000, // 请求超时时间
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json",
  withCredentials: true
});

var show = false; //控制错误是否抛出 false抛出  true 不抛出
// request拦截器
axiosInstance.interceptors.request.use(
  config => {
    if(config.timeout === 999999){
      show = true
    }else{
      show = false
    }
      if (getToken()) {
        config.headers[process.env.VUE_APP_HEADER_TOKEN] = getToken(); // 让每个请求携带自定义token
      }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response拦截器
axiosInstance.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code) {
      const context = Vue.prototype;
      //返回的Code不为200，则输出错误
      if (res.code != 200  && res.code != 1002) {
        if (res.code > 200 && res.code < 300) {
          throttleTipPop(context, "warning", res.message);
        } else {
          throttleTipPop(context, "error", res.message);
        }
      }
    }
    return res;
  },
  error => {
    const { data, status } = error.response;
    const context = Vue.prototype;
    //对各项状态码进行详细处理
    switch (status) {
      case 401:
        // Token过期
        if (data.code == 10101) {
          throttleTipPop2();
          return;
        }
        break;
      case 403:
        throttleTipPop(context, "error", "未授权访问资源");
        return;
      case 404:
        throttleTipPop(context, "error", "未找到对应接口");
      return;
      case 500:
        throttleTipPop(context, "error", "服务发生异常, 请向服务商反馈");
        return;
      case 503:
        throttleTipPop(context, "error", "服务暂时停止访问, 请稍后再试");
        return;
    }
    if(!show){
      throttleTipPop(context, "error", data.message || error.message);
    }
  }
);

export default axiosInstance;
