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