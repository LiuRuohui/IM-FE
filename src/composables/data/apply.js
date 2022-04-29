import { reactive } from "vue";
import { http } from "../http";

import { Infos } from "../api";

const apply = reactive({
	data: [],
});

async function getApply() {
	let tmp;
	await http
		.post("/apply/recent", { num: 0 })
		.then((data) => {
			tmp = data;
		})
		.catch((err) => {
			console.log("错误：", err);
		});

	for (const ele of tmp) {
		apply.data.push(ele);
	}
	// console.log("apply", apply.data);
}

export { apply, getApply };
