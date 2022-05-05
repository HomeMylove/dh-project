/**
 * 封装axios
 */

import axios from 'axios'
// 进度条
import nprogress from 'nprogress'
// 进度条样式
import "nprogress/nprogress.css"


const requests = axios.create({

    // 修改baseurl
    baseURL: "/api",
    // 请求超时
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()

    return res.data
}, (error) => { // 失败回调
    return Promise.reject(new Error("失败，原因是", error))
})


// 对外暴露
export default requests