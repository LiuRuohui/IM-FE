/*
    定义挂载到app.vue的公共执行函数，放置在下方的global中执行
*/

import { Note, File } from "./api";

import { socket, Msg, Apply, apply, message } from "./websocket/ws";

import { group } from "./data/group";

import { chum } from "./data/chum";

import { getMessage } from "./data/message";

import { getApply } from "./data/apply";

function global() {
	Note.getIndex();
	File.getIndex();
	socket.init();
	let jj = new Apply("1519149645450711040", "", 2, "666");
	let dd = apply(jj);
	let hh = new Msg("1519149645450711040", "", "", 1, "666555");
	let nn = message(hh);
	// socket.send(dd, function name(params) {
	// 	console.log("发送完毕");
	// });
	// socket.send(nn, function name(params) {
	// 	console.log("发送完毕");
	// });
	group.getGroups();
	chum.getChums();
	getMessage();
	getApply();
}

export default global;
