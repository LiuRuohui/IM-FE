/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

//需要增加判断是否登录的逻辑判断来执行相关函数

import { Infos, Note, File } from "./api";

function global() {
	// 初始化info
	Infos.getInfo();

	Note.getIndex();

	File.getIndex();
}

export default global;
