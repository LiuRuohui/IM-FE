import { reactive } from "vue";
import { http } from "../http";
import { async } from "@kangc/v-md-editor";

const file = reactive({
    data: [],
    upload,
    getIndex,
    getContent,
    updateName,
    del,
});

/***

    文件函数定义

***/

async function upload(file) {
    await http.post1("/file/upload", file).then(
        (data) => {
            console.log("上传文件成功", data);
        },
        (error) => {
            console.log("上传文件失败", error);
        }
    );
}


async function getIndex() {
    await http.get("/file/index", "").then(
        (data) => {
            console.log("获取文件列表成功", data);
            file.data = data;
        },
        (error) => {
            console.log("获取文件列表失败", error);
        }
    );
}

async function getContent(fileId) {
    let text
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
    return text
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
            },
            (error) => {
                console.log("删除文件失败", error);
            }
        );
    getIndex();
}

export { file }