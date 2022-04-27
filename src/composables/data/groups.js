import { http } from "../http";
const data = new Map();

const Groups = {
	data,
	get,
};

//取内容
async function get(id) {
	if (data.has(id)) {
		return data.get(id);
	} else {
		let tmp;
		await getGroupData(id).then((data) => {
			tmp = data;
		});
		data.set(id, tmp);
		return tmp;
	}
}

async function getGroupData(id) {
	let groupData;
	await http.post("/group/getInfo", { groupId: id }).then(
		(data) => {
			groupData = data;
			//console.log("1654978", groupData);
			console.log("获取群组" + id, "信息成功", data.Name);
		},
		(error) => {
			console.log("获取群组" + id, "信息失败", error);
		}
	);
	return groupData;
}

export { Groups };
