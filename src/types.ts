export interface EventInterface {
  on: (name: string, fn: Function) => void
  emit: (name: string, ...args: Array<any>) => void
  off: (name: string, fn: Function) => void
  once: (name: string, fn: Function) => void
}

export interface List {
  [key: string]: Array<any>
}
