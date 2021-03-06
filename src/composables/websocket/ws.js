import { session } from "../session";
import { Infos } from "../api";
import { chum } from "../data/chum";
import { group } from "../data/group";
import { getApply } from "../data/apply";
import { Dialog } from "../modelDialog";
import msg from "./msg";

const body = msg.lookupType("proto.Body");
// socket主要对象
const socket = {
	websocket: null,
	//url 到时候需要通过gateway引入
	// url: "ws://localhost:8976/ws?Session-Id=" + session.getSessionId(),
	url: "ws://api.jinzh.me/ws?Session-Id=" + session.getSessionId(),
	//开启标识
	socket_open: false,
	// 是否自动重连
	is_reconnect: true,
	// 重连次数
	reconnect_count: 3,
	// 已发起重连次数
	reconnect_current: 1,
	// 重连timer
	reconnect_timer: null,
	// 重连频率
	reconnect_interval: 3000,

	/**
	 * 初始化连接
	 */
	init: () => {
		//检查浏览器是否支持websocket
		if (!("WebSocket" in window)) {
			console.log("浏览器不支持WebSocket");
			return null;
		}
		// 已经创建过连接不再重复创建
		if (socket.websocket) {
			return socket.websocket;
		}
		//利用new关键字创建一个新的WebSocket对象
		socket.websocket = new WebSocket(socket.url);
		//设置类型
		socket.websocket.binaryType = "arraybuffer";
		// 设置收到消息回调函数
		socket.websocket.onmessage = function (e) {
			console.log("收到消息了");
			Dialog.successToast("收到消息");
			socket.receive(e);
		};

		// 关闭连接
		socket.websocket.onclose = function (e) {
			console.log("连接已断开");
			console.log("connection closed (" + e.code + ")");
			socket.socket_open = false;

			// 需要重新连接
			if (socket.is_reconnect) {
				socket.reconnect_timer = setTimeout(() => {
					// 超过重连次数
					if (socket.reconnect_current > socket.reconnect_count) {
						clearTimeout(socket.reconnect_timer);
						return;
					}
					// 记录重连次数
					socket.reconnect_current++;
					socket.reconnect();
				}, socket.reconnect_interval);
			}
		};

		// 连接成功
		socket.websocket.onopen = function () {
			console.log("websocket连接成功");
			socket.socket_open = true;
			socket.is_reconnect = true;
		};

		// 连接发生错误
		socket.websocket.onerror = function (params) {
			console.log("WebSocket连接发生错误", params);
		};
	},

	/**
	 * 发送消息
	 * @param {*} data 发送数据
	 * @param {*} callback 发送后的自定义回调函数
	 */
	send: (data, callback = null) => {
		// 开启状态直接发送
		if (socket.websocket.readyState === socket.websocket.OPEN) {
			let buffer = encode(data);
			socket.websocket.send(buffer);

			if (callback) {
				callback();
			}

			// 正在开启状态，则等待1s后重新调用
		} else if (socket.websocket.readyState === socket.websocket.CONNECTING) {
			setTimeout(function () {
				socket.send(data, callback);
			}, 1000);

			// 未开启，则等待1s后重新调用
		} else {
			socket.init();
			setTimeout(function () {
				socket.send(data, callback);
			}, 1000);
		}
	},

	/**
	 * 接收消息
	 */
	receive: (message) => {
		let tmp = new Uint8Array(message.data);
		let validMessage = decode(tmp);
		let ob = body.toObject(validMessage);
		console.log(ob);
		if (ob.type == 1) {
			let mm = ob.msg;
			//消息
			let dd = {};
			console.log(mm.groupId);
			if (typeof mm.groupId === "undefined") {
				//单聊
				dd.AccountA = Infos.data().ID;
				dd.AccountB = mm.end;
				dd.Direction = false;
				dd.Group = "";
				dd.Type = mm.type;
				dd.Body = mm.msg;
				dd.SendTime = mm.time;
				// chum.message.
				let tmp = chum.message.get(mm.end);
				if (typeof tmp === "undefined") {
					tmp = [];
				}
				tmp.push(dd);
				chum.message.set(mm.end, tmp);
				console.log(chum.message.get(mm.end));
			} else {
				//群聊
				dd.AccountA = Infos.data().ID;
				dd.AccountB = mm.end;
				dd.Direction = false;
				dd.Group = mm.groupId;
				dd.Type = mm.type;
				dd.Body = mm.msg;
				dd.SendTime = mm.time;
				let tmp = group.message.get(mm.groupId);
				if (typeof tmp === "undefined") {
					tmp = [];
				}
				tmp.push(dd);
				chum.message.set(mm.groupId, tmp);
			}
		} else {
			//请求
			getApply();
		}
	},

	/**
	 * 主动关闭连接
	 */
	close: () => {
		console.log("主动断开连接");
		socket.is_reconnect = false;
		socket.websocket.close();
	},

	/**
	 * 重新连接
	 */
	reconnect: () => {
		console.log("发起重新连接", socket.reconnect_current);

		if (socket.websocket && socket.socket_open) {
			socket.websocket.close();
		}

		socket.init();
	},
};

//消息函数
function message(props) {
	return body.create({
		type: 1,
		msg: {
			// 类型应该为字符串
			end: props.end,
			// 类型应该为数字
			groupId: props.groupId,
			// 字符串类型
			extra: props.extra,
			// 数字类型
			type: props.type,
			// 字符串类型
			msg: props.msg,
			// 数字类型
			time: props.time,
		},
	});
}

//回应函数
function apply(props) {
	return body.create({
		type: 2,
		apply: {
			// 字符串类型
			end: props.end,
			// 数字类型
			time: props.time,
			// 数字类型
			type: props.type,
			// 字符串类型
			deal: props.deal,
			// 数字类型
			groupId: props.groupId,
			// 字符串类型
			reason: props.reason,
		},
	});
}

//编码函数
function encode(message) {
	let buffer = body.encode(message).finish();
	return buffer;
}

//解码函数
function decode(buffer) {
	let decoder = body.decode(buffer);
	let object = body.toObject(decoder);
	return object;
}

class Msg {
	// 构造函数
	constructor(end, groupId, extra, type, msg) {
		this.setEnd(end);
		this.setGroupId(groupId);
		this.setExtra(extra);
		this.setType(type);
		this.setMsg(msg);
	}
	setEnd(end) {
		if (typeof end === "string") {
			this.end = end;
		} else {
			throw "end is not string!";
		}
	}
	setGroupId(groupId) {
		if (typeof groupId === "string") {
			this.groupId = groupId;
		} else {
			throw "测试得到groupId is not string!";
		}
	}
	setExtra(extra) {
		if (typeof extra === "string") {
			this.extra = extra;
		} else {
			throw "extra is not string!";
		}
	}
	setType(type) {
		if (typeof type === "number") {
			this.type = type;
		} else {
			throw "type is not number!";
		}
	}
	setMsg(msg) {
		if (typeof msg === "string") {
			this.msg = msg;
		} else {
			throw "msg is not string!";
		}
	}
}

class Apply {
	// 构造函数
	constructor(end, groupId, type, reason) {
		this.setEnd(end);
		this.setGroupId(groupId);

		this.setType(type);
		this.setReason(reason);
	}

	setEnd(end) {
		if (typeof end === "string") {
			this.end = end;
		} else {
			throw "end is not string!";
		}
	}

	setGroupId(groupId) {
		if (typeof groupId === "string") {
			this.groupId = groupId;
		} else {
			throw "groupId is not string!";
		}
	}

	setDeal(deal) {
		if (typeof deal === "string") {
			this.deal = deal;
		} else {
			throw "deal is not string!";
		}
	}

	setType(type) {
		if (typeof type === "number") {
			this.type = type;
		} else {
			throw "type is not number!";
		}
	}

	setReason(reason) {
		if (typeof reason === "string") {
			this.reason = reason;
		} else {
			throw "reason is not string!";
		}
	}
}

export { socket, message, apply, encode, decode, Msg, Apply };
