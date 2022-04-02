/**
 * 实现一个call方法，与Function.prototype.call功能相似
 * @param {*} context 执行函数的上下文，如果为null或undefined则自动替换成全局对象
 * @param  {...any} rest 指定的参数列表
 * @returns 使用调用者提供的this值和参数调用该函数的返回值。若该方法没有返回值，则返回undefined
 */
Function.prototype.$call = function (context, ...rest) {
    // 如果context存在，则通过Object对context进行包装（context可能是原始值）
    // 如果context不存在，自动替换为全局对象
    context = context ? Object(context) : (globalThis || window)
    // 给context添加将被调用的函数
    context.callerFn = this
    // 保存函数执行结果
    const result = context.callerFn(...rest)
    // 删除context添加的函数，避免在构造函数内添加属性
    delete context.callerFn
    // 返回函数执行结果
    return result
}

// 使用示例
function fn(a, b, c) {
    return a + b + c + this.d
}

globalThis.d = 5

const obj = {
    d: 4,
    sayD: function () {
        return this.d
    }
}

const obj2 = {
    d: 6
}

console.log(fn.$call(null, 1, 2, 3))
console.log(obj.sayD.$call(null))
console.log(obj.sayD.$call())
console.log(obj.sayD.$call(obj2))
