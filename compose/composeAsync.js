
const composeAsync1 = function (...fns) {
    return async (...args) => {
        let res

        for(let i = 0; i < fns.length; i++) {
            if (i === 0) {
                res = await fns[i](...args)
            } else {
                res = await fns[i](res)
            }
        }

        return res
    }
}

const composeAsync2 = function (...fns) {
    return (...args) => {
        let i = 0

        function fn(a) {
            fns[i](a).then(value => {
                if (i < fns.length) {
                    i++
                    fn(value)
                }
            })
        }

        return fn(...args)
    }
}


// 使用示例
const a = (args) => new Promise((resolve, reject) => setTimeout(() => resolve(args), 1000))
const b = (args) => new Promise((resolve, reject) => setTimeout(() => resolve(args), 1000))
const c = (args) => new Promise((resolve, reject) => setTimeout(() => resolve(args), 1000))

const fn = composeAsync1(a, b, c)
const res = fn(0)
console.log(res)
a(0).then(value => console.log(value))