console.log(typeof process.env.NODE_ENV, 'env')
console.log(process.env.NODE_ENV === 'development')

const a: string = 'zzx'
console.log(a)
const b = 1
const c = 2
const d = 3
console.log(d)

if (process.env.NODE_ENV === 'development') {
  console.log('dev')
} else {
  console.log('prod')
}
