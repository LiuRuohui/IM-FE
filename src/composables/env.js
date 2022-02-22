/*
定义版本号等最基础信息！
*/

const env = "dev"
// development 开发版本 dev
// production 生产版本 pro
let url
switch (env) {
	case "dev":
		url = "http://im.jinzh.me/"
		break
	case "pro":
		url = "http://127.0.0.1:8000"
		break
}
export { url }
