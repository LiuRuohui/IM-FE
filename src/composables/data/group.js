import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";
import { Groups } from "./groups";
const group = reactive({
	data: [],
	message: new Map(),
	//上面的message应该是map类型
	getGroups,
});

class GroupEle {
	constructor(name, groupId, joinTime, ownerId, intro, headPic, time) {
		this.setName(name);
		this.setGroupId(groupId);
		this.setJoinTime(joinTime);
		this.setOwnerId(ownerId);
		this.setIntro(intro);
		this.setHeadPic(headPic);
		this.setTime(time);
	}
	setName(name) {
		if (typeof name === "string") {
			this.name = name;
		} else {
			throw "name is not string";
		}
	}
	setGroupId(groupId) {
		if (typeof groupId === "string") {
			this.groupId = groupId;
		} else {
			throw "groupId is not string";
		}
	}
	setJoinTime(joinTime) {
		if (typeof joinTime === "number") {
			this.joinTime = joinTime;
		} else {
			throw "joinTime is not number";
		}
	}
	setOwnerId(ownerId) {
		if (typeof ownerId === "string") {
			this.ownerId = ownerId;
		} else {
			throw "ownerId is not string";
		}
	}
	setIntro(intro) {
		if (typeof intro === "string") {
			this.intro = intro;
		} else {
			throw "intro is not string";
		}
	}
	setHeadPic(headPic) {
		if (typeof headPic === "number") {
			this.headPic = headPic;
		} else {
			throw "headPic is not number";
		}
	}
	setTime(time) {
		if (typeof time === "number") {
			this.time = time;
		} else {
			throw "time is not number";
		}
	}
}

async function getGroups() {
	let tmp;
	await http.get("/group/getAll", {}).then(
		(data) => {
			tmp = data;
			console.log("获取信息成功了", data);
		},
		(error) => {
			console.log("获取信息失败了", error);
		}
	);

	for (const groupE of tmp) {
		let result;
		await Groups.get(groupE.GroupId).then((data) => {
			result = data;
		});
		console.log("返回的内容", result);
		let ele = new GroupEle(
			result.Name,
			result.ID,
			groupE.JoinTime,
			result.Owner,
			result.Introduction,
			result.HeadPic,
			result.Time
		);
		group.data.push(ele);
	}
}

export { group };
