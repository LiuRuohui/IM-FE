<script setup>
import { ref, defineAsyncComponent, onMounted } from "vue"

import mobile from "../../composables/mobile"

import Switch from "../components/Switch.vue"
import User from "./components/User.vue"

//两个svg，setting页面的切换
import editorSvg from '../../assets/img/editor.svg'
import saveSvg from '../../assets/img/save.svg'

import { info, Info } from "/src/composables/data/info";
import {Infos} from "/src/composables/api"

import {accountTest, passwdTest} from "/src/composables/tool"
import { http } from "../../composables/http"
//异步组件加载
const UpdateInfo = defineAsyncComponent(() =>
    import("./components/UpdateInfo.vue")
)

const pageParams = ref(true)
const imgBox = ref(true)

const typeComponentMap = {
    1: User,
    2: UpdateInfo,
}

//上下页
const turn = mobile()

//获取要修改的账号密码
const account = ref("")
const passwd = ref("")

onMounted(() => {
    info.getInfo()
})

function update(){
    if(!accountTest(account.value)){
        console.log('账号格式不正确！',account.value)
        return
    }
    if(!passwdTest(passwd.value)){
        alert("密码格式错误",passwd.value)
        return
    }
    http.post('/user/updateAccount',{account : account.value},"").then(
        (data) => {
            console.log("更改账号成功", data)
        },
        (error) => {
            console.log("更改账号失败", error)
        }
    )
    http.post('/user/updatePasswd',{passwd : passwd.value},"").then(
        (data) => {
            console.log("修改密码成功", data)
        },
        (error) => {
            console.log("修改密码失败", error)
        }
    )

}

//头像点击切换事件
function change() {
    pageParams.value = !pageParams.value
    imgBox.value = !imgBox.value
    //当imgBox从更改切换到展示的时候需要从服务器get信息渲染
    if (imgBox.value) {
        if (info.data.Name != Info.data.Name) {
            Infos.postName("/user/updateName",Info.data.Name)
        }
        if (info.data.Sex != Info.data.Sex) {
            Infos.postSex("/user/updateSex",Info.data.Sex)
        }
        if (info.data.Signature != Info.data.Signature) {
            Infos.postSignature("/user/updateSignature",Info.data.Signature)
        }
        if (info.data.Phone != Info.data.Phone) {
            Infos.postPhone("/user/updatePhone",Info.data.Phone)
        }
        if (info.data.Mail != Info.data.Mail) {
            Infos.postMail("/user/updateMail",Info.data.Mail)
        }
        if (info.data.Site != Info.data.Site) {
            Infos.postSite("/user/updateSite",Info.data.Site)
        }
        if (info.data.Github != Info.data.Github) {
            Infos.postGithub("/user/updateGithub",Info.data.Github)
        }
        if (info.data.Weibo != Info.data.Weibo) {
            Infos.postWeibo("/user/updateWeibo",Info.data.Weibo)
        }
        if (info.data.Qq != Info.data.Qq) {
            Infos.postQq("/user/updateQq",Info.data.Qq)
        }
    }

}
</script>
<template>
    <div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
        <span class="absolute bottom-3 right-3 md:hidden" @click="turn.switch">
            <img class="h-10 w-10" :src="turn.img" alt="turn" />
        </span>
        <div
            class="w-full md:w-96 h-screen flex flex-col border-r border-gray-200 md:block"
            :class="turn.value ? 'hidden' : ''"
        >
            <div
                class="w-28 md:w-1/3 h-auto mt-8 rounded-full ml-auto mr-auto select-none relative"
            >
                <img class="drag rounded-full" src="/src/assets/avatar/squidWard.jpg" alt="头像" />
                <img
                    class="drag w-6 h-6 absolute bottom-0 right-0 bg-blue-300 rounded-full p-2 box-content cursor-pointer hover:scale-110 active:scale-125 transition-transform duration-500 active:transition-none"
                    id="clickImage"
                    @click="change"
                    :src="pageParams ? editorSvg : saveSvg"
                    alt="go"
                    ref="imgBox ? true : false"
                />
            </div>
            <Transition name="fade" mode="out-in">
                <keep-alive>
                    <component @go="change" :is="typeComponentMap[pageParams ? 1 : 2]"></component>
                </keep-alive>
            </Transition>
        </div>

        <div class="flex-grow h-full md:block" :class="turn.value ? '' : 'hidden'">
            <div class="w-10/12 h-full box-content overflow-hidden ml-auto mr-auto">
                <div class="mt-9 w-full">
                    <div class="font-sans font-semibold antialiased text-xl select-none flex flex-row">
                        <p>隐私设置</p>
                        <div class="flex flex-grow flex-row-reverse">
                            <button class="font-sans font-semibold hover:cursor-pointer" @click="update">
                            修改账号密码
                            </button>
                        </div>
                    </div>
                </div>
                <!--1 想法是把这部分以下拆开 当点击隐私设置出现page2当点击修改账号密码出现page1-->
                <div class="w-full text-base mt-6">
                    <div class="flex flex-col mt-3">
                        <div class="rounded-md my-4">
                            <label class="label select-none" for="account">账号:</label>
                            <input type="account" id="account" name="account" class="inputFrame" v-model="account">
                        </div>
                        <div class="rounded-md my-4">
                            <label class="label select-none" for="passwd">密码:</label>
                            <input type="password" id="password" name="password" class="inputFrame" v-model="passwd">
                        </div>
                    </div>
                </div>
                <!--2-->
                <div class="w-full text-base mt-6">
                    <div>
                        <div class="flex justify-between mt-3">
                            <span class="select-none">添加好友时需要验证</span>
                            <div class>
                                <Switch :id="1"></Switch>
                            </div>
                        </div>
                        <div class="w-full h-4 border-b border-gray-200"></div>
                    </div>
                    <div>
                        <div class="flex justify-between mt-3">
                            <span class="select-none">新消息通知</span>
                            <div class>
                                <Switch :id="2"></Switch>
                            </div>
                        </div>
                        <div class="w-full h-4 border-b border-gray-200"></div>
                    </div>
                    <div>
                        <div class="flex justify-between mt-3">
                            <span class="select-none">显示通知详情</span>
                            <div class>
                                <Switch :id="3"></Switch>
                            </div>
                        </div>
                        <div class="w-full h-4 border-b border-gray-200"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>