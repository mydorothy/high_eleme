'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora') // 长时间运行的异步任务-提示，例如项目启动时 转圈图标
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {// 打包结束
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({ // 打包结束，输出一些打包信息，即一些目录 static/js/vendor.a1db2c273e5cecb8277f.js
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow( // 提示信息:编译后的文件必须放到服务器上才可以工作
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
