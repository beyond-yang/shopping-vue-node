const express = require('express')
const app = express()
const goods = require('./../server/routes/goods.js')
const index = require('./../server/routes/index.js')
const users = require('./../server/routes/users.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded( { extended: false } ))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())
// app.get('/', (req, res)=>{
//     res.send('访问成功')
// })

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// });

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Accept, Authorization,Origin, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  });

// 登录拦截
// app.use(function (req, res, next) {
//   if(req.cookies.userId) {
//     next()
//   } else {
//     if(req.originalUrl=='/users/login' || req.originalUrl=='/users/loginOut' ||req.path.indexOf('/goods/list')>-1) {
//       next()
//     } else {
//       res.json({
//         status: '10001',
//         msg: '当前未登录',
//         result: ''
//       })
//     }
//   }
// })
app.use('/', index)
app.use('/goods', goods)
app.use('/users', users)
// app.use(goods)

app.listen(3000, ()=>console.log('server is running'))