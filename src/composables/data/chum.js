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
		if (typeof id === "number") {
			this.id = id;
		} else {
			throw "id is not number";
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
