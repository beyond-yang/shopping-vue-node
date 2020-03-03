const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('./../models/goods.js')
const Users = require('./../models/users.js')
require('./../util/util.js')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall', {useNewUrlParser: true,useUnifiedTopology: true})
// 为数据库的连接状态绑定监听事件
mongoose.connection.on('connected',()=>console.log('mongoDB connected success'))
mongoose.connection.on('error', ()=>console.log('mongoDB connected fail'))
mongoose.connection.on('disconnected', ()=>console.log('mongoDb connected disconnected'))

// 实现用户登录功能
router.post('/login', (req, res)=>{
    let params = {
        userName: req.body.username,
        userPwd: req.body.password
    }
    Users.findOne(params, (err1, userDoc)=>{
        if(err1) {
            res.json({
                status: 1,
                msg: err1.message
            })
        } else {
            if(userDoc) {
                res.cookie("userId", userDoc.userId, {
                    path: '/',
                    maxAge: 1000*60*60
                })
                res.cookie("userName", userDoc.userName, {
                    path: '/',
                    maxAge: 1000*60*60
                })
                res.json({
                    status: 0,
                    msg: '',
                    result: userDoc
                })
            }
        }
    })
})

// 实现用户退出功能
router.post('/loginOut', (req, res)=>{
    res.cookie("userId", "", {
        path: '/',
        maxAge: -1
    })
    res.json({
        status: 0,
        msg: '',
        result: ''
    })
})

// 校验用户是否登录
router.get('/checkLogin', (req, res, next)=>{
    if(req.cookies.userId) {
        res.json({
            status: 0,
            msg: '已登录',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }
})

// 从数据库中获取userID为***的购物车商品数据
router.post('/cartlist', (req, res)=>{
    let userId = '1111'
    Users.findOne({'userId': userId}, (err, cartListDoc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            })
        } else {
            if(cartListDoc) {
                res.json({
                    status: 0,
                    msg: '',
                    result: cartListDoc.cartList
                })
            }
        }
    })
})

// 从数据库中删除userID为***, productId为***的商品
router.get('/productDel', (req, res)=>{
    let userId = '1111'
    let productId = req.query.productId
    Users.update({ 
        "userId": userId
    },{
        $pull: {
            'cartList': {
                productId: productId
            }
        }
    }, (err)=>{
        if(err) {
            res.json({
                status: 1,
                msg: err.msg,
                result: ''
            })
        } else {
            res.json({
                status: 0,
                msg: '删除成功',
                result: ''
            })
        }
    })
})

// 实现修改商品数量功能
router.get('/productNumChange', (req, res)=>{
    let userId = '1111'
    let productNum = req.query.productNum
    let productId = req.query.productId
    Users.update({ 'userId': userId, "cartList.productId": productId },
    { "cartList.$.productNum": productNum }, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: '商品数量修改失败',
                result: ''
            })
        } else {
            if(doc) {
                res.json({
                    status: 0,
                    msg: '商品数量修改成功',
                    result: ''
                })
            }
        }
    })

})

// 实现商品选中和取消选中的功能
router.get('/productChecked', (req, res)=>{
    let userId = '1111'
    let productId = req.query.productId
    let checked = req.query.checked
    Users.updateOne({ 'userId': userId, 'cartList.productId': productId}, {
        "cartList.$.checked": checked
    }, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: '商品是否选中修改失败',
                result: ''
            })
        } else {
            if(doc) {
                res.json({
                    status: 0,
                    msg: '商品是否选中修改成功',
                    result: doc
                })
            }
        }
    })
})

// 点击select all按钮实现商品的全选和全不选
router.post('/selectedAll', (req, res)=>{
    let userId = '1111'
    let selectedAllFlag = req.body.flag
    Users.findOne({ 'userId': userId }, (err, userDoc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: '失败',
                result: ''
            })
        } else {
            if(userDoc) {
                userDoc.cartList.forEach((item)=>{
                    item.checked = selectedAllFlag?1:0
                })
                userDoc.save((err2, doc2)=>{
                    if(err2) {
                        res.json({
                            status: 1,
                            msg: '失败',
                            result: ''
                        })
                    } else {
                        res.json({
                            status: 0,
                            msg: '成功',
                            result: ''
                        })
                    }
                })
            }
        }
    })
})

// 从数据库中获取此用户的收货地址列表
router.post('/address', (req, res)=>{
    let userId = '1111'
    Users.findOne({"userId": userId}, (err, userDoc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            if(userDoc) {
                res.json({
                    status: 0,
                    msg: 'suc',
                    result: userDoc.addressList
                })
            }
        }
    })
})

// 实现地址切换功能
router.get('/setDefaultAddress', (req, res)=>{
    let userId = '1111'
    let addressId = req.query.addressId
    console.log(addressId)
    Users.findOne({"userId": userId}, (err1, doc1)=>{
        if(err1) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            if(doc1) {
                doc1.addressList.forEach((item)=>{
                    if(item.addressId === addressId) {
                        item.isDefault = true
                    } else {
                        item.isDefault = false
                    }
                })
                doc1.save((err, doc)=>{
                    if(err) {
                        res.json({
                            status: 1,
                            msg: 'fail',
                            result: ''
                        })
                    } else {
                        res.json({
                            status: 0,
                            msg: 'suc',
                            result: doc
                        })
                    }
                })
            }
        }
    })
})

// 实现删除地址功能
router.post('/delAddress', (req, res)=>{
    let userId = '1111'
    let addressId = req.body.addressId
    Users.updateOne({ "userId": userId }, {
        $pull: {
            "addressList": {
                "addressId": addressId
            }
        }
    }, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            if(doc) {
                res.json({
                    status: 0,
                    msg: 'suc',
                    result: ''
                })
            }
        }
    })
})

// 实现创建订单功能
router.post('/payMent', (req, res)=>{
    let userId = '1111'
    let addressId = req.body.addressList
    let orderTotal = req.body.orderTotal
    Users.findOne({ "userId": userId }, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            let  address = '', goodsList = []
            // 获取当前用户订单的地址信息
            doc.addressList.forEach((item)=>{
                if(item.addressId === addressId) {
                    address = item
                }
            })
            // 获取当前用户订单的商品信息
            doc.cartList.forEach((item)=>{
                if(item.checked === '1') {
                    goodsList.push(item)
                }
            })

            let platform = '622'
            let r1 = Math.floor(Math.random()*10)
            let r2 = Math.floor(Math.random()*10)
            let sysDate = new Date().Format('yyyyMMddhhmmss')
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
            let orderId = platform+r1+sysDate+r2
            let order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate
            }
            doc.orderList.push(order)
            doc.save((err, doc)=>{
                if(err) {
                    res.json({
                        status: 1,
                        msg: 'fail',
                        result: ''
                    })
                } else {
                    res.json({
                        status: 0,
                        msg: 'suc',
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    })
                }
            })
        }
    })
})

// 根据订单id查询当前订单数据
router.post('/ordersuc', (req, res)=>{
    let userId = '1111'
    let orderId = req.body.orderId
    Users.findOne({ "userId": userId }, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            if(doc) {
                let orderList = doc.orderList
                if(orderList.length>0) {
                    let orderTotal = 0
                    orderList.forEach((item)=>{
                        if(item.orderId === orderId) {
                            orderTotal = item.orderTotal
                        }
                    })
                    if(orderTotal>0) {
                        res.json({
                            status: 0,
                            msg: 'suc',
                            result: {
                                orderId: orderId,
                                orderTotal: orderTotal
                            }
                        })
                    } else {
                        res.json({
                            status: 1222,
                            msg: '无此订单',
                            result: ''
                        })
                    }
                }

               
            } else {
                res.json({
                    status: 120001,
                    msg: '无此订单',
                    result: ''
                })
            }
        }
    })
})

// 查询购物车商品数量
router.get('/getCartCount', (req, res)=>{
    let userId = '1111'
    Users.findOne({"userId": userId}, (err, doc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: 'fail',
                result: ''
            })
        } else {
            if(doc) {
                let cartCount = 0
                doc.cartList.forEach((item)=>{
                    cartCount+=item.productNum
                })
                res.json({
                    status: 0,
                    mag: 'suc',
                    result: cartCount
                })
            }
        }
    })
})

module.exports = router