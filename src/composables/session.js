/*
创建session.js 存在一个对象两个方法分别为读取和修改 外部不暴露session 通过对象的方法访问 暴露对象在外
 */

// 创建session，通过localstroage获取
var sessionId = localStorage.getItem("Session-Id");

var session = {};

//方法设置sessionId
session.setSessionId = function (tmp) {
	//设置sessionId
	sessionId = tmp;
	localStorage.setItem("Session-Id", tmp);
};

// 方法获取sessionId
session.getSessionId = function () {
	return sessionId;
};

export { session };
