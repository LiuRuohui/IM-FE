<script setup>
import Button from "../components/Button.vue"
import { reactive } from "vue"
import User from "./components/User.vue"
import UpdateInfo from "./components/UpdateInfo.vue"

const pageParams = reactive({
    type: 2
})

const typeComponentMap = {
    1: User,
    2: UpdateInfo,
}
</script>
<template>
    <keep-alive>
        <component :is="typeComponentMap[pageParams.type]"></component>
    </keep-alive>
    <div class="flex-grow h-full overflow-hidden">
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
                            <Button :id="1"></Button>
                        </div>
                    </div>
                    <div class="w-full h-4 border-b border-gray-200"></div>
                </div>
                <div>
                    <div class="flex justify-between mt-3">
                        <span class="select-none">新消息通知</span>
                        <div class>
                            <Button :id="2"></Button>
                        </div>
                    </div>
                    <div class="w-full h-4 border-b border-gray-200"></div>
                </div>
                <div>
                    <div class="flex justify-between mt-3">
                        <span class="select-none">显示通知详情</span>
                        <div class>
                            <Button :id="3"></Button>
                        </div>
                    </div>
                    <div class="w-full h-4 border-b border-gray-200"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>