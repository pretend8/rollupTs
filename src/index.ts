// ts 发布订阅
interface EventFace {
  on: (name: string, callback: Function) => void
  emit: (name: string, ...args: Array<any>) => void
  off: (name: string, callback: Function) => void
  once: (name: string, callback: Function) => void
}
interface List {
  [key: string]: Array<Function>
}

class Dispatch implements EventFace {
  list: List
  constructor() {
    this.list = {}
  }
  on(name: string, callback: Function) {
    // 订阅者 收集对应监听事件相关回调
    let temp = this.list[name] || []
    temp.push(callback)
    this.list[name] = temp
  }
  emit(name: string, ...args: Array<any>) {
    if (this.list[name]?.length) {
      this.list[name].forEach((callback) => {
        callback.apply(this, args)
      })
    } else {
      throw new Error('no evnet listening....')
    }
  }
  off(name: string, callback?: Function) {
    if (!this.list[name]) {
      throw new Error('no event needs destroy')
    } else {
      if (callback) {
        let index = this.list[name].findIndex((cb) => cb === callback)
        this.list[name].splice(index, 1)
      } else {
        this.list[name] = [] // 该事件对应的所有回调函数
      }
    }
  }
  once(name: string, callback: Function) {
    // 使用临时函数 用完就删掉

    let tempFn = (...args: Array<any>) => {
      callback.apply(this, args)

      this.off(name, tempFn)
    }

    this.on(name, tempFn)
  }
}

export default Dispatch
