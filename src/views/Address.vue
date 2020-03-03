<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot='goods'>my address</span>
        </nav-bread>
        <div class="checkout-addr">
        <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step -->
        <div class="check-step">
            <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
            </ul>
        </div>

        <!-- address list -->
        <div class="page-title-normal checkout-title">
            <h2><span>Shipping address</span></h2>
        </div>
        <div class="addr-list-wrap">
            <div class="addr-list">
            <ul>
                <li v-for="(item,index) in addressFilter" :key="item.addressId" :class="{'check': index==checkIndex}" @click="checkIndex = index; selectedAddId=item.addressId">
                <dl>
                    <dt>{{ item.userName }}</dt>
                    <dd class="address">{{ item.streetName }}</dd>
                    <dd class="tel">{{ item.tel }}</dd>
                </dl>
                <div class="addr-opration addr-del" @click="delAddress(item)">
                    <a href="javascript:;" class="addr-del-btn">
                    <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                    </a>
                </div>
                <div class="addr-opration addr-set-default">
                    <a href="javascript:;" class="addr-set-default-btn" @click="setDefaultAddress(item)" v-if="!item.isDefault"><i>Set default</i></a>
                </div>
                <div class="addr-opration addr-default" v-if="item.isDefault">Default address</div>
                </li>
                <li class="addr-new">
                <div class="add-new-inner">
                    <i class="icon-add">
                    <svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
                    </i>
                    <p>Add new address</p>
                </div>
                </li>
            </ul>
            </div>

            <div class="shipping-addr-more">
            <a class="addr-more-btn up-down-btn" href="javascript:;" @click="displayMore" :class="{'open': displayFlag}">
                more
                <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
                </i>
            </a>
            </div>
        </div>

        <!-- shipping method-->
        <div class="page-title-normal checkout-title">
            <h2><span>Shipping method</span></h2>
        </div>
        <div class="lemall-msg-info hidden">
            <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
        </div>
        <div class="shipping-method-wrap">
            <div class="shipping-method">
            <ul>
                <li class="check">
                <div class="name">Standard shipping</div>
                <div class="price">Free</div>
                <div class="shipping-tips">
                    <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                </div>
                </li>
            </ul>
            </div>
        </div>
        <div class="next-btn-wrap">
            <router-link class="btn btn--m btn--red" :to="{ path: 'orderConfirm', query: {'addressId': selectedAddId} }">Next</router-link>
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
import User from '../../server/models/users.js'
import axios from 'axios'
export default {
    data() {
        return {
            addressList: [],
            limit: 3,
            displayFlag: true,
            checkIndex: '',
            selectedAddId: ''
            // defaultAddressList: []
        }
    },
    computed: {
        addressFilter(){
            return this.addressList.slice(0, this.limit)
        }
    },
    mounted() {
        this.getAddressList()
    },
    methods: {
        //请求借口，获取此用户的收货地址列表，用于页面的渲染
        getAddressList() {
            axios.post('users/address').then((res)=>{
                if(res.data.status === 0) {
                    this.addressList = res.data.result
                }
            })
        },
        // 默认展示三条地址，点击more按钮展示更多收货地址
        displayMore() {
            if(this.limit === 3) {
                this.limit = this.addressList.length
                this.displayFlag = false
            } else {
                this.limit = 3
                this.displayFlag = true
            }
        },
        // 设置默认地址
        setDefaultAddress(item) {
            let addressId = item.addressId
            // console.log(addressId)
            axios.get('users/setDefaultAddress', {
                params: {"addressId": addressId}
            }).then((res)=>{
                if(res.data.status === 0) {
                    this.getAddressList()
                }
            })
        },
        // 根据地址id删除地址
        delAddress(item) {
            let addressId = item.addressId
            axios.post('users/delAddress', {
                "addressId": addressId
            }).then((res)=>{
                if(res.data.status === 0) {
                    alert('地址删除成功')
                    this.getAddressList()
                }
            })
        }

    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    }
}
</script>

<style scoped>
    div.addr-del {
        background-color: red;
    }
</style>