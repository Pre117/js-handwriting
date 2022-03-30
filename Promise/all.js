/**
 * 手写实现Promise.all方法
 * 
 * 定义：
 * 输入一个Promise实例数组，
 * 如果全部Promise实例都成功，则返回一个状态为fulfilled的Promise实例；
 * 如果有一个Promise实例失败，则返回一个状态为rejected1的Promise实例
 */

all = (arr) => {
    return new Promise((resolve, reject) => {
        const result = []
        const len =  arr.length

        arr.forEach(item => {
            item.then(value => {
                result.push(value)

                if (result.length === len) resolve(result)
            }).catch(reason => reject(reason))
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

const p4 = new Promise((resolve, reject) => {
    setTimeout(() => reject(4), 3500)
})

const arr = [p1, p2, p3, p4]

all(arr).then(value => console.log(value))