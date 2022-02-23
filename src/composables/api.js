import { post, get, setSessionId } from "./http"

const log = {},
	userInfo = {},
	group = {},
	chum = {}
//首页
const index = () => get("/", {})
//登录
log.in = function (params) {
	return new Promise((resolve, reject) => {
		post("/login", params)
			.then((res) => {
				setSessionId(res)
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
	})
}
// 登出
log.out = () => post("/logout", {})

//用户信息获取
userInfo.get = () => get("/user/get", {})
//用户信息更改
userInfo.post = (params) => post("/user/put", params)

//创建群组
group.create = (groupName) => get("/group/create/" + groupName, {})
//获取所加入群组
group.list = () => get("/group/list/007", {})
//搜索群组
group.search = (groupId) => get("/group/search/" + groupId, {})
//退出群组
group.quit = (groupId) => get("/group/quit/" + groupId, {})

//获取好友列表
chum.list = () => get("/chum/list/007", {})
//删除好友
chum.remove = (chumId) => get("/chum/remove/" + chumId, {})
//搜索好友
chum.search = (chumId) => get("/chum/search/" + chumId, {})

export { index, log, userInfo, group, chum }
