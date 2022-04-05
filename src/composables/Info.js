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