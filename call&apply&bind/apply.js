/**
 * 实现一个apply方法，与Function.prototype.apply功能相似
 * @param {*} context 执行函数的上下文，如果为null或undefined则自动替换成全局对象
 * @param {*} argsArray 指定的参数数组
 * @returns 调用有指定this值和参数的函数的结果
 */
Function.prototype.$apply = function (context, argsArray = []) {
    // 如果context存在，则通过Object对context进行包装（context可能是原始值）
    // 如果context不存在，自动替换为全局对象
    context = context ? Object(context) : (globalThis || window)
    // 给context添加将被调用的函数
    context.callerFn = this
    // 保存函数执行结果
    // console.log(context);
    const result = context.callerFn(...argsArray)
    // 删除context添加的函数，避免在构造函数内添加属性
    delete context.callerFn
    // 返回函数执行结果
    return result
}

// 使用示例
globalThis.a = 1

const obj1 = {
    a: 2
}

function fn (b = 0, c = 0, d = 0) {
    return this.a + b + c + d
}

console.log(fn(3, 4, 5))
console.log(fn.$apply())
console.log(fn.$apply(null, [4, 5, 6]))
console.log(fn.$apply(obj1, [4, 5, 6]))