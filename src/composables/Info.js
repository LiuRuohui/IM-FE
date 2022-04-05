/*
保存UpdateInfo界面的数据传输到Setting.vue
*/
import { ref } from "vue"
const name = ref(`${localStorage.getItem("name")}`)
const sex = ref("1")
const signature = ref(localStorage.getItem("signature"))
const phone = ref(localStorage.getItem("phone"))
const mail = ref(localStorage.getItem("mail"))
const site = ref(localStorage.getItem("site"))
const github = ref(localStorage.getItem('github'))
const weibo = ref(localStorage.getItem('weibo'))
const qq = ref(localStorage.getItem('qq'))

function debounce(fn) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function() {
        clearTimeout(timeout);
        // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => {
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内
            // 如果还有字符输入的话，就不会执行 fn 函数
            fn.apply(this, arguments);
            //因为sayHi函数是在全局中运行，this默认指向了window
            //所以要用apply将inp的this传入
        }, 500);
    };
}




export { name, sex, signature, phone, mail, site, github, weibo, qq, debounce }