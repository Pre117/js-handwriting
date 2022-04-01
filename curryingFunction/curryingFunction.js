/**
 * 对函数实现柯里化
 * 柯里化：把接收多个参数的函数变换成接收一个单一参数的函数，并且返回接收余下的参数且返回结果的新函数
 * @param {*} func 
 * @param {*} lastArgs 
 * @returns 
 */
const curryingFunction = (func, lastArgs = []) => {
    return function () {
        let args = Array.of(...lastArgs, ...arguments)

        if (args.length < func.length) {
            return curryingFunction(func, args)
        }

        return func(...args)
    }
}

// 使用示例
const instance1 = function (a, b, c) {
    return a + b + c
}
const fn = curryingFunction(instance1)


console.log(fn(1)(2)(3))
console.log(fn(1)(2, 3))
console.log(fn(1, 2)(3))
console.log(fn(1, 2, 3))