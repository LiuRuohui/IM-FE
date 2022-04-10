<script setup>
import { ref } from "vue"
import { Log } from "../../../composables/api"
import { accountTest, passwdTest } from "../../../composables/tool"
const emit = defineEmits(['notice'])

const account = ref("")
const passwd = ref("")
const repeatedPasswd = ref("")

//注册函数，首先利用用户名要求和密码要求判断用户输入是否符合要求，若不符合则不进行post操作
function Register() {
    if (!accountTest(account.value)) {
        console.log("输入用户名不符合要求")
        return
    }
    if (!passwdTest(passwd.value)) {
        console.log("输入密码不符合要求")
        return
    }
    if (passwd.value !== repeatedPasswd.value) {
        console.log("两次密码输入不一致,请重试！")
        return
    }
    //设置data对象，存储account和passwd的值
    let data = {
        account: account.value,
        passwd: passwd.value
    }
    Log.register(data.account, data.passwd)

}
</script>
<template>
    <div class="max-w-md w-full mx-auto space-y-8">
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900 select-none">注册</h2>
        </div>
        <div class="flex items-center justify-center space-x-2"></div>
        <div class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md">
                <div class="py-3">
                    <label class="label select-none" for="account">账号:</label>
                    <input
                        id="account"
                        name="account"
                        type="account"
                        v-model="account"
                        autocomplete="name"
                        required
                        class="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        placeholder="请输入账号"
                    />
                </div>
                <div class="py-3">
                    <label class="label select-none" for="passwd">密码:</label>
                    <input
                        id="passwd"
                        name="passwd"
                        type="password"
                        v-model="passwd"
                        autocomplete="current-password"
                        required
                        class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        placeholder="请输入密码"
                    />
                </div>
                <div class="py-3">
                    <label class="label select-none" for="passwd">确认密码:</label>
                    <input
                        id="repeat-passwd"
                        name="repeat-passwd"
                        type="password"
                        v-model="repeatedPasswd"
                        autocomplete="current-password"
                        required
                        class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        placeholder="请再次输入密码"
                    />
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label for="remember_me" class="ml-2 block text-sm text-gray-900 select-none">同意</label>
                    <a
                        class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >用户协议</a>
                </div>
            </div>
            <div>
                <button class="btn select-none" @click="Register">注册</button>
            </div>
            <p
                class="items-center justify-center mt-10 text-center text-md text-gray-500 select-none"
            >
                <span>已有账号？</span>
                <a
                    class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    @click="emit('notice', '')"
                >立即登录</a>
            </p>
        </div>
    </div>
</template>
<style></style>