// 声明周期，在登录完成后执行

import { Note, Infos, File } from "./api";

function onlogined() {
    Note.getIndex();
    Infos.getInfo();
    File.getIndex();
}
export default onlogined;