import path from 'path'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const isDev = () => process.env.NODE_ENV === 'development'
console.log(!isDev())
export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(__dirname, './dist/bundle.min.js'),
    format: 'esm' // umd js 引入形式,esm es6形式
  },
  plugins: [
    !isDev() &&
      terser({
        compress: {
          drop_console: true
        }
      }), // 代码压缩
    ts(), // 解析入口ts
    isDev() && livereload(), // 热更新
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 让浏览器认识process.env.NODE_ENV  不能直接写development之类的
    }),
    isDev() &&
      serve({
        open: false, // 自动打开浏览器
        port: 3030, // 端口
        openPage: '/public/index.html' // 绝对路径
      })
  ]
}
