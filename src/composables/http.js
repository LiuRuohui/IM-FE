import axios from "axios"
import QS from "qs"

import { url } from "./env"

const instance = axios.create({
	// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
	// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
	baseURL: url,
	// `timeout` 指定请求超时的毫秒数。
	// 如果请求时间超过 `timeout` 的值，则请求会被中断
	timeout: 1000, // 默认值是 `0` (永不超时)
	// 自定义请求头
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
	},
})

function setSessionId(sessionId) {
	//设置sessionId
	instance.sessionId = sessionId
	// console.log("设置：", instance.sessionId)
}

function getSessionId() {
	return instance.sessionId
}

instance.interceptors.request.use(
	//请求拦截器
	function (config) {
		// 在发送请求之前做些什么
		config.params = {
			sessionId: instance.sessionId,
			//设置sessionId
		}
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		switch (error.response.status) {
			case 401:
				console.log("未登录！")
				break
			case 404:
				console.log("错误路径，资源未找到！")
				break
			case 403:
				console.log("禁止访问！")
				break
			case 405:
				console.log("不支持的方法")
				break
			// case ...
			default:
				console.log("其他错误")
				break
		}
		return Promise.reject(error)
	}
)

function get(url, params) {
	// url参数以对象形式传入
	return new Promise((resolve, reject) => {
		instance
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

function post(url, params) {
	//表单以对象形式传入
	return new Promise((resolve, reject) => {
		instance
			.post(url, QS.stringify(params), {
				headers: {
					// "Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				reject(err.data)
			})
	})
}

export { get, post, setSessionId, getSessionId }
