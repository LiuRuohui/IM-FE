// 声明周期，在登录完成后执行

import { Note, Infos, File } from "./api";

import { socket } from "./websocket/ws";

function onlogined() {
	Note.getIndex();
	Infos.getInfo();
	File.getIndex();
	socket.init();
}
export default onlogined;
