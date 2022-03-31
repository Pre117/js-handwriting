/**
 * 对操作进行节流处理
 * 节流：n秒内无论触发多少次，只执行一次函数
 * 使用场景：
 * 1、搜索框联想功能（也能做防抖）
 * 2、实现懒加载时，监听scroll事件，降低计算频率
 * 3、表单按钮点击事件（也能做防抖）
 * @param {*} fn 要进行节流的函数
 * @param {*} delay 指定时间内只执行一次函数
 * @returns 执行函数
 */
const throttle = (fn, delay = 1000) => {
    let timer = null
    
    return function () {
        if (timer) {
            return
        }

        timer = setTimeout(() => {
            fn.apply(null, arguments)
            timer = null
        }, delay)
    }
}