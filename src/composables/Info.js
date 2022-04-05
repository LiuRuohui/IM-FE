/*
保存UpdateInfo界面的数据传输到Setting.vue
*/
import { ref } from "vue"
const name = ref("Squidward Tentacles")
const sex = ref("male")
const signature = ref("Peace comes from within. Do not seek it without!")
const phone = ref("17519137795")
const mail = ref("jinzhongjia@qq.com")
const site = ref("http://jinze.me/")
const github = ref("")
const weibo = ref("")
const qq = ref("")

export { name, sex, signature, phone, mail, site, github, weibo, qq }