import { post, get } from "./http"

const log = {},
	userInfo = {},
	group = {},
	chum = {}

const index = (sessionId) => get("/", {}, sessionId)
//首页
log.in = (params, sessionId = "") => post("/login", params, sessionId)
//登录
log.out = (sessionId) => post("/logout", {}, sessionId)
// 登出

userInfo.get = (sessionId) => get("/user/get", {}, sessionId)
//用户信息获取
userInfo.post = (params, sessionId) => post("/user/put", params, sessionId)
//用户信息更改

group.create = (groupName, sessionId) => get("/group/create/" + groupName, {}, sessionId)
//创建群组
group.list = (sessionId) => get("/group/list/007", {}, sessionId)
//获取所加入群组
group.search = (groupId, sessionId) => get("/group/search/" + groupId, {}, sessionId)
//搜索群组
group.quit = (groupId, sessionId) => get("/group/quit/" + groupId, {}, sessionId)
//退出群组

chum.list = (sessionId) => get("/chum/list/007", {}, sessionId)
//获取好友列表
chum.remove = (chumId, sessionId) => get("/chum/remove/" + chumId, {}, sessionId)
//删除好友
chum.search = (chumId, sessionId) => get("/chum/search/" + chumId, {}, sessionId)
//搜索好友
export { index, log, userInfo, group, chum }
