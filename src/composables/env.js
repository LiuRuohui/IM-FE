/*
定义版本号等最基础信息！
*/

const env = "pro"
// development 开发版本 dev
// production 生产版本 pro
let url
let wsUrl
switch (env) {
	case "dev":
		url = "http://im.jinzh.me/"
		wsUrl = url + "websocket"
		break
	case "pro":
		url = "http://127.0.0.1:8000/"
		wsUrl = url + "websocket"
		break
}
export { url, wsUrl }
