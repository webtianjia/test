import App from './App.vue'
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'

Vue.use(VHtmlPlugin)
Vue.use(Vuex)
import megaloRouter from 'megalo-router'

Vue.use(megaloRouter, {
    mode: 'strict', // strict or loose 可配置项，不配置的话默认为strict
    tabBars: [ // 必须配置项
        '/pages/selectedProducts/selectedProducts',
        '/pages/myStore/myStore',
        '/pages/order/orderList',
        '/pages/mySku/mySku'
    ]
})

const store = require('./store').default
Vue.prototype.$store = store

// https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
Component.registerHooks([
    'onLoad', // 监听页面加载
    'onShow', // 监听页面显示
    'onReady', // 监听页面初次渲染完成
    'onHide', // 监听页面隐藏
    'onUnload', // 监听页面卸载
    'onPullDownRefresh', // 监听用户下拉动作
    'onReachBottom', // 页面上拉触底事件的处理函数
    'onShareAppMessage', // 用户点击右上角分享
    'onPageScroll', // 页面滚动
    'onTabItemTap' // 当前是 tab 页时， 点击 tab 时触发
])
const app = new Vue(App)

app.$mount()

export default {
    config: {
        // pages 的首个页面会被编译成首页
        pages: [
            "pages/selectedProducts/selectedProducts",
            "pages/myStore/myStore",
            "pages/mySku/mySku",
            "pages/order/orderList",
            //"common/login"//正确 但是加上分包报错
        ],
        subPackages: [ //错误
            {
                root: "common",
                pages: [
                    'login',
                    'test/login'
                ]
            }
        ],
        tabBar: {
            color: '#666',
            selectedColor: '#ff4546',
            list: [
                {
                    pagePath: 'pages/mySku/mySku',
                    text: '我的商品',
                    iconPath: 'native/tabbar/home.png',
                    selectedIconPath: 'native/tabbar/home-ac.png'
                },
                {
                    pagePath: 'pages/selectedProducts/selectedProducts',
                    text: '选品中心',
                    iconPath: 'native/tabbar/selectionCenter.png',
                    selectedIconPath: 'native/tabbar/selectionCenter-ac.png'
                },
                {
                    pagePath: 'pages/order/orderList',
                    text: '订单',
                    iconPath: 'native/tabbar/order.png',
                    selectedIconPath: 'native/tabbar/order-ac.png'
                },
                {
                    pagePath: 'pages/myStore/myStore',
                    text: '我的店',
                    iconPath: 'native/tabbar/my.png',
                    selectedIconPath: 'native/tabbar/my-ac.png'
                }
            ]
        },
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '',
            navigationBarTextStyle: 'black'
        },
        "usingComponents": {
            "van-nav-bar": "/native/vant-weapp/dist/nav-bar/index",
            "van-notice-bar": "/native/vant-weapp/dist/notice-bar/index",
            "van-tab": "/native/vant-weapp/dist/tab/index",
            "van-tabs": "/native/vant-weapp/dist/tabs/index",
            "van-button": "/native/vant-weapp/dist/button/index",
            "van-cell": "/native/vant-weapp/dist/cell/index",
            "van-cell-group": "/native/vant-weapp/dist/cell-group/index",
            "van-icon": "/native/vant-weapp/dist/icon/index",
            "van-field": "/native/vant-weapp/dist/field/index",
            "van-stepper": "/native/vant-weapp/dist/stepper/index",
            "van-popup": "/native/vant-weapp/dist/popup/index",
            "van-collapse": "/native/vant-weapp/dist/collapse/index",
            "van-collapse-item": "/native/vant-weapp/dist/collapse-item/index",
            "van-goods-action": "/native/vant-weapp/dist/goods-action/index",
            "van-goods-action-icon": "/native/vant-weapp/dist/goods-action-icon/index",
            "van-goods-action-button": "/native/vant-weapp/dist/goods-action-button/index",
            "van-submit-bar": "/native/vant-weapp/dist/submit-bar/index",
            "van-panel": "/native/vant-weapp/dist/panel/index",
            "van-search": "/native/vant-weapp/dist/search/index",
            "van-row": "/native/vant-weapp/dist/row/index",
            "van-col": "/native/vant-weapp/dist/col/index",
            "van-tag": "/native/vant-weapp/dist/tag/index",
            "van-checkbox": "/native/vant-weapp/dist/checkbox/index"
        }
    }
}
