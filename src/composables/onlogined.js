// 声明周期，在登录完成后执行

import { Note, Infos, File } from "./api";

import { socket } from "./websocket/ws";
import { group } from "./data/group";

import { chum } from "./data/chum";

import { getMessage } from "./data/message";

import { getApply } from "./data/apply";

function onlogined() {
	Note.getIndex();
	Infos.getInfo();
	File.getIndex();
	group.getGroups();
	chum.getChums();
	getMessage();
	socket.init();
	getApply();
}
export default onlogined;
