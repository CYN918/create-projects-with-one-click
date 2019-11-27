import { Message, MessageBox } from 'element-ui'
import router from 'vue-router';

// 函数节流
let firstEnter = true
export const throttle = (context, func, delay) => function (...args) {
  if (firstEnter) { // firstEnter为true允许触发
    func.apply(context, args);
    firstEnter = false // 防止连续触发
    const timer = setTimeout(() => { // 一段时间后再次允许触发
      firstEnter = true
      clearTimeout(timer)
    }, delay)
  }
}
// 提示弹窗
export const tipPop = (constext, type, message, duration) => {
  constext.$message({
    type,
    message,
    duration,
  })
}

// 弹窗节流
export const throttleTipPop = (context, type, message, delay = 2000) => {
  throttle(context, tipPop, delay)(context, type, message, delay)
}



let firstEnter2 = true
export const throttle2 = (context, func, delay) => function (...args) {
  if (firstEnter2) { // firstEnter为true允许触发
    func.apply(context, args);
    firstEnter2 = false // 防止连续触发
    const timer = setTimeout(() => { // 一段时间后再次允许触发
      firstEnter2 = true
      clearTimeout(timer)
    }, delay)
  }
}

// 提示弹窗
export const tipPop2 = () => {
  // MessageBox.alert('未登录/登录过期，请登录', '提示', {
  //   confirmButtonText: '前去登录',
  //   center: true,
  //   callback: action => {
      localStorage.clear();
      location.reload(0);
      // router.push({
      //   path: '/login',
      //   query: {}
      // });
  //   }
  // });
}

// 弹窗节流
export const throttleTipPop2 = (context, type, message, delay = 1000000) => {
  throttle(context, tipPop2, delay)(context, type, message, delay)
}