import officeSvg from "../assets/filesvg/Office.svg";
import musicSvg from "../assets/filesvg/music.svg";
import pdfSvg from "../assets/filesvg/pdf.svg";
import jpgSvg from "../assets/filesvg/jpg.svg";
import videoSvg from "../assets/filesvg/video.svg";
import textSvg from "../assets/filesvg/text.svg";
import zipSvg from "../assets/filesvg/zip.svg";
import defaultSvg from "../assets/filesvg/default.svg";
import xlsxSvg from "../assets/filesvg/xlsx.svg";
import pptSvg from "../assets/filesvg/ppt.svg";
//用户名要求，四到十位英文数字混合
const accountRegexp = /^[a-zA-Z0-9_]{4,10}$/;

//密码要求，英文数字（可为纯英文和纯数字），6-20位
const passwdRegexp = /^[0-9A-Za-z]{6,20}$/;

//防抖函数
function debounce(fn, delay) {
    let timer;
    return function() {
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
function determineImg(fileName) {
    // 截取文件后缀
    const suffix = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length)
    if (suffix == 'zip') {
        return zipSvg
    } else if (suffix == 'docx' || suffix == 'doc') {
        return officeSvg
    } else if (suffix == 'jpg') {
        return jpgSvg
    } else if (suffix == 'pdf') {
        return pdfSvg
    } else if (suffix == 'mp4') {
        return videoSvg
    } else if (suffix == 'txt') {
        return textSvg
    } else if (suffix == 'xlsx') {
        return xlsxSvg
    } else if (suffix == 'mp3') {
        return musicSvg
    } else if (suffix == 'ppt') {
        return pptSvg
    } else {
        return defaultSvg
    }
}

function determineVue(fileName) {
    // 截取文件后缀
    const suffix = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length)
    if (suffix == 'docx' || suffix == 'doc' || suffix == 'xlsx' || suffix == 'ppt') {
        return 1
    } else if (suffix == 'jpg') {
        return 5
    } else if (suffix == 'mp4') {
        return 6
    } else if (suffix == 'txt') {
        return 2
    } else if (suffix == 'mp3') {
        return 3
    } else {
        return 4
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
    determineVue,
    Storage,
};