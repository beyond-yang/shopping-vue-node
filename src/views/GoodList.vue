<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="goods">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" @click="priceChange" class="price">Price <svg  class="icon icon-arrow-short sort-up"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="priceShow">Filter by</a>
            </div>
            <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{ 'filterby-show': filterBy}" >
                <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" @click="priceChecked='all'" :class="{ 'cur': priceChecked=='all'}">All</a></dd>
                <dd v-for="(item, index) in priceFilter" :key="item.startPrice">
                    <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur': priceChecked==index}">{{ item.startPrice }}~{{ item.endPrice}}</a>
                </dd>
                </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                <ul>
                    <li v-for="item in goodsList" :key="item.id">
                    <div class="pic">
                        <a href="#"><img v-lazy="'./../static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                        <div class="name">{{ item.productName }}</div>
                        <div class="price">{{ item.salePrice }}</div>
                        <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                        </div>
                    </div>
                    </li>
                    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                        <img src="./../static/loading-svg/loading-spin.svg" alt="" v-show="loading">
                    </div>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
        <modal :modalVis="sucModalVis" :layVis="sucLayVis" @close="closeModal">
            <p slot="message">
               <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入购物车成功!</span>
            </p>
            <div slot="btnGroup" class="twoBox">
                <a href="javascript:;" class="btn btn--m" @click="sucModalVis=false; sucLayVis=false">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
            </div>
        </modal>
        <modal :modalVis="modalVis" :layVis="layVis" @close="closeModal">
            <p slot="message">
                请先登录，否则无法加入到购物车中
            </p>
            <div slot="btnGroup">
                <a href="javascript:;" class="btn btn--m" @click="modalVis=false; layVis=false">关 闭</a>
            </div>
        </modal>
    </div>
</template>

<script>
import '../assets/css/base.css'
import '../assets/css/product.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import Modal from '@/components/Modal.vue'
import axios from 'axios'
var count = 0
export default {
    data() {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '1500.00'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false,
            sort: true,
            page: 1,
            pageSize: 4,
            busy: false,
            loading: true,
            modalVis: false,
            layVis: false,
            sucModalVis: false,
            sucLayVis: false
        }
    },
    mounted() {
        this.getGoodsList()
    },
    methods: {
        // 点击排序按钮，进行排序
        priceChange() {
            this.sort = !this.sort
            this.page = 1
            this.getGoodsList()
        },
        // 调用接口，获取goods数据
        getGoodsList(flag) {
            let params = {
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sort?1:-1,
                priceLevel: this.priceChecked
            }
            this.loading = true
            axios.get('goods/list', {
                params: params
            }).then((res)=>{
                this.loading = false
                if(flag) {
                    this.goodsList = this.goodsList.concat(res.data.result.list)
                } else {
                    this.goodsList = res.data.result.list
                }
                
                // console.log(res.data)
            })
        },
        // 实现加入购物车功能
        addCart(id) {
            axios.post('goods/addCart', { productId: id })
            .then((res)=>{
               if(res.data.status === 0) {
                //    console.log(res.data)
                //    console.log('加入购物车成功')
                    // alert('加入购物车成功')
                    // console.log('加入购物车成功')
                    this.sucModalVis = true   
                    this.sucLayVis = true
                    this.$store.commit("updateCartCount", 1)
               } else {
                //    alert('加入购物车失败')
                   this.modalVis = true
                   this.layVis = true
               }
            })
            // .catch((err)=>{
            //     console.log(err)
            // })
        
            
        },
        priceShow() {
            this.filterBy = true,
            this.overLayFlag = true
        },
        closePop() {
            this.filterBy = false,
            this.overLayFlag = false
        },
        // 俺价格区间显示商品页面
        setPriceFilter(index) {
            this.priceChecked = index
            this.filterBy = false
            this.overLayFlag = false
            this.page = 1,
            this.getGoodsList()
            // console.log(this.priceChecked)
        },
        // 管理分页插件的函数
        loadMore() {
            
            this.busy = true;
 
            setTimeout(() => {
                this.page++
                this.getGoodsList(true)
                this.busy = false;
            }, 1000);
        },
        // 实现点击 x 按钮，关闭模态框功能
        closeModal() {
            this.modalVis = false
            this.layVis = false
            this.sucLayVis = false
            this.sucModalVis = false
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread,
        Modal
    }
}
</script>

<style scoped>
    .twoBox {
        display: flex;
        justify-content: space-between
    }
</style>
