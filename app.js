var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , crypto = require('crypto');           //使用md5加密需要的模块

var index = require('./routes/index');
var users = require('./routes/users');

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/users', users.routes(), users.allowedMethods());

koa.post('/checkPwd',function *(next){
  console.log("this.request.body.pwd:====");
  console.log(this.request.body.password);
  var reqPwd = this.request.body.password;

  var code = 10000,
      pwd = 'xiangming';
  pwd = md5(pwd);
  console.log('md5 pwd:=====================');
  console.log(pwd);
  if(reqPwd === pwd){
    code = 10000;
    msg = 'success';
  }else{
    code = 10001;
    msg = 'failure;'
  }
  yield this.body = {
    code:code,
    data:{
      msg:msg
    }
  };
})


// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});






//md5加密============================开始=====================================
function md5(str){
  var md5Sum = crypto.createHash('md5');
  md5Sum.update(str);
  str = md5Sum.digest('hex');
  return str;
}
//md5加密============================结束=====================================










module.exports = app;
