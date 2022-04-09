// 使用封装好的http

// 导出时需要对导出的info进行解构
import { reactive } from "vue"
import { instance } from "../http"
import { http } from "../http"
// import Router from "vue-router"
import router from "../../router/router"

// const route = useRoute()
const info = reactive({
    data: {},
    getInfo,
})

const Info = reactive({
    data: {},
    getInfo,
})

function getInfo() {
    http.get("/user/info", {}, "").then(
        (data) => {
            console.log(data)
            info.data = data
            console.log("应该跳转")
            router.push({
                name: "setting",
            })
        },
        (error) => {
            console.log("获取信息失败了", error)
                // 出错时直接跳转会首页
                // router.push({
                //     name: "login",
                // })
        }
    )
}


//防抖函数
function debounce(fn, delay) {
    let timer
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

export { info, debounce, Info }