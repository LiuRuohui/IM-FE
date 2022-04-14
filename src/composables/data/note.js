import { async } from "@kangc/v-md-editor";
import { reactive } from "vue";
import { http } from "../http";

const note = reactive({
	data: [],
	getIndex,
	getContent,
	updateContent,
	updateTitle,
	create,
	del,
});

/*** 

    笔记函数定义

***/

function getIndex() {
	http.get("/note/index", "").then(
		(data) => {
			console.log("获取笔记列表成功", data);
			note.data = data;
		},
		(error) => {
			console.log("获取笔记列表失败", error);
		}
	);
}

async function getContent(id) {
	let text = "666";
	await http
		.post("/note/content", {
			noteId: id,
		})
		.then(
			(data) => {
				text = data;
			},
			(error) => {
				console.log("获取笔记内容失败", error);
			}
		);
	return text;
}

async function updateContent(id, content) {
	await http
		.post("/note/updateContent", {
			noteId: id,
			noteContent: content,
		})
		.then(
			(data) => {
				console.log("更新笔记内容成功", data);
			},
			(error) => {
				console.log("获取笔记内容失败", error);
			}
		);
}

async function updateTitle(id, title) {
	await http
		.post("/note/updateTitle", {
			noteId: id,
			noteTitle: title,
		})
		.then(
			(data) => {
				console.log("更新笔记标题成功", data);
			},
			(error) => {
				console.log("获取笔记标题失败", error);
			}
		);
}

async function create() {
	await http.post("/note/create").then(
		(data) => {
			console.log("创建笔记内容成功", data);
		},
		(error) => {
			console.log("创建笔记内容失败", error);
		}
	);
	getIndex();
}

async function del(noteId) {
	await http
		.post("/note/del", {
			noteId: noteId,
		})
		.then(
			(data) => {
				console.log("创建笔记内容成功", data);
			},
			(error) => {
				console.log("创建笔记内容失败", error);
			}
		);
	getIndex();
}

export { note };
