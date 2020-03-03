<template>
    <div class="cart">
        <nav-header></nav-header>
        <div class="page-title-normal">
        <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
        <div class="cart-item">
            <div class="cart-item-head">
            <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
            </ul>
            </div>
            <ul class="cart-item-list">
            <li v-for="(item) in goodsList" :key="item.productId">
                <div class="cart-tab-1">
                <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" :class="{ 'checked': item.checked==1 }" @click="checked(item)">
                    <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                    </svg>
                    </a>
                </div>
                <div class="cart-item-pic">
                    <img :src="'./../static/'+item.productImage">
                </div>
                <div class="cart-item-title">
                    <div class="item-name"> {{ item.productName }} </div>
                </div>
                </div>
                <div class="cart-tab-2">
                <div class="item-price">{{ item.salePrice | currency('$', 2) }}</div>
                </div>
                <div class="cart-tab-3">
                <div class="item-quantity">
                    <div class="select-self select-self-open">
                    <div class="select-self-area change">
                        <a class="input-sub" @click="changeNum('desc', item)">-</a>
                        <span class="select-ipt">{{ item.productNum }}</span>
                        <a class="input-add" @click="changeNum('add', item)">+</a>
                    </div>
                    </div>
                </div>
                </div>
                <div class="cart-tab-4">
                <div class="item-price-total">{{ item.productNum*item.salePrice | currency('$', 2) }}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="productDel(item.productId, item.productNum)">
                      <svg class="icon icon-del del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
            </li>
            </ul>
        </div>
        </div>
        <div class="cart-foot-wrap">
        <div class="cart-foot-inner">
            <div class="cart-foot-l">
            <div class="item-all-check">
                <a href="javascipt:;">
                    <span class="checkbox-btn item-check-btn" :class="{ 'checked': checkedBtn }" @click="selectAll">
                        <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                    </span>
                <span>Select all</span>
                </a>
            </div>
            </div>
            <div class="cart-foot-r">
            <div class="item-total">
                Item total: <span class="total-price">{{ totalPrice | currency('$', 2) }}</span>
            </div>
            <div class="btn-wrap">
                <router-link class="btn btn--red" to="/address">Checkout</router-link>
            </div>
            </div>
        </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import './../assets/css/checkout.css'
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import axios from 'axios'
import { currency } from './../util/currency.js'
export default {
    data() {
        return {
            goodsList: [],
            checkedBtn: true
        }
    },
    mounted() {
        this.getCartGoodList()
    },
    methods: {
        //请求数据接口，拿到userID为***的购物车商品数据，渲染到购物车页面中去
        getCartGoodList() {
            axios.post('users/cartlist').then((res)=>{
                if(res.data.status === 0) {
                    this.goodsList = res.data.result
                    // console.log(this.goodsList)
                }
            })
            
        },
        // 请求接口，删除购物车中的物品
        productDel(productId, productNum) {
            axios.get('users/productDel', {
                params: { productId: productId }
            }).then((res)=>{
                if(res.data.status === 0) {
                    this.getCartGoodList()
                    alert('数据删除成功')
                    this.$store.commit('updateCartCount', -productNum)
                }
            })
        },
        // 实现商品数量修改功能
        changeNum(flag, item) {
            if(flag == 'add') {
                item.productNum++;
            } else if(flag == 'desc' && item.productNum>0) {
                item.productNum--;
            }
            axios.get('users/productNumChange', {
                params: { productNum: item.productNum, productId: item.productId }
            }).then((res)=>{

            })
        },
        // 实现商品选中和取消选中的功能
        checked(item) {
            item.checked = item.checked=='1'?'0':'1'
            let productId = item.productId
            let checked = item.checked
            axios.get('users/productChecked', {
                params: { productId: productId, checked: checked }
            }).then((res)=>{
                // console.log('啦啦啦')
            })
            // 遍历每个商品的checked属性，只要有一个checked为0，selectAll就取消选中
            let flag = true;
            this.goodsList.forEach((item)=>{
                if(parseInt(item.checked) === 0) {
                    this.checkedBtn = false
                    flag = false
                    return
                }
            })
            if(flag) {
                this.checkedBtn = true
            }
        },
        // 实现全选和全不选功能
        selectAll() {
            this.checkedBtn = !this.checkedBtn
            this.goodsList.forEach((item)=>{
                item.checked = this.checkedBtn?'1':'0'
            })
            axios.post('/users/selectedAll', {
                flag: this.checkedBtn
            }).then((res)=>{
                // console.log(res.data.msg)
            })
        }
    },
    components: {
        NavHeader,
        NavFooter
    },
    computed: {
        // 实现商品的时实计算功能
        totalPrice: function () {
            // console.log(this.goodsList)
            let totalPrice = 0
            this.goodsList.forEach((item)=>{
                if(parseInt(item.checked) === 1) {
                    totalPrice+=item.productNum*item.salePrice
                }
            })
            return totalPrice
        }
    },
    filters: {
        currency: currency
    }
}
</script>

<style scoped>
    .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
  svg.del {
      background-color: blue;
  }
  .checked {
      background-color: orangered;
  }
</style>