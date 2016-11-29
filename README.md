# js_md5
js_md5加密密码, node后台使用crypto加密密码

## 为什么在传输过程中要用md5对密码进行加密？
众所周知，我们在表单中的输入框输入了密码后，如果采用ajax的post或者get方式提交数据，在浏览器的newwork中就可以看到我们向后台传输的内容，其他的文本内容直接提交都没问题，如果密码在传输的过程中也能被别人看见。

如果传输被拦截，那么密码就完全暴露给别人了，安全性存在极大的隐患。

所以，在传输过程中，推荐使用加密传输。

## 使用前提
==安装了nodejs 的koa 框架==  

如果没有安装koa,请执行以下命令  

```
npm install -g koa-generator
```

[什么是koa?](https://www.zhihu.com/question/38879363)
[如何学习koa? ](http://17koa.com/koa-generator-examples/koa-generator/install.html)

## 使用方法
```
> 进入项目根目录
> npm install
> npm start

```

## 访问方式
http://localhost:3000



## 前端单个js_md5实例代码
```
<!DOCTYPE HTML>
<html>
	<head>
	<meta charset="utf-8">
	<title>md5加密</title>
	<script type="text/ecmascript" src="md5.js"></script>
	<script type="text/javascript">
	 var hash = hex_md5("123dafd");
	 alert(hash)
	</script>
</head>
<body>
</body>
</html>
```
[前端md5加密参考文档](http://www.jb51.net/article/82831.htm)


## 服务端单个md5加密代码
```
var crypto = require('crypto');
exports.md5 = function (str) {
	var md5sum = crypto.createHash(‘md5’);
	md5sum.update(str);
	str = md5sum.digest(‘hex’);
	return str;
};
```
[服务端md5加密参考](http://cnodejs.org/topic/501967e0f767cc9a518a08f4)



