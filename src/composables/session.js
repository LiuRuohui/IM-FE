/*
创建session.js 存在一个对象两个方法分别为读取和修改 外部不暴露session 通过对象的方法访问 暴露对象在外
 */
var storage = localStorage.getItem("Session-Id")
var session = ({
    setSessionId(sessionId) {
        //设置sessionId
        storage = sessionId
    },
    getSessionId() {
        return storage
    }
})

export { session }