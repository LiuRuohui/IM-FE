/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

import { Infos, Note, File } from "./api";

function global() {
	Note.getIndex();
	File.getIndex();
}

export default global;
