var express = require('express');
var config = require('./config/index');
var port = process.env.PORT ||config.build.port;
var app = express();
var router = express.Router();

router.get('/',function(req,res,next){
  req.url = '/index.html';
  next();
})

app.use(router);

var appData = require('./data.json');//引入json文件
var seller = appData.seller;//接口一
var goods = appData.goods;//接口二
var ratings = appData.ratings;//接口三
// 定义路由
var apiRoutes = express.Router();
// seller借口的读取数据
apiRoutes.get('/seller',function(req,res){
  res.json({
    errno : 0,
    data : seller
  });
});
// goods借口的读取数据
apiRoutes.get('/goods',function(req,res){
  res.json({
    errno : 0,
    data : goods
  });
})
// ratings借口的读取数据
apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno : 0,
    data : ratings
  });
})

app.use('/api',apiRoutes);//注册路由

app.use(express.static('./dist'));

module.export = app.listen(port, function(err){
  if(err){
    console.log(err)
    return
  }
  console.log('listening at http://localhost:'+port+ '\n')
})
