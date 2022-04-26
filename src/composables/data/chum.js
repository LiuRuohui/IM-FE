import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";

import { User } from "./user";
import { Infos } from "../api";
const chum = reactive({
	data: [],
	message: [],
	getChums,
});

class ChumEle {
	constructor(name, id, sex, time) {
		this.setName(name);
		this.setID(id);
		this.setSex(sex);
		this.setTime(time);
	}
	setName(name) {
		if (typeof name == "string") {
			this.name = name;
		} else {
			throw "name" + name + " is not string";
		}
	}
	setID(id) {
		if (typeof id === "string") {
			this.id = id;
		} else {
			throw "id is not string";
		}
	}
	setSex(sex) {
		if (typeof sex === "boolean") {
			this.sex = sex;
		} else {
			throw "sex is not boolean";
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

class ChumMsg {
	constructor(accountA, accountB, direction, type, body, extra, time) {
		this.setAccountA(accountA);
		this.setAccountB(accountB);
		this.setDirection(direction);
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

async function getChums() {
	let tmp;
	await http.get("/chum/get", {}).then(
		(data) => {
			tmp = data;
			console.log("获取信息成功了", data);
		},
		(error) => {
			console.log("获取信息失败了", error);
		}
	);
	for (const chumE of tmp) {
		let result;
		if (Infos.data().ID == chumE.UserA) {
			await User.get(chumE.UserB).then((data) => {
				result = data;
			});
		} else {
			await User.get(chumE.UserA).then((data) => {
				result = data;
			});
		}
		console.log("结果", result);
		let ele = new ChumEle(result.Name, result.ID, result.Sex, chumE.CreateTime);
		chum.data.push(ele);
	}
}

export { chum };
