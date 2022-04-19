import Officesvg from "../assets/filesvg/Office.svg";
import Musicsvg from "../assets/filesvg/music.svg";
import Pdfsvg from "../assets/filesvg/pdf.svg";
import Jpgsvg from "../assets/filesvg/jpg.svg";
import Videosvg from "../assets/filesvg/video.svg";
import Textsvg from "../assets/filesvg/text.svg";
import Zipsvg from "../assets/filesvg/zip.svg";
import Defaultsvg from "../assets/filesvg/default.svg";
import Xlsxsvg from "../assets/filesvg/xlsx.svg";
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

//文件大小转换
function fileSize(size) {
	let unit = ["B", "KB", "MB", "GB"];
	let index = 0;
	while (size >= 1024) {
		size /= 1024;
		index++;
	}
	return size.toFixed(2) + unit[index];
}

//文件图像函数 判断传入参数 若符合相应的svg则返回对应的svg图像渲染
function determineImg(fileType, fileName) {
	if (fileType == "application/octet-stream") {
		return Textsvg;
	} else if (fileType == "application/zip") {
		if (fileName.indexOf("txt") != -1) {
			return Textsvg;
		} else if (fileName.indexOf("docx") != -1) {
			return Officesvg;
		} else if (fileName.indexOf("xlsx") != -1) {
			return Xlsxsvg;
		} else {
			return Zipsvg;
		}
	} else if (fileType == "application/pdf") {
		return Pdfsvg;
	} else if (fileType == "image/jpeg") {
		return Jpgsvg;
	} else {
		return Defaultsvg;
	}
}

class Storage {
	constructor(props) {
		this.props = props || {};
		this.source = this.props.source || window.localStorage;
		this.initRun();
	}
	initRun() {
		/*
		 * set 存储方法
		 * @ param {String}     key 键
		 * @ param {String}     value 值，存储的值可能是数组/对象，不能直接存储，需要转换 JSON.stringify
		 * @ param {String}     expired 过期时间，以分钟为单位
		 */
		const reg = new RegExp("__expires__");
		let data = this.source;
		let list = Object.keys(data);
		if (list.length > 0) {
			list.map((key, v) => {
				if (!reg.test(key)) {
					let now = Date.now();
					let expires = data[`${key}__expires__`] || Date.now() + 1;
					if (now >= expires) {
						this.remove(key);
					}
				}
				return key;
			});
		}
	}

	set(key, value, expired) {
		/*
		 * set 存储方法
		 * @ param {String}     key 键
		 * @ param {String}     value 值，
		 * @ param {String}     expired 过期时间，以毫秒为单位，非必须
		 */
		let source = this.source;
		source[key] = JSON.stringify(value);
		if (expired) {
			source[`${key}__expires__`] = Date.now() + expired;
		}
		return value;
	}

	get(key) {
		/*
		 * get 获取方法
		 * @ param {String}     key 键
		 * @ param {String}     expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
		 */
		const source = this.source,
			expired = source[`${key}__expires__`] || Date.now() + 1;
		const now = Date.now();

		if (now >= expired) {
			this.remove(key);
			return;
		}
		const value = source[key] ? JSON.parse(source[key]) : source[key];
		return value;
	}

	remove(key) {
		const data = this.source,
			value = data[key];
		delete data[key];
		delete data[`${key}__expires__`];
		return value;
	}
}

export {
	debounce,
	accountTest,
	passwdTest,
	dateFormat,
	delHtmlTag,
	fileSize,
	determineImg,
	Storage,
};
