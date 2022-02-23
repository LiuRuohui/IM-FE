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

function get(url, params, sessionId) {
	// url参数以对象形式传入
	params.sessionId = sessionId
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

function post(url, params, sessionId) {
	//表单以对象形式传入
	return new Promise((resolve, reject) => {
		instance
			.post(url, QS.stringify(params), {
				params: { sessionId: sessionId },
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

export { get, post }
