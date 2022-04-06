/**
 * 实现一个同步版本的compose函数
 * 接收多个函数作为参数，a、b、c...，达到以下效果：
 * compose(a, b, c)(args) === c(b(a(args)))
 * @param  {...any} fns 多个函数作为参数
 * @returns 最终结果值
 */
const composeSync = function (...fns) {
    
    return (...args) => {
        let res
        
        for(let i = 0; i < fns.length; i++) {
            if (i === 0) {
                res = fns[i](...args)
            } else {
                res = fns[i](res)
            }
        }

        return res
    }
}

// 使用示例
// 非数组
// const a = (args) => args + 1
// const b = (args) => args + 2
// const c = (args) => args + 3
// 数组
const a = (args) => [...args, 1]
const b = (args) => [...args, 2]
const c = (args) => [...args, 3]

const fn = composeSync(a, b, c)
// const res = fn(0)
const res = fn([0])
console.log(res)