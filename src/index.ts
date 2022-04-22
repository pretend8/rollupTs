import { EventInterface, List } from './types'

class Dispatch implements EventInterface {
  list: List
  constructor() {
    this.list = {}
  }
  on(name: string, fn: Function) {
    let callback = this.list[name] || []
    callback.push(fn)
    this.list[name] = callback
  }
  emit(name: string, ...args: Array<any>) {
    if (this.list[name]?.length) {
      this.list[name].forEach((cb) => {
        cb.apply(this, args)
      })
    } else {
      console.error('no event.....')
    }
  }
  off(name: string, fn: Function) {
    if (this.list[name] && fn) {
      let index = this.list[name].findIndex((cb) => cb === fn)
      this.list[name].splice(index, 1)
    } else {
      console.error('no event.....')
    }
  }
  once(name: string, fn: Function) {
    let tempFn = (...args: Array<any>) => {
      fn.apply(this, args)
      this.off(name, tempFn)
    }
    this.on(name, tempFn)
  }
}

const o = new Dispatch()

const fn = (...args: Array<any>) => {
  console.log(...args, 'args')
}
// o.on('post', fn)
o.once('post', fn)
o.emit('post', 1, false, { name: 'zzx' })
// o.off('post', fn)

o.emit('post', 2, true, { name: 'zz1x' })
o.emit('post', 3, false, { name: 'zz1x' })
