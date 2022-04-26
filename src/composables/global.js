/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

import { Infos, Note, File } from "./api";

import { socket, Msg, Apply, apply, message } from "./websocket/ws";

import { group } from "./data/group";

import { chum } from "./data/chum";

function global() {
	Note.getIndex();
	File.getIndex();
	socket.init();
	let jj = new Apply("1518909737851162624", 0, 2, "666");
	let dd = apply(jj);
	let hh = new Msg("1518909737851162624", 0, "", 1, "666");
	let nn = message(hh);
	// socket.send(dd, function name(params) {
	// 	console.log("发送完毕");
	// });
	// socket.send(nn, function name(params) {
	// 	console.log("发送完毕");
	// });
	group.getGroups();
	chum.getChums();
}

export default global;
