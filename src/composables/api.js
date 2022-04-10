import { http } from "./http"
import { session } from "./session"

//引入自定义路由
import router from "../router/router"

//引入用户信息
import { info } from "/src/composables/data/info"
import { note } from "./data/note"
//处理登录相关
const Log = {}
// 处理用户信息
const Info = {}
// 处理笔记相关
const Note = {}
/***

    登陆函数声明

***/

//登录函数，传入账号和密码
Log.in = logIn

//登出函数
Log.out = logout

//注册函数，传入账号和密码
Log.register = register

/***

    用户信息函数声明

***/

//重新获取用户信息
Info.getInfo = info.getInfo

/***

    用户信息函数声明

***/

Note.getIndex = note.getIndex

/*** 

    登录函数定义

***/

//登录函数，传入账号和密码
function logIn(account, passwd) {
	http.post(
		"/account/login",
		{
			account,
			passwd,
		},
		""
	).then(
		(data) => {
			session.setSessionId(data)
			console.log("登录成功", data)
			//登录成功后跳转到首页
			router.push({
				name: "setting",
			})
		},
		(error) => {
			console.log("登录失败", error)
		}
	)
}

//登出函数
function logout() {
	http.post("/account/logout", {}, "").then(
		(data) => {
			console.log("登出成功", data)
			//登录成功后跳转到首页
			router.push({
				name: "login",
			})
		},
		(error) => {
			console.log("登出失败", error)
		}
	)
}

//注册函数
function register(account, passwd) {
	http.post(
		"/account/register",
		{
			account,
			passwd,
		},
		""
	).then(
		(data) => {
			console.log("注册成功", data)
			//登录成功后跳转到首页
			router.push({
				name: "login",
			})
		},
		(error) => {
			console.log("注册失败", error)
		}
	)
}

export { Log, Info, Note }
