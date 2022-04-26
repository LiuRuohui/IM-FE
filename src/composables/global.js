/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

import { Infos, Note, File } from "./api";

import { socket } from "./websocket/ws";

function global() {
	Note.getIndex();
	File.getIndex();
	socket.init();
}

export default global;
