<template>
    <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
            <title>cart</title>
            <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
            <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
            <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
            <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
            <div class="navbar-left-container">
            <a href="/">
                <img class="navbar-brand-logo" src="../static/logo.png"></a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
                <!--<a href="/" class="navbar-link">我的账户</a>-->
                <span class="navbar-link" style="line-height: 84px">
                    <a href="javascript:void(0)" class="navbar-link" v-show="userlogin" @click="loginshow">Login</a>
                    <a href="javascript:void(0)" class="navbar-link" v-show="loginOut" @click="userloginOut">Logout</a>
                </span>
                
            
                <span class="navbar-cart-count" v-if="cartCount>0"> {{ cartCount }} </span>
                    <a class="navbar-link navbar-cart-link" href="/#/cart">
                    <svg class="navbar-cart-logo" style="height: 30px">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                    </svg>
                </a>
                  
            </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition " :class="{ 'md-show': loginflag }">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginflag=false; layer=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="kong">用户名或密码不能为空</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" v-model="username" name="loginname" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2" v-model="password"  name="password" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show='layer'></div>
        </header>
</template>

<script>
import './../assets/css/login.css'
import axios from 'axios'
export default {
    data() {
        return {
            loginflag: false,
            username: '',
            password: '',
            kong: false,
            layer: false,
            loginOut: false,
            userlogin: true,
            nickName: ''
        }
    },
    mounted() {
      this.checkLogin()
      
    },
    computed: {
      cartCount() {
        return this.$store.state.cartCount
      }
    },
    methods: {
        loginshow() {
            this.loginflag = true
            this.layer = true
        },

        // 点击login按钮，调用接口完成登录功能
        login() {
            if(!this.username || !this.password) {
                this.kong = true
                return
            }
            axios.post('users/login', {
                username: this.username,
                password: this.password
            }).then((res)=>{
                if(res.data.status == 0) {
                    console.log('登录成功')
                    console.log(res.data.result.userName)
                    this.loginflag = false
                    this.layer = false
                    this.loginOut = true
                    this.userlogin = false
                    this.getCartCount()
                }
            })
        },

        // 点击loginOut按钮，调用接口完成退出登录功能
        userloginOut() {
          axios.post('users/loginOut').then((res)=>{
            if(res.data.status == 0) {
              console.log('退出成功')
              this.userlogin = true
              this.loginOut = false
              // this.$store.commit("updateUserInfo", '')
            }
          })
        },

        // 调用接口，查看用户是否登录
        checkLogin() {
          axios.get('users/checkLogin').then((res)=>{
            if(res.data.status == 0) {
              // alert(res.data.msg)
              this.getCartCount()
            } else {
              // alert(res.data.msg)
            }
          })
        },

        // 调用接口，获取购物车商品数量
        getCartCount() {
          axios.get('users/getCartCount').then((res)=>{
            if(res.data.status === 0) {
              console.log(res.data.result)
              this.$store.commit('updateCartCount', res.data.result)
            }
          })
        }

    }
}
</script>

<style scoped>
  /* .navbar-menu-container {
    width: 100px;
  } */
  svg.navbar-cart-logo {
    width: 50px;
  }
  span.navbar-cart-count {
    position: absolute;
    top: 9px;
    left: 60px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: rgba(255,0,0,.6);
    text-align: center;
    line-height: 20px;
    color: #fff;
    border-radius: 50%;
  }
  div.navbar-menu-container {
    position: relative;
  }
</style>