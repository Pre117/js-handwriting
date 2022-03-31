/**
 * 对操作进行防抖处理
 * 防抖：触发n秒内再次触发则刷新计时，n秒后才执行函数（期间不触发）
 * 使用场景：
 * 1、搜索框联想功能（也能做节流）
 * 2、通过resize事件获取浏览器窗口大小
 * 3、文本编辑器实时保存（无操作后一秒保存）
 * 4、表单按钮点击事件（也能做节流）
 * @param {*} fn 需要防抖的函数
 * @param {*} delay 触发函数后多少秒内没触发可以执行
 * @returns 执行函数
 */
const debounce = (fn, delay = 1000) => {
    let timer = null
    
    return function () {
        if (tiemr) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(null, arguments)
            timer = null
        }, delay)
    }
}