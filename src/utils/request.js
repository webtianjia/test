import Fly from 'flyio/dist/npm/wx'

let fly = new Fly();
import store from '../store'
import {getToken} from '@/utils/auth'
import {ajaxUrl, wechatCode} from '@/utils/url'
import {showTotal ,showModal} from "@/static/utils"

fly.config = {
    baseURL: ajaxUrl,
    timeout: 3000,
    headers: {
        "content-type": "application/json",
        wechatCode
    }
};
// request拦截器
fly.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['sessionId'] = getToken()
    }
    return config
}, error => {

    console.log(error)
    Promise.reject(error)
})

// respone拦截器
fly.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 200) {
            showTotal({
                title: res.msg,
                duration: 3 * 1000
            });
            // 401:未登录;
            if (res.code === 401 || res.code === 403) {
                showModal({
                    title: '确定登出',
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    confirmText: '重新登录',
                    cancelText: '取消',
                    success(res) {
                        if (res.confirm) {
                            store.dispatch('FedLogOut').then((response) => {
                                if (response.success) {
                                    wx.reLaunch({url: '/common/login'})
                                }
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    error => {
        showTotal({
            title: '网络异常，请稍后再试',
            duration: 3 * 1000
        });
        return Promise.reject(error)
    }
);

export default fly
