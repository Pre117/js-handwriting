/**
 * 手写实现Promise.race方法
 * 
 * 定义：
 * 接收一个Promise数组为参数，其中任意一个Promise有了结果（fulfilled或者rejected）
 * 则返回一个Promise实例，其结果为那个有结果的Promise
 */

race = (arr) => {
    return new Promise((resolve, reject) => {
        arr.forEach(item => {
            item.then(value => {
                resolve(value)
            }).catch(reason => {
                reject(reason)
            })
        })
    })
}

// 使用示例
const p1 = new Promise((resolve) => {
    setTimeout(() => resolve(1), 1000)
})

const p2 = new Promise((resolve) => {
    setTimeout(() => resolve(2), 2000)
})

const p3 = new Promise((resolve) => {
    setTimeout(() => resolve(3), 3000)
})

// const p4 = new Promise((resolve, reject) => {
//     setTimeout(() => reject(4), 500)
// })

const arr = [p1, p2, p3]

race(arr).then(value => console.log(value))