import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";
import { Groups } from "./groups";

const group = reactive({
	data: [],
	message: new Map(),
	//上面的message应该是map类型
	getGroups,
	createGroup,
});

//暂存群组信息
let groupPreview = reactive({
	name: "",
	groupId: "",
	joinTime: "",
	ownerId: "",
	intro: "",
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

class GroupMsg {
	constructor(accountA, accountB, direction, group, type, body, extra, time) {
		this.setAccountA(accountA);
		this.setAccountB(accountB);
		this.setDirection(direction);
		this.setGroup(group);
		this.setType(type);
		this.setBody(body);
		this.setExtra(extra);
		this.setTime(time);
	}
	setAccountA(accountA) {
		if (typeof accountA === "string") {
			this.accountA = accountA;
		} else {
			throw "accountA is not string";
		}
	}

	setAccountB(accountB) {
		if (typeof accountB === "string") {
			this.accountB = accountB;
		} else {
			throw "accountB is not string";
		}
	}

	setDirection(direction) {
		if (typeof direction === "boolean") {
			this.direction = direction;
		} else {
			throw "direction is not boolean";
		}
	}

	setGroup(group) {
		if (typeof group === "string") {
			this.group = group;
		} else {
			throw "group is not string";
		}
	}

	setType(type) {
		if (typeof type === "number") {
			this.type = type;
		} else {
			throw "type is not number";
		}
	}

	setBody(body) {
		if (typeof body === "string") {
			this.body = body;
		} else {
			throw "body is not string";
		}
	}

	setExtra(extra) {
		if (typeof extra === "string") {
			this.extra = extra;
		} else {
			throw "extra is not string";
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
			console.log(tmp);
			// console.log("获取群组信息成功了", data);
		},
		(error) => {
			console.log("获取群组信息失败了", error);
		}
	);
	group.data = [];
	for (const groupE of tmp) {
		let result;
		// group.message.set(groupE.GroupId, []);
		if (typeof group.message.get(groupE.GroupId) == "undefined") {
			group.message.set(groupE.GroupId, []);
		}
		await Groups.get(groupE.GroupId).then((data) => {
			result = data;
		});
		//console.log("返回的内容", result);
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
	console.log("获取群组信息完成");
}

function createGroup(groupName) {
	http.post("/group/create", { name: groupName }).then(
		(data) => {
			console.log("创建群聊成功", data);

			setTimeout(function () {
				getGroups();
			}, 500);
		},
		(error) => {
			console.log("创建群聊失败", error);
		}
	);
}

export { group, groupPreview };
