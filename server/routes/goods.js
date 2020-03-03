const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Goods = require('./../models/goods.js')
var Users = require('./../models/users.js')


// 连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall', {useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('connected', ()=>console.log('MongooDB connected success'))
mongoose.connection.on('error', ()=>console.log('mongooDB connected fail'))
mongoose.connection.on('disconnected', ()=>console.log('mongooDB connected disconnected'))

// 查询商品列表
router.get('/list', (req, res, next)=>{
    let page = req.query.page
    let pageSize = parseInt(req.query.pageSize)
    let sort = req.query.sort
    let priceLevel = req.query.priceLevel
    let skip = (page-1)*pageSize
    var priceGt = '', priceLte = ''
    let params = {}
    if(priceLevel!=='all') {
        switch(priceLevel) {
            case '0': priceGt = 0; priceLte = 500; break;
            case '1': priceGt = 500; priceLte = 1000; break;
            case '2': priceGt = 1000; priceLte = 1500; break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    
    Goods.find(params).skip(skip).limit(pageSize)
    .sort({ 'salePrice': sort })
    .exec((err, doc)=>{
        if(err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

// 加入购物车
router.post('/addCart', (req, res)=>{
    let userId = '1111'
    // console.log(userId,"addCart")
    Users.findOne({ userId: userId }, (err, userDoc)=>{
        if(err) {
            res.json({
                status: 1,
                msg: err.message
            })
        } else {
            // res.json(userDoc)
            // console.log(userDoc)
            if(userDoc) {
                let productId = req.body.productId
                Goods.findOne({ productId: productId }, (proErr, productDoc)=>{
                    if(proErr) {
                        res.json({
                            status: 1,
                            msg: err.message
                        })
                    } else {
                        if(productDoc) {
                            productDoc.productNum = 1
                            productDoc.checked = 1
                            let goodsItem = ''
                            userDoc.cartList.forEach(function (item) {           
                                if(parseInt(item.productId) == parseInt(productId)) {
                                    goodsItem = item
                                    item.productNum++
                                }
                            })
                            if(goodsItem) {
                                userDoc.save((saUserErr, saDoc)=>{
                                    if(saUserErr) {
                                        res.json({
                                            status: 1,
                                            msg: saUserErr.message
                                        })
                                    } else {
                                        res.json({
                                            status: 0,
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            } else {
                                userDoc.cartList.push(productDoc)
                                userDoc.save((saUserErr, saDoc)=>{
                                    if(saUserErr) {
                                        res.json({
                                            status: 1,
                                            msg: saUserErr.message
                                        })
                                    } else {
                                        res.json({
                                            status: 0,
                                            msg: '',
                                            result: 'success'
                                        })
                                    }
                                })
                            }
                           
                            console.log(userDoc)
                        }
                    }
                })
            }
        }
    })
})



module.exports = router