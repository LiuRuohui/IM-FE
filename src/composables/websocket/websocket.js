import { session } from "../session";
import msg from "../websocket/msg";

const body = msg.lookupType("proto.Body");

// const ws = {
// 	proto: body,
// 	conn: new WebSocket("ws://localhost:8976/ws?Session-Id=" + session.getSessionId()),
// 	send: function (buffer) {
// 		ws.conn.send(buffer);
// 	},
// 	//这是个待构建的函数
// 	message,
// };

// ws.conn.binaryType = "arraybuffer";

// ws.conn.onopen = function () {
// 	console.log("连接成功");
// };

// ws.conn.onerror = function (error) {
// 	console.log("出现了错误", error);
// };

// ws.conn.onmessage = function (eva) {
// 	let sdd = new Uint8Array(eva.data);
// 	message(sdd);
// };

let message = body.create({
    type: 2,

    apply: {
        end: "1518194336146132992",
        type: 2,
        reason: "hello",
    },
});
console.log("编码前", message);
let buffer = body.encode(message).finish();
console.log("本地解码", body.decode(buffer));

let ws = new WebSocket("ws://localhost:8976/ws?Session-Id=" + session.getSessionId());
ws.binaryType = "arraybuffer";
ws.onopen = function(params) {
    console.log("连接成功！");
    ws.send(buffer);
};

ws.onerror = function(params) {
    console.log(params);
};

ws.onmessage = function(eva) {
    let tmp = new Uint8Array(eva.data);
    console.log("收到消息", body.decode(tmp));
};