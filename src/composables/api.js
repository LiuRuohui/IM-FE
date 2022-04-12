import { http } from "./http";
import { session } from "./session";
import onlogined from "./onlogined";
//引入自定义路由
import router from "../router/router";

//引入用户信息
import { info } from "/src/composables/data/info";
import { note } from "./data/note";
//处理登录相关
const Log = {};
// 处理用户信息
const Infos = {};
// 处理笔记相关
const Note = {};
/***

        登陆函数声明

    ***/

//登录函数，传入账号和密码
Log.in = logIn;

//登出函数
Log.out = logout;

//注册函数，传入账号和密码
Log.register = register;

/***

    用户信息函数声明

***/

//重新获取用户信息
Infos.getInfo = info.getInfo;
Infos.postName = postName;
Infos.postSex = postSex;
Infos.postSignature = postSignature;
Infos.postPhone = postPhone;
Infos.postMail = postMail;
Infos.postSite = postSite;
Infos.postGithub = postGithub;
Infos.postWeibo = postWeibo;
Infos.postQq = postQq;
/***

        用户信息函数声明

    ***/

Note.getIndex = note.getIndex;
Note.getContent = note.getContent;
Note.updateContent = note.updateContent;
Note.updateTitle = note.updateTitle;
Note.create = note.create;

/*** 

    登录函数定义

***/

//登录函数，传入账号和密码
async function logIn(account, passwd) {
	await http
		.post(
			"/account/login",
			{
				account,
				passwd,
			},
			""
		)
		.then(
			(data) => {
				session.setSessionId(data);
				console.log("登录成功", data);
				//登录成功后跳转到首页
				router.push({
					name: "setting",
				});
			},
			(error) => {
				console.log("登录失败", error);
			}
		);
	onlogined();
}

//登出函数
function logout() {
	http.post("/account/logout", {}, "").then(
		(data) => {
			console.log("登出成功", data);
			//登录成功后跳转到首页
			router.push({
				name: "login",
			});
		},
		(error) => {
			console.log("登出失败", error);
		}
	);
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
			console.log("注册成功", data);
			//登录成功后跳转到首页
			router.push({
				name: "login",
			});
		},
		(error) => {
			console.log("注册失败", error);
		}
	);
}

//post函数 由于info和Info易混 且url不同 params无法设置 故抽象一层
function postName(url, values) {
	http.post(url, { name: values }, "").then(
		(data) => {
			console.log("提交昵称成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交昵称失败", error);
		}
	);
}

function postSex(url, values) {
	http.post(url, { sex: values }, "").then(
		(data) => {
			console.log("提交性别成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交性别失败", error);
		}
	);
}

function postSignature(url, values) {
	http.post(url, { signature: values }, "").then(
		(data) => {
			console.log("提交签名成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交签名失败", error);
		}
	);
}

function postPhone(url, values) {
	http.post(url, { phone: values }, "").then(
		(data) => {
			console.log("提交电话成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交电话失败", error);
		}
	);
}

function postMail(url, values) {
	http.post(url, { mail: values }, "").then(
		(data) => {
			console.log("提交邮箱成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交邮箱失败", error);
		}
	);
}

function postSite(url, values) {
	http.post(url, { site: values }, "").then(
		(data) => {
			console.log("提交网站成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交网站失败", error);
		}
	);
}

function postGithub(url, values) {
	http.post(url, { github: values }, "").then(
		(data) => {
			console.log("提交Github成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交Github失败", error);
		}
	);
}

function postWeibo(url, values) {
	http.post(url, { weibo: values }, "").then(
		(data) => {
			console.log("提交Weibo成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交Weibo失败", error);
		}
	);
}

function postQq(url, values) {
	http.post(url, { qq: values }, "").then(
		(data) => {
			console.log("提交qq成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交qq失败", error);
		}
	);
}

export { Log, Infos, Note };
