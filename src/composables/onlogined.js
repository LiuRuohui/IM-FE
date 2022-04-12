// 声明周期，在登录完成后执行

import { Note } from "./api";

function onlogined() {
	Note.getIndex();
}
export default onlogined;
