import axios from 'axios'

// 配置项
const axiosOption = {
	headers: {
		'Accept-Language': 'en',
		'Content-Type': 'application/json'
	},
	// baseURL: 'http://128.199.96.41:9124/',
	baseURL: 'https://sdpweb.shop/v1/',
	timeout: 5000
}

// 创建一个单例
const instance = axios.create(axiosOption)

// 添加请求拦截器
instance.interceptors.request.use(
	function (config) {
		let Authorization = localStorage.getItem('Authorization')
		if (Authorization) {
			config.headers = { ...config.headers, Authorization }
		}
		let lang = localStorage.getItem('language-id')
		if (lang) {
			config.headers = { ...config.headers, ...{ 'Accept-Language': lang } }
		}
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	function (response) {
		// 对响应数据做点什么
		return response.data
	},
	function (error) {
		// 对响应错误做点什么
		return Promise.reject(error)
	}
)

export default instance
