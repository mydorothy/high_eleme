/**
 * Created by 呵呵哒 on 2018/3/2.
 */


/*
 npm run dev  和 npm run build
npm run dev是开发环境, npm run build是生产环境, 在开发环境完成代码和测试, 之后用生产环境生成代码,

  npm run build的时候, 一开始就会提示Built files are meant to be served over an HTTP server. Opening index.html over file:// won't work., 因为vue-cli的默认配置中, publishPath是用绝对目录, 所以dist文件夹里的文件必须放在服务器的根目录, 如果你想本地打开的话, 可以在npm run build完成之后执行以下命令:

  cd dist
  npm install -g http-server // 该命令只需执行一次, 安装过之后, 以后就不需要重复安装了.
  hs
  执行hs后会提示 url路径

*/
