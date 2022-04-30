import { http } from "../http";
const data = new Map();

const User = {
	data,
	get,
};

//取内容
async function get(id) {
	if (data.has(id)) {
		return data.get(id);
	} else {
		let tmp;
		await getUserData(id).then((data) => {
			tmp = data;
		});
		if (tmp.ID == "") {
			console.log("该账户不存在！");
			return;
		} else {
			data.set(id, tmp);
			// console.log("这是tmp", tmp, "这是data", data, "获取data", data.get(id));
			return tmp;
		}
	}
}

async function getUserData(id) {
	let userData;
	await http.post("/user/getData", { userId: id }).then(
		(data) => {
			userData = data;
			console.log("获取用户" + id, "信息成功", data);
		},
		(error) => {
			console.log("获取用户" + id, "信息失败", error);
		}
	);
	return userData;
}

export { User };
