//用户名要求，四到十位英文数字混合
const accountRegexp = /^[a-zA-Z0-9_]{4,10}$/;

//密码要求，英文数字（可为纯英文和纯数字），6-20位
const passwdRegexp = /^[0-9A-Za-z]{6,20}$/;

//防抖函数
function debounce(fn, delay) {
	let timer;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn();
		}, delay);
	};
}

// 判断用户名是否符合要求
function accountTest(params) {
	return accountRegexp.test(params);
}

// 判断密码是否符合要求
function passwdTest(params) {
	return passwdRegexp.test(params);
}

// 时间戳转为时间
// 可能有用
function dateFormat(timestamp) {
	timestamp = timestamp ? timestamp : null;
	let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + "-";
	let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
	let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
	let h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
	let m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
	let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	// return Y + M + D + h + m + s
	return Y + M + D;
}

//去掉所有的html标记
function delHtmlTag(str) {
	return str.replace(/<[^>]+>/g, "").replace(/^\s+|\s+$/g, "");
}

export { debounce, accountTest, passwdTest, dateFormat, delHtmlTag };
