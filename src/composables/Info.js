/*
保存UpdateInfo界面的数据传输到Setting.vue
*/
import { ref } from "vue"
const name = ref(localStorage.getItem("name"))
const sex = ref("1")
const signature = ref(localStorage.getItem("signature"))
const phone = ref(localStorage.getItem("phone"))
const mail = ref(localStorage.getItem("mail"))
const site = ref(localStorage.getItem("site"))
const github = ref(localStorage.getItem('github'))
const weibo = ref(localStorage.getItem('weibo'))
const qq = ref(localStorage.getItem('qq'))

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

export { name, sex, signature, phone, mail, site, github, weibo, qq, debounce }