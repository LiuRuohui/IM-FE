/*
	定义封装好的http请求方法
*/

import axios from "axios";
import QS from "qs";
import router from "../router/router";
import { session } from "/src/composables/session";
import { url } from "./gateway";

const instance = axios.create({
    // `timeout` 指定请求超时的毫秒数。
    timeout: 3000, // 默认值是 `0` (永不超时)
    // 自定义请求头
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "text", //设置接收的编码
    responseEncoding: "utf8", //设置默认解码
});

// 请求拦截器
instance.interceptors.request.use(
    //请求拦截器
    function(config) {
        // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
        config.baseURL = url;
        config.headers["Session-Id"] = session.getSessionId();
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 相应拦截器
instance.interceptors.response.use(
    function(response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    },
    function(error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        switch (error.response.status) {
            case 401:
                console.log("未登录！");
                router.push({
                    name: "login",
                });
                break;
            case 403:
                console.log("禁止访问！");
                break;
            case 404:
                console.log("错误路径，资源未找到！");
                router.push({
                    name: "home",
                });
                break;
            case 405:
                console.log("不支持的方法");
                break;
                // case ...
            default:
                console.log("出现错误");
                break;
        }
        // return Promise.reject(error)
    }
);

//封装好对外暴露的http对象
const http = {};

// 封装好的get方法
http.get = function(url, params) {
    //这里的sessionId可以用来添加token
    return new Promise((resolve, reject) => {
        instance
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
};

// 封装好的post方法
http.post = function(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, QS.stringify(params), {
                //这里使用qs来对project进行转码，使之成为表单内容
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
};

//适配file的Content-Type
http.post1 = function(url, params) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, QS.stringify(params), {
                //这里使用qs来对project进行转码，使之成为表单内容
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
};

export { instance, http };