export interface EventFace {
  on: (name: string, callback: Function) => void
  emit: (name: string, ...args: Array<any>) => void
  off: (name: string, callback: Function) => void
  once: (name: string, callback: Function) => void
}

export interface List {
  [key: string]: Array<Function>
}
