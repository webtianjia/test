<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    // https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html
    Component.registerHooks([
        'onLaunch', // 初始化
        'onShow', // 当小程序启动，或从后台进入前台显示
        'onHide', // 当小程序从前台进入后台
        'onError', // 错误监听函数
        'onPageNotFound', // 页面不存在监听函数
        'globalData'
    ]);

    @Component({
        mpType: 'app'
    } as any)
    class App extends Vue {
        private getStatusBarHeight() {
            // @ts-ignore
            Megalo.getSystemInfo().then(response => {
                this.$store.commit("SetStatusBarHeight", response.statusBarHeight + 46)
            })
        }
        private async created() {
            this.getStatusBarHeight();
        }
    }

    export default App
</script>
<style lang="less">
    span, div, p, i, ul, li {
        box-sizing: border-box;
    }

    @import "static/css/style";
    @import "~vant-weapp/dist/common/index.wxss";
    .close-popup {
        position: absolute;
        width: 36px;
        height: 36px;
        z-index: 666;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container {
        background: #f1f1f1;
        min-height: 100vh;
    }

    .fixed-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 15px;
        background: #fff;
    }

    .data-empty {
        position: absolute;
        bottom: -75px;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
    }

    .error-card-position {
        position: fixed;
        top: 50%;
        transform: translate(50%, -50%)
    }

    .sku-list {
        padding: 0 15px;
        background: #fff;
    }
    .p15{
        padding: 15px;
    }
</style>
