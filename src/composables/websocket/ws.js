import { session } from "../session"
import { msg } from "./msg"

const body = msg.lookupType("proto.Body");

// socket主要对象
var socket = {
    websocket: null,
    //url 到时候需要通过gateway引入
    url: "ws://localhost:8976/ws?Session-Id=" + session.getSessionId(),
    //开启标识
    socket_open: false,
    // 是否自动重连
    is_reonnect: true,
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
            console.log('浏览器不支持WebSocket')
            return null
        }
        // 已经创建过连接不再重复创建
        if (socket.websocket) {
            return socket.websocket
        }
        //利用new关键字创建一个新的WebSocket对象
        socket.websocket = new WebSocket(socket.url)
        socket.websocket.onmessage = function(e) {
            socket.receive(e)
        }

        // 关闭连接
        socket.websocket.onclose = function(e) {
            console.log('连接已断开')
            console.log('connection closed (' + e.code + ')')
            socket.socket_open = false

            // 需要重新连接
            if (socket.is_reonnect) {
                socket.reconnect_timer = setTimeout(() => {
                    // 超过重连次数
                    if (socket.reconnect_current > socket.reconnect_count) {
                        clearTimeout(socket.reconnect_timer)
                        return
                    }
                    // 记录重连次数
                    socket.reconnect_current++
                        socket.reconnect()
                }, socket.reconnect_interval)
            }
        }

        // 连接成功
        socket.websocket.onopen = function() {
            console.log('连接成功')
            socket.socket_open = true
            socket.is_reonnect = true
        }

        // 连接发生错误
        socket.websocket.onerror = function(params) {
            console.log('WebSocket连接发生错误', params)
        }
    },

    /**
     * 发送消息
     * @param {*} data 发送数据
     * @param {*} callback 发送后的自定义回调函数
     */
    send: (data, callback = null) => {
        // 开启状态直接发送
        if (socket.websocket.readyState === socket.websocket.OPEN) {
            socket.websocket.send(JSON.stringify(data))

            if (callback) {
                callback()
            }

            // 正在开启状态，则等待1s后重新调用
        } else if (socket.websocket.readyState === socket.websocket.CONNECTING) {
            setTimeout(function() {
                socket.send(data, callback)
            }, 1000)

            // 未开启，则等待1s后重新调用
        } else {
            socket.init()
            setTimeout(function() {
                socket.send(data, callback)
            }, 1000)
        }
    },

    /**
     * 接收消息
     * @param {*} message 接收到的消息
     */
    receive: (message) => {
        var params = JSON.parse(message.data)

        if (params.kind != 0) {
            console.log('收到服务器内容：', message.data)
        }

        if (params == undefined) {
            console.log("收到服务器空内容")
            return false
        }
    },

    /**
     * 主动关闭连接
     */
    close: () => {
        console.log('主动断开连接')
        socket.is_reonnect = false
        socket.websocket.close()
    },

    /**
     * 重新连接
     */
    reconnect: () => {
        console.log('发起重新连接', socket.reconnect_current)

        if (socket.websocket && socket.socket_open) {
            socket.websocket.close()
        }

        socket.init()
    },
}

//消息函数
function message(props) {
    return body.create({
        type: 1,
        msg: {
            end: props.end,
            groupId: props.groupId,
            extra: props.extra,
            type: props.type,
            msg: props.msg,
            time: props.time
        }
    })
}

//回应函数
function apply(props) {
    return body.create({
        type: 2,
        apply: {
            end: props.end,
            time: props.time,
            type: props.type,
            deal: props.deal,
            groupId: props.groupId,
            reason: props.reason,
        }
    })
}

//编码函数
function encode(message) {
    let buffer = body.encode(message).finish()
    return buffer
}

//解码函数
function decode(buffer) {
    let decoder = body.decode(buffer)
    return decoder
}

export { socket, message, apply, encode, decode }