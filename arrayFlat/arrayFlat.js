/**
 * 对嵌套数组进行扁平化处理
 * 扁平化：将嵌套数组变为一维数组
 * @param {*} arr 需要扁平化的嵌套数组
 * @returns 扁平化后的数组
 */
const arrayFlat = (arr) => {
    const result = []

    arr.forEach((value) => {
        if (Array.isArray(value)) {
            result.push(...arrayFlat(value))
        } else {
            result.push(value)
        }
    })

    return result
}

// 使用示例
const instance1 = [1, 2, 3, [4, 5, [6]]]
const instance2 = [1, 2, [ { a: '1' }, ['2']], /\d/]

console.log(arrayFlat(instance1))
console.log(arrayFlat(instance2))