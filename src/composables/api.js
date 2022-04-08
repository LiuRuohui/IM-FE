import { http } from "./http"

import router from "../router/router"
import { info } from "/src/composables/data/info"

const Log = {}
//处理登录相关
const Info = {}
//处理用户信息相关
Info.getInfo = info.getInfo

export { Log, Info }
