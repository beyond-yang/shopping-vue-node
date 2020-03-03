<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="goods">Order Confirm</span>
        </nav-bread>
        <div class="checkout-order">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
                <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
                </ul>
            </div>

            <!-- order list -->
            <div class="page-title-normal checkout-title">
                <h2><span>Order content</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                <div class="cart-item-head">
                    <ul>
                    <li>Order contents</li>
                    <li>Price</li>
                    <li>Quantity</li>
                    <li>Subtotal</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="(item) in orderList" :key="item.productId" v-if="item.checked=='1'">
                    <div class="cart-tab-1">
                        <div class="cart-item-pic">
                        <img :src="'./../static/'+item.productImage" alt="">
                        </div>
                        <div class="cart-item-title">
                        <div class="item-name">{{ item.productName }}</div>

                        </div>
                    </div>
                    <div class="cart-tab-2">
                        <div class="item-price">{{ item.salePrice | currency('$', 2) }}</div>
                    </div>
                    <div class="cart-tab-3">
                        <div class="item-quantity">
                        <div class="select-self">
                            <div class="select-self-area">
                            <span class="select-ipt">{{ item.productNum }}</span>
                            </div>
                        </div>
                        <div class="item-stock item-stock-no">In Stock</div>
                        </div>
                    </div>
                    <div class="cart-tab-4">
                        <div class="item-price-total">{{ item.productNum*item.salePrice | currency('$', 2) }}</div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>

            <!-- Price count -->
            <div class="price-count-wrap">
                <div class="price-count">
                <ul>
                    <li>
                    <span>Item subtotal:</span>
                    <span>{{ subtotal | currency('$', 2) }}</span>
                    </li>
                    <li>
                    <span>Shipping:</span>
                    <span>{{ Shipping | currency('$', 2) }}</span>
                    </li>
                    <li>
                    <span>Discount:</span>
                    <span>{{ discount | currency('$', 2) }}</span>
                    </li>
                    <li>
                    <span>Tax:</span>
                    <span>{{ tax | currency('$', 2) }}</span>
                    </li>
                    <li class="order-total-price">
                    <span>Order total:</span>
                    <span>{{ orderTotal | currency('$', 2) }}</span>
                    </li>
                </ul>
                </div>
            </div>

            <div class="order-foot-wrap">
                <div class="prev-btn-wrap">
                <router-link to="/address" class="btn btn--m">Previous</router-link>
                </div>
                <div class="next-btn-wrap">
                <button class="btn btn--m btn--red" @click="payMent">Proceed to payment</button>
                
                </div>
            </div>
            </div>
            <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/checkout.css'
import './../assets/css/base.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import axios from 'axios'
import { currency } from './../util/currency.js'
export default {
    data() {
        return {
            orderList: [],
            subtotal: 0,
            Shipping: 100,
            discount: 200,
            tax: 400,
            orderTotal: 0,
        }
    },
    created() {
        this.init()
    },
    methods: {
        // 调用接口，拿到把用户要结账的商品
        init() {
            axios.post('users/cartlist').then((res)=>{
                if(res.data.status === 0) {
                    this.orderList = res.data.result
                    // console.log(res.data.result)
                    this.orderList.forEach((item)=>{
                        if(item.checked === '1') {
                            this.subtotal += item.productNum*item.salePrice
                            this.orderTotal = this.subtotal - this.Shipping - this.discount + this.tax
                        }
                    })

                }
            })
        },

        // 调用接口，创建订单
        payMent() {
            let addressId = this.$route.query.addressId
            axios.post('users/payMent', {
                addressId: addressId,
                orderTotal: this.orderTotal
            }).then((res)=>{
                if(res.data.status === 0) {
                    let orderId = res.data.result.orderId
                    this.$router.push({
                        path: '/ordersuccess?orderId='+orderId
                    })
                    
                }
            })
        }

    },
    filters: {
        currency: currency
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    }
}
</script>