// 声明周期，在登录完成后执行

import { Note, Infos } from "./api";

function onlogined() {
	Note.getIndex();
	Infos.getInfo();
}
export default onlogined;
