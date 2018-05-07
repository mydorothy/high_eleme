/**
 * 利用express 启动一个小型的服务器，供 npm run build 线上项目使用
 */

var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express();

var router = express.Router();

router.get('/',function (req,res,next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');//模拟后台返回的数据
var seller = appData.seller;//商家信息数据
var goods = appData.goods;//商品信息数据
var ratings = appData.ratings;//评论数据
var apiRoute = express.Router();//配置路由


app.get('/api/seller', (req, res) => {//接口返回json数据，上面配置的数据seller就赋值给data请求后调用 http://localhost:8080/api/seller 即可调用
  res.json({
    errno:0,
    data:seller
  })
})
app.get('/api/goods', (req, res) => {
  res.json({
    errno:0,
    data:goods
  })
})
app.get('/api/ratings', (req,res) => {
  res.json({
    errno:0,
    data:ratings
  })
})
app.use('/api',apiRoute);

app.use(express.static('./dist'));//将静态资源文件所在的目录作为参数传递给 express.static 就可以提供静态资源文件的访问了

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});

