const mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList": [
    ],
    "cartList":[
        {
        "productId":String,
        "productName":String,
        "salePrice":String,
        "productImage":String,
        "checked":String,
        "productNum":Number
        }
    ],
    "addressList":[
        {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
        }
    ]
})

var User = mongoose.model('Users', userSchema)
// User.remove({}, function(err) {
//     if(!err) {
//         console.log('删除成功')
//     }
// })


// User.update( {"userId": '1111'}, {
//     "orderList.$.addressId": '10001',
//     "orderList.$.userName": '杨静',
//     "orderList.$.streetName": '北京朝阳市',
//     "orderList.$.postName": '10001',
//     "orderList.$.tel": '17344586548',
//     "orderList.$.isDefault": false
// })




// User.create({
//     "userId": '1111',
//     "userName": '杨静',
//     "userPwd": '123456',
//     "orderList":Array,
//     "cartList":[
//         {
//         "productId": '1',
//         "productName": '蓝牙音响',
//         "salePrice": '700',
//         "productImage": '16.jpg',
//         "checked": 1,
//         "productNum": 22
//         }
//     ],
//     "addressList":[
//         {
//         "addressId": '10001',
//         "userName": '杨静',
//         "streetName": '北京市朝阳区',
//         "postCode": '4400',
//         "tel": '17344866549',
//         "isDefault": true
//         },
//         {
//             "addressId": '10002',
//             "userName": '小米',
//             "streetName": '郑州市二七区',
//             "postCode": '2200',
//             "tel": '17344866549',
//             "isDefault": false
//             },
//             {
//                 "addressId": '10003',
//                 "userName": '小红',
//                 "streetName": '安阳市文峰区',
//                 "postCode": '3300',
//                 "tel": '17344866549',
//                 "isDefault": false
//                 },
//                 {
//                     "addressId": '10004',
//                     "userName": '小梦',
//                     "streetName": '广州市花都区',
//                     "postCode": '2233',
//                     "tel": '17344866549',
//                     "isDefault": false
//                     },
//                     {
//                         "addressId": '10005',
//                         "userName": '小杰',
//                         "streetName": '北京市朝阳区',
//                         "postCode": '4400',
//                         "tel": '17344866549',
//                         "isDefault": false
//                         },
//                         {
//                             "addressId": '10006',
//                             "userName": '小青',
//                             "streetName": '广州市花都区',
//                             "postCode": '4400',
//                             "tel": '17344866549',
//                             "isDefault": false
//                             }
//     ]
// }, (err, doc)=>{
//     if(err) {
//         console.log(err)
       
//     } else {
//         console.log('用户数据插入成功')
//         console.log(doc)
//     }
// })

module.exports = User