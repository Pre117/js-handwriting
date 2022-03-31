/**
 * 手写实现深拷贝函数
 * @param {*} value 需要拷贝的值
 * @param {*} hash 防止函数循环引用的hash表，不需要输入
 */
const deepClone = (value, hash = new WeakMap()) => {
    // 正则表达式
    if (value instanceof RegExp) return new RegExp(value)
    // 日期对象
    if (value instanceof Date) return new Date(value)
    // 基础类型
    if (typeof value !== 'object' || value === null) return value
    // 如果是循环引用，返回上次拷贝结果
    if (hash.has(value)) hash.get(value)
    // 拷贝对象能使用被拷贝对象的原型方法
    let newValue = new value.constructor()
    // 解决循环引用
    hash.set(value, newValue)

    for (let key in value) {
        // 只拷贝实例属性，不拷贝原型属性
        if (value.hasOwnProperty(key)) {
            newValue[key] = deepClone(value[key], hash)
        }
    }

    return newValue
}

// 使用示例
const obj = {
    str: 'string',
    num: 12,
    boolean: true,
    bigInt: BigInt(12),
    nullValue: null,
    undefinedValue: undefined,
    symbolValue: Symbol('a'),
    arr: [1, 2, [3, [4]]],
    reg: /^\d$/,
    date: new Date(),
    func: function () {
        console.log('hello')
    },
    objValue: {
        a: 123,
    },
}

const newObj = deepClone(obj)
console.log(newObj)
