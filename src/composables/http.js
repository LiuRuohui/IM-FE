import axios from "axios"

import QS from "qs"

import { url } from "./env"

axios.defaults.baseURL = url
//设置
axios.defaults.timeout = 10000
// 设置请求超时时间
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8"
//   设置默认的header头

axios.interceptors.request.use(
	// 请求拦截器
	(config) => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const token = store.state.token
		token && (config.headers.Authorization = token)
		return config
	},
	(error) => {
		return Promise.error(error)
	}
)

axios.interceptors.response.use(
	(response) => {
		// 响应拦截器
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (response.status === 200) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(response)
		}
	},
	(error) => {
		return Promise.error(error)
	}
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params,
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err.data)
			})
	})
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err.data)
			})
	})
}
