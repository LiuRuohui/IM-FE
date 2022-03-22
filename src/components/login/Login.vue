<script setup>
import { reactive, defineAsyncComponent } from 'vue';
import Login from "../login/components/Login.vue"

// import Register from "../login/components/Register.vue"
// import ForgetPasswd from "../login/components/ForgetPasswd.vue"

// 异步组件加载
const Register = defineAsyncComponent(() =>
    import("../login/components/Register.vue")
)
const ForgetPasswd = defineAsyncComponent(() =>
    import("../login/components/ForgetPasswd.vue")
)

const pageParams = reactive({
    type: 1
})
const typeComponentMap = {
    1: Login,
    2: Register,
    3: ForgetPasswd,
}

function page(param) {
    switch (param) {
        case "register":
            pageParams.type = 2
            break
        case "forgetPasswd":
            pageParams.type = 3
            break
        default:
            pageParams.type = 1
            break
    }
}
</script>

<template>
    <div class="relative min-h-screen flex">
        <div
            class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white"
        >
            <div
                class="sm:w-1/3 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                style="background-image: url(/src/assets/img/img.jpg)"
            >
                <div
                    class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"
                ></div>
                <div class="w-full max-w-md z-10">
                    <div
                        class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6 select-none"
                    >欢迎光临</div>
                    <div
                        class="sm:text-sm xl:text-md text-gray-200 font-normal"
                    >欢迎来到好玩俱乐部，在这里和志同道合的朋友一起分享有趣的故事，一起组织有趣的活动...</div>
                </div>
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div
                class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white select-none"
            >
                <!-- 这里是组件 -->
                <Transition name="fade" mode="out-in">
                    <keep-alive>
                        <component
                            :is="typeComponentMap[pageParams.type]"
                            @notice="page"
                            class="tab"
                        ></component>
                    </keep-alive>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.circles li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
}
.circles li:nth-child(1) {
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}
.circles li:nth-child(2) {
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}
.circles li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}
.circles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}
.circles li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}
.circles li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}
.circles li:nth-child(7) {
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}
.circles li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}
.circles li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}
.circles li:nth-child(10) {
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}
@keyframes animate {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }
}
</style>