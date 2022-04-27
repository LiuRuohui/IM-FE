import { chum } from "./chum";
import { group } from "./group";

import { http } from "../http";

import { Infos } from "../api";

async function getMessage() {
	let tmp;
	await http
		.post("/msg/recent", { num: 0 })
		.then((data) => {
			tmp = data;
		})
		.catch((err) => {
			console.log("错误：", err);
		});
	console.log("获取到的message", tmp);
	for (const ele of tmp) {
		if (ele.Group == "") {
			// 单聊
			// console.log(chum.message.get(ele.AccountB));
			if (ele.AccountA == Infos.data().ID) {
				let tmp = chum.message.get(ele.AccountB);
				if (typeof tmp === "undefined") {
					tmp = [];
				}
				tmp.push(ele);

				chum.message.set(ele.AccountB, tmp);
			} else {
				let tmp = chum.message.get(ele.AccountA);
				if (typeof tmp === "undefined") {
					tmp = [];
				}
				tmp.push(ele);

				chum.message.set(ele.AccountA, tmp);
			}
		} else {
			// 群聊
			let tmp = group.message.get(ele.Group);
			if (typeof tmp === "undefined") {
				tmp = [];
			}
			tmp.push(ele);

			group.message.set(ele.Group, tmp);
		}
	}
	console.log("map内容", chum.message);
}

export { getMessage };
