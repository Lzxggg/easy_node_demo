var express = require('express')

//针对路由来说 ./是不能够省略的 而url地址可以
var router = require('./router')

var app = express()

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.engine('html',require('express-art-template'))

app.use('/node_modules/',express.static('node_modules'))
app.use('/public/',express.static('public'))

//把路由挂载到服务中
app.use(router)

app.listen(3000,function () {
    console.log("成了已经是成了")
})

module.exports = app