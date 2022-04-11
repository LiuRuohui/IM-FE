/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

//需要增加判断是否登录的逻辑判断来执行相关函数

import { session } from "./session"
import { Info, Note } from "./api"

function global() {
	// 初始化session
	session.getSessionId()
	// 初始化info
	Info.getInfo()

	Note.getIndex()
}

export default global
