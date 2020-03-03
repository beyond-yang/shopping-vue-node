const mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "checked": String,
    "productNum": Number,
    "productImage": String
})
var Good = mongoose.model('Goods', productSchema)
// Good.remove({},(err)=>{
//     if(!err) {
//         console.log('删除商品成功')
//     }
// })

// Good.create({
//     "productId": '16',
//     "productName": '小孔雀',
//     "salePrice": 888,
//     // "checked": String,
//     "productNum": 1,
//     "productImage": '16.jpg'
// }, (error, doc)=>{
//     if(!error) {
//         console.log('添加成功了')
//         console.log(doc)
//     }
// })
// Good.remove({productName: '小仓鼠'}, (err)=>{
//     if(!err) {
//         console.log('删除成功')
//     }
// })

module.exports = Good