/*
创建session.js 存在一个对象两个方法分别为读取和修改 外部不暴露session 通过对象的方法访问 暴露对象在外
 */
import { Storage } from "./tool";

//localStorage
const ls = new Storage();

//有效时间为： 1.5小时
const expired = 1.5 * 60 * 60 * 1000;

//对外暴露的session对象
var session = {};

//方法设置sessionId
session.setSessionId = function (value) {
	//设置sessionId
	ls.set("Session-Id", value, expired);
};

// 方法获取sessionId
session.getSessionId = function () {
	return ls.get("Session-Id");
};

export { session };
