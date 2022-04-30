import { reactive } from "vue";
import { http } from "../http";

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
	apply.data = tmp;
}

async function over(id, fun) {
	await http.post("/apply/recent", { applyId: id }).then(
		(data) => {},
		(err) => {
			console.log("apply的over请求出错", err);
		}
	);
	fun();
}

export { apply, getApply, over };
