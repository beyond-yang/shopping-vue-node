<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': modalVis}">
          <div class="md-modal-inner">
            <div class="md-top">
              <button class="md-close" @click="closeBtn">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <slot name="message"></slot>
              </div>
              <div class="login-wrap">
                <slot name="btnGroup"></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="layVis"></div>
    </div>
</template>

<script>
export default {
    props: ['modalVis', 'layVis'],
    data() {
        return {

        }
    },
    methods: {
        closeBtn() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
    .login-wrap {
        text-align: center;
    }
    .login-wrap .btn {
        width: 200px;
    }
</style>