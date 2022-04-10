import { reactive } from "vue"
import { http } from "../http"

const note = reactive({
	data: [],
	getIndex,
	getContent,
	updateContent,
	updateTitle,
})

/*** 

    笔记函数定义

***/

function getIndex() {
	http.get("/note/index", "").then(
		(data) => {
			console.log("获取笔记列表成功", data)
			note.data = data
		},
		(error) => {
			console.log("获取笔记列表失败", error)
		}
	)
}

async function getContent(id) {
	let text = "666"
	await http
		.post("/note/content", {
			noteId: id,
		})
		.then(
			(data) => {
				text = data
			},
			(error) => {
				console.log("获取笔记内容失败", error)
			}
		)
	return text
}

function updateContent(id, content) {
	http.post("/note/updateContent", {
		noteId: id,
		noteContent: content,
	}).then(
		(data) => {
			console.log("更新笔记内容成功", data)
		},
		(error) => {
			console.log("获取笔记内容失败", error)
		}
	)
}

function updateTitle(id, title) {
	http.post("/note/updateTitle", {
		noteId: id,
		noteTitle: title,
	}).then(
		(data) => {
			console.log("更新笔记内容成功", data)
		},
		(error) => {
			console.log("获取笔记内容失败", error)
		}
	)
}

export { note }
