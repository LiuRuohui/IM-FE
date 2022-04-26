import { toRef } from "vue";

import { http } from "./http";
import { session } from "./session";
import onlogined from "./onlogined";
//引入自定义路由
import router from "../router/router";

// 引入模态框
import { Dialog } from "./modelDialog";

//引入用户信息
import { info } from "./data/info";
import { note } from "./data/note";
import { file } from "./data/file";
import { group } from "./data/group";
import { chum } from "./data/chum";
//处理登录相关
const Log = {};
// 处理用户信息
const Infos = {};
// 处理笔记相关
const Note = {};
// 处理文件相关
const File = {};
// 认证接口
const Auth = {
	status: true,
};
// 群组
const Group = {};
// 好友
const Chum = {};
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
Infos.updateAccount = updateAccount;
Infos.updatePasswd = updatePasswd;
Infos.data = function () {
	return toRef(info, "data");
};
/***

        用户信息函数声明

    ***/

Note.getIndex = note.getIndex;
Note.getContent = note.getContent;
Note.updateContent = note.updateContent;
Note.updateTitle = note.updateTitle;
Note.create = note.create;
Note.del = note.del;
Note.data = function () {
	return toRef(note, "data");
};

File.upload = file.upload;
File.getIndex = file.getIndex;
File.getContent = file.getContent;
File.updateName = file.updateName;
File.del = file.del;
File.data = function () {
	return file.data;
};

Group.data = function () {
	return toRef(group, "data");
};

Chum.data = function () {
	return toRef(chum, "data");
};
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
				Dialog.custom().fire({
					timer: 1250,
					icon: "success",
					titleText: "登陆成功，即将跳转",
					didClose() {
						router.push({
							name: "setting",
						});
					},
				});
				onlogined();
				//登录成功后跳转到首页
			},
			(error) => {
				console.log("登录失败", error);
				Dialog.custom().fire({
					timer: 3000,
					icon: "error",
					titleText: "登陆失败，请检查账号密码是否正确",
				});
			}
		);
}

//登出函数
function logout() {
	http.post("/account/logout", {}).then(
		(data) => {
			console.log("登出成功", data);
			//登录成功后跳转到首页
			Dialog.custom().fire({
				timer: 1250,
				icon: "success",
				titleText: "登出成功，即将跳转",
				didClose() {
					router.push({
						name: "login",
					});
				},
			});
		},
		(error) => {
			console.log("登出失败", error);
			Dialog.warnToast("登出失败，请检查网络！");
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
			Dialog.custom().fire({
				timer: 1250,
				icon: "success",
				titleText: "注册成功，即将跳转",
				didClose() {
					router.push({
						name: "login",
					});
				},
			});
		},
		(error) => {
			console.log("注册失败", error);
			Dialog.errorToast("注册失败，请重新尝试！");
		}
	);
}

//post函数 由于info和Info易混 且url不同 params无法设置 故抽象一层
function postName(url, values) {
	http.post(url, { name: values }).then(
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
	http.post(url, { sex: values }).then(
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
	http.post(url, { signature: values }).then(
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
	http.post(url, { phone: values }).then(
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
	http.post(url, { mail: values }).then(
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
	http.post(url, { site: values }).then(
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
	http.post(url, { github: values }).then(
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
	http.post(url, { weibo: values }).then(
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
	http.post(url, { qq: values }).then(
		(data) => {
			console.log("提交qq成功", data);
			Infos.getInfo();
		},
		(error) => {
			console.log("提交qq失败", error);
		}
	);
}

function updateAccount(account) {
	http.post("/user/updateAccount", { account: account }).then(
		(data) => {
			console.log("更改账号成功", data);
		},
		(error) => {
			console.log("更改账号失败", error);
		}
	);
}

function updatePasswd(passwd) {
	http.post("/user/updatePasswd", { passwd: passwd }).then(
		(data) => {
			console.log("修改密码成功", data);
		},
		(error) => {
			console.log("修改密码失败", error);
		}
	);
}

function auth() {
	http.get("/account/auth", {}).then(
		() => (Auth.status = true),
		() => (Auth.status = false)
	);
}

let Global = info.global;

export { Log, Infos, Note, File, Auth, Global };
