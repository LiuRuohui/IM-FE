<script setup>
const emit = defineEmits(['go']);
</script>
<template>
    <div class="w-96 h-screen flex flex-col antialiased border-r border-gray-200">
        <div class="w-full h-1/5 flex flex-col">
            <div class="w-1/3 h-auto mt-8 rounded-full ml-auto mr-auto select-none relative">
                <img class="drag rounded-full" src="/src/assets/avatar/squidWard.jpg" alt="头像" />
                <img
                    class="drag w-6 h-6 absolute bottom-0 right-0 bg-blue-300 rounded-full p-2 box-content cursor-pointer"
                    @click="emit('go')"
                    src="/src/assets/img/save.svg"
                    alt
                />
            </div>
        </div>
        <div class="w-4/5 flex-grow ml-auto mr-auto">
            <div class="mt-6 w-full">
                <p
                    class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
                >基本信息</p>
                <p class="mt-3 mb-1 text-sm">昵称：</p>
                <input
                    class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                    type="text"
                    placeholder="请输入昵称"
                />
                <div class="flex w-full mt-3">
                    <div class="w-1/2">
                        <p class="text-sm">性别：</p>
                        <div class="w-full flex mt-1">
                            <div class="w-1/2 text-sm">
                                男
                                <input type="radio" name="sex" id />
                            </div>

                            <div class="w-1/2 text-sm">
                                女
                                <input type="radio" name="sex" id />
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <!-- <p>地区：</p> -->
                    </div>
                </div>
                <div class="mt-2">
                    <p class="text-sm">个性签名：</p>
                    <input
                        class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                        type="text"
                        placeholder="请输入个性签名"
                    />
                </div>
            </div>
            <div class="mt-6 w-full">
                <p
                    class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
                >联系信息：</p>
                <p class="mt-3 mb-1 text-sm">联系电话：</p>
                <input
                    class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                    type="text"
                    placeholder="请输入联系电话"
                />
                <p class="mt-3 mb-1 text-sm">电子邮箱：</p>
                <input
                    class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                    type="text"
                    placeholder="请输入电子邮箱"
                />
                <p class="mt-3 mb-1 text-sm">个人网站：</p>
                <input
                    class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                    type="text"
                    placeholder="请输入个人网站"
                />
            </div>
            <div class="mt-6 w-full">
                <p
                    class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
                >社交信息：</p>
                <div class="w-full flex mt-3">
                    <div class="w-6 h-6 rounded-full">
                        <img src="/src/assets/img/github.svg" alt="github" />
                    </div>
                    <div class="flex-grow pl-3 pr-3">
                        <input
                            class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                            type="text"
                            placeholder="请输入个人网站"
                        />
                    </div>
                </div>
                <div class="w-full flex mt-3">
                    <div class="w-6 h-6 rounded-full">
                        <img src="/src/assets/img/weibo.svg" alt="weibo" />
                    </div>
                    <div class="flex-grow pl-3 pr-3">
                        <input
                            class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                            type="text"
                            placeholder="请输入个人网站"
                        />
                    </div>
                </div>
                <div class="w-full flex mt-3">
                    <div class="w-6 h-6 rounded-full">
                        <img src="/src/assets/img/qq.svg" alt="qq" />
                    </div>
                    <div class="flex-grow pl-3 pr-3">
                        <input
                            class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
                            type="text"
                            placeholder="请输入个人网站"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>