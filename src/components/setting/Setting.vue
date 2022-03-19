<script setup>
import Button from "../components/Button.vue"
import { ref, reactive } from "vue"
import User from "./components/User.vue"
import UpdateInfo from "./components/UpdateInfo.vue"

const pageParams = ref(true)

const typeComponentMap = {
    1: User,
    2: UpdateInfo,
}
function change() {
    pageParams.value = !pageParams.value
}
</script>
<template>
    <Transition name="fade" mode="out-in">
        <keep-alive>
            <component @go="change" :is="typeComponentMap[pageParams ? 1 : 2]"></component>
        </keep-alive>
    </Transition>
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