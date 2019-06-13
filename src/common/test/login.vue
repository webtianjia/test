<template>
    <div class="login">
        <div class="custom-head" :style="{height:BarHeight+'px'}">
            <van-nav-bar z-index="999" fixed title-class="van-nav-bar-title" custom-class="van-nav-bar" title="登录"
                         :left-arrow="false"></van-nav-bar>
        </div>
        <van-cell-group>
            <van-field @change="setMobileText($event)" type="number" maxlength="12" :value="mobile" label="手机号"
                       placeholder="请输入手机号" clearable/>
            <van-field @change="setValidateCodeText($event)" :value="validateCode" label="验证码" placeholder="请输入验证码"
                       use-button-slot clearable maxlength="6" type="number">
                <van-button slot="button" size="small" plain hairline @click="sendLoginCode">获取验证码</van-button>
            </van-field>
        </van-cell-group>
        <div class="fixed-footer">
            <van-button type="danger" block :disabled="isSubmit" @click="login" loading-text="正在登录..."
                        :loading="loading">立即登录
            </van-button>
            <p class="link-text"><span class="text" @click="goTo('common/register')">暂无账号，去注册</span>
                <van-icon name="arrow" custom-class="arrow"/>
            </p>
        </div>
    </div>
</template>
<config>
    {
    "navigationStyle":"custom",
    "navigationBarTextStyle": "white",
    "disableScroll": true
    }
</config>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import {goTo, showTotal} from "@/static/utils"
    import {State} from 'vuex-class'

    @Component
    export default class Login extends Vue {
        private mobile: string = '';
        private validateCode: string = '';
        @State BarHeight;
        private loading: boolean = false;

        private get isSubmit(): boolean {
            return this.mobile.trim() && this.validateCode.trim() ? false : true
        }

        private goTo: any = goTo;

        private setMobileText(e) {
            this.mobile = e.detail
        }

        private setValidateCodeText(e) {
            this.validateCode = e.detail
        }

        private sendLoginCode() {
            if (/^1[345789]\d{9}$/.test(this.mobile.trim())) {
                this.$store.dispatch("GetLoginVerificationCode", this.mobile).then(() => {
                    showTotal({
                        title: "验证码发送成功！"
                    })
                }).catch(error => {
                    console.log(error)
                })
            } else {
                showTotal({
                    title: "请输入正确手机号"
                })
            }
        }

        private validate() {
            let title;
            if (!/^1[345789]\d{9}$/.test(this.mobile.trim())) {
                title = "请输入正确手机号"
            } else if (this.validateCode.toString().length < 6) {
                title = "请输入正确验证码"
            }
            if (title) {
                showTotal({title});
                return false
            }
            return true
        }

        private login() {
            if (this.loading || !this.validate()) return;
            this.loading = true;
            // @ts-ignore
            Megalo.login().then(response => {
                this.$store.dispatch('Login', {
                    mobile: this.mobile,
                    validateCode: this.validateCode,
                    jsCode: response.code
                }).then((response) => {
                    if (response.success) {
                        showTotal({
                            title: "登录成功"
                        });
                        this.loading = false;
                        this.goTo("/pages/selectedProducts/selectedProducts")
                    }
                }).catch(error => {
                    this.loading = false;
                    console.log(error)
                })
            }).catch(error => {
                this.loading = false;
                console.log(error)
            })
        }
    }
</script>
<style lang="less">
    .link-text {
        text-align: center;
        font-size: 15px;
        margin-top: 20px;
        .text {
            vertical-align: middle;
            color: #ff4546;
        }
        .arrow {
            vertical-align: middle;
            margin-top: 1px;
            color: #ff4546;
        }
    }
</style>
<style lang="less" scoped>
    .custom-head {
        height: 64px;
    }
    .btn-container {
        bottom: 40px;
    }
</style>
