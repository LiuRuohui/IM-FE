/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

import { Infos, Note, File } from "./api";

import { socket, Msg, Apply, apply, message } from "./websocket/ws";

function global() {
	Note.getIndex();
	File.getIndex();
	socket.init();
	let jj = new Apply("1518775197690236928", 0, 1, "666");
	let dd = apply(jj);
	let hh = new Msg("1518775197690236928", 0, "", 1, "666");
	let nn = message(hh);
	// socket.send(dd, function name(params) {
	// 	console.log("发送完毕");
	// });
	socket.send(nn, function name(params) {
		console.log("发送完毕");
	});
}

export default global;
