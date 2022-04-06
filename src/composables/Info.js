/*
保存UpdateInfo界面的数据传输到Setting.vue
*/
import { reactive } from "vue"
import { instance } from "/src/composables/http"
const Info = reactive({
    name: null,
    sex: 1,
    signature: null,
    phone: null,
    mail: null,
    site: null,
    github: null,
    weibo: null,
    qq: null,

    getInfo() {
        instance.get('/user/info').then(
            response => {
                console.log('获取成功', response.data)
                Info.name = response.data.Name
                Info.sex = response.data.Sex
                Info.signature = response.data.Signature
                Info.phone = response.data.Phone
                Info.mail = response.data.Mail
                Info.site = response.data.Site
                Info.github = response.data.Github
                Info.weibo = response.data.Weibo
                Info.qq = response.data.Qq
            },
            error => {
                console.log('获取失败', error.message)
            }
        )
    }
})

/*const name = ref(localStorage.getItem("name"))
const sex = ref("1")
const signature = ref(localStorage.getItem("signature"))
const phone = ref(localStorage.getItem("phone"))
const mail = ref(localStorage.getItem("mail"))
const site = ref(localStorage.getItem("site"))
const github = ref(localStorage.getItem('github'))
const weibo = ref(localStorage.getItem('weibo'))
const qq = ref(localStorage.getItem('qq'))
*/
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

export { Info, debounce }