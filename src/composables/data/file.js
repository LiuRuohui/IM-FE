import { reactive } from "vue";
import { http } from "../http";
import { Dialog } from "../modelDialog";

const file = reactive({
	data: [],
	upload,
	getIndex,
	getContent,
	updateName,
	del,
});

//暂存点击文件信息
let filePreview = reactive({
	id: "",
	Name: "",
	Time: "",
	Url: "",
	imgSrc: "",
	Type: "",
});

/***

    文件函数定义

***/

//该函数post1，Content Type使用multipart/form-data 不需要QS序列化参数
async function upload(file) {
	await http.postFile("/file/upload", file).then(
		(data) => {
			console.log("上传文件成功", data);
			Dialog.successToast("上传成功");
			getIndex();
		},
		(error) => {
			console.log("上传文件失败", error);
			Dialog.errorToast("上传失败");
		}
	);
}

async function getIndex() {
	await http.get("/file/index", "").then(
		(data) => {
			// console.log("获取文件列表成功", data);
			file.data = data;
		},
		(error) => {
			console.log("获取文件列表失败", error);
		}
	);
}

async function getContent(fileId) {
	let text;
	await http
		.post("/file/content", {
			fileId: fileId,
		})
		.then(
			(data) => {
				text = data;
			},
			(error) => {
				console.log("获取文件内容失败", error);
			}
		);
	return text;
}

async function updateName(fileId, name) {
	await http
		.post("/file/updateName", {
			fileId: fileId,
			fileName: name,
		})
		.then(
			(data) => {
				console.log("更新文件标题成功", data);
				file.getIndex();
			},
			(error) => {
				console.log("获取文件标题失败", error);
			}
		);
}

async function del(fileId) {
	await http
		.post("/file/del", {
			fileId: fileId,
		})
		.then(
			(data) => {
				console.log("删除文件成功", data);
				Dialog.successToast("删除文件成功");
				file.getIndex();
			},
			(error) => {
				console.log("删除文件失败", error);
				Dialog.errorToast("删除文件失败");
			}
		);
	getIndex();
}

export { file, filePreview };
