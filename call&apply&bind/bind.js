/**
 * 实现一个bind方法，与Function.prototype.bind功能相似
 * @param {*} context 执行函数的上下文，如果为null或undefined则自动替换成全局对象
 * @param  {...any} rest 指定的参数列表
 * @returns 返回一个原函数的拷贝，并拥有指定的this值和初始参数
 */
Function.prototype.$bind = function (context, ...rest) {
    // 保存this值，即原函数
    const _this = this
    // 返回一个原函数的拷贝
    return function () {
        // 如果context存在，则通过Object对context进行包装（context可能是原始值）
        // 如果context不存在，自动替换为全局对象
        context = context ? Object(context) : (globalThis || window)
        // 给context添加将被调用的函数
        context.callerFn = _this
        // 将剩余参数转换为数组
        const args = Array.from(arguments)
        // 保存函数执行结果
        const result = context.callerFn(...rest, ...args)
        // 删除添加的属性，防止内存泄露
        delete _this
        delete context.callerFn
        // 返回函数执行结果
        return result
    }
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
console.log(fn.$bind()(3, 4, 5))
console.log(fn.$bind(null)(3, 4, 5))
console.log(fn.$bind(null, 3)(4, 5))
console.log(fn.$bind(obj1, 3)(4, 5))
console.log(fn.$bind(obj1, 3, 4)(5))