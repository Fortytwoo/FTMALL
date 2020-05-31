// 判断是开发阶段还是生产阶段的变量
// 发布产品时的babel插件数组
const prodplugins = []
// 判断编译模式
if (process.env.NODE_ENV === 'production') {
  prodplugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 使用babel中的  transform-remove-console
    // ...将prodplugins中的每一项展开，放入当前数组中
    ...prodplugins,
    // 导入该依赖
    '@babel/plugin-syntax-dynamic-import'
  ]
}
