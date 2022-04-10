<script setup>
import { ref, defineAsyncComponent, onMounted } from "vue"

import mobile from "../../composables/mobile"

import Switch from "../components/Switch.vue"
import User from "./components/User.vue"

//两个svg，setting页面的切换
import editorSvg from '../../assets/img/editor.svg'
import saveSvg from '../../assets/img/save.svg'

import { instance, http } from "/src/composables/http"
import QS from "qs"

import { info, debounce, Info } from "/src/composables/data/info";
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

onMounted(() => {
    info.getInfo()
})

//头像点击切换事件
function change() {
    pageParams.value = !pageParams.value
    imgBox.value = !imgBox.value
    //当imgBox从更改切换到展示的时候需要从服务器get信息渲染
     if (imgBox.value) {
         info.getInfo()
         if(info.data.Name != Info.data.Name){
             console.log(info.data.Name)
             console.log(Info.data.Name)
             http.post("/user/updateName", Info.data, "").then(
                (data) => {
                    console.log("应该跳转1", data)
                },
                (error) => {
                    console.log("修改昵称失败了", error)
                }
            )
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
                    <div class="font-sans font-semibold antialiased text-xl select-none">
                        <p>隐私设置</p>
                    </div>
                </div>
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