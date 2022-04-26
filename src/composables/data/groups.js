import { http } from "../http";
const data = new Map();

const Groups = {
	data,
	get,
};

//取内容
function get(id) {
	if (data.has(id)) {
		return data.get(key);
	} else {
		let tmp = getGroupData(id);
		data.set(id, tmp);
		return tmp;
	}
}

async function getGroupData(id) {
	let groupData;
	await http.post("/group/getInfo", {}).then(
		(data) => {
			groupData = data;
			console.log("获取群组" + id, "信息成功", data);
		},
		(error) => {
			console.log("获取群组" + id, "信息失败", error);
		}
	);
	return groupData;
}

export { Groups };
