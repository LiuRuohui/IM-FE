/*
保存UpdateInfo界面的数据传输到Setting.vue
*/
import { ref } from "vue"
const name = ref("")
const sex = ref("")
const signature = ref("")
const phone = ref(null)
const mail = ref("")
const site = ref("")
const github = ref("")
const weibo = ref("")
const qq = ref(null)

export { name, sex, signature, phone, mail, site, github, weibo, qq }