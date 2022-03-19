<script setup></script>
<template>
    <div class="w-96 h-screen flex flex-col">
        <div class="w-full h-1/3 flex flex-col">
            <div class="w-full h-2/3 overflow-hidden relative">
                <div
                    class="w-1/3 h-auto mt-8 rounded-full overflow-hidden ml-auto mr-auto select-none"
                >
                    <img class="drag" src="/src/assets/avatar/squidWard.jpg" alt="头像" />
                </div>
                <div
                    class="w-3/5 ml-auto mr-auto mt-9 text-center font-serif subpixel-antialiased underline select-none truncate"
                >Squidward Tentacles</div>
            </div>
            <div class="flex-grow relative flex flex-col items-center justify-center select-none">
                <div
                    class="mb-7 w-2/3 truncate text-gray-400 text-sm"
                    title="Peace comes from within. Do not seek it without!"
                >Peace comes from within. Do not seek it without!</div>
                <div class="flex justify-between w-1/3 ml-auto mr-auto mb-8">
                    <div class="w-7 h-auto">
                        <a href>
                            <img class="drag" src="/src/assets/img/weibo.svg" alt="weibo" />
                        </a>
                    </div>
                    <div class="w-7 h-auto">
                        <a href>
                            <img class="drag" src="/src/assets/img/github.svg" alt="github" />
                        </a>
                    </div>
                    <div class="w-7 h-auto">
                        <a href>
                            <img class="drag" src="/src/assets/img/qq.svg" alt="qq" />
                        </a>
                    </div>
                </div>
                <div class="absolute bottom-0.5 w-full h-px">
                    <span class="ml-auto mr-auto block w-4/5 h-px bg-gray-200"></span>
                </div>
            </div>
        </div>

        <div class="w-full h-1/6 flex items-center relative">
            <div
                class="w-full h-2/3 flex flex-col justify-center text-sm subpixel-antialiased font-sans"
            >
                <p class="text-left ml-16 mt-1 mb-2">
                    <span class="text-gray-300 select-none">联系电话：</span>
                    <span>17519137795</span>
                </p>
                <p class="text-left ml-16 mt-1 mb-2">
                    <span class="text-gray-300 select-none">电子邮件：</span>
                    <a target="_blank" href="mailto:jinzhongjia@qq.com">
                        <span>jinzhongjia@qq.com</span>
                    </a>
                </p>
                <p class="text-left ml-16 mt-1 mb-2">
                    <span class="text-gray-300 select-none">个人网站：</span>
                    <a target="_blank" href="https://jinzh.me/">
                        <span>https://jinzh.me/</span>
                    </a>
                </p>
            </div>
            <div class="absolute bottom-0.5 w-full h-px">
                <span class="ml-auto mr-auto block w-4/5 h-px bg-gray-200"></span>
            </div>
        </div>
        <div class="flex-grow w-full flex flex-col">
            <div class="w-3/4 flex-grow ml-auto mr-auto">
                <div class="h-8 ml-auto mr-auto mt-4 relative select-none">
                    <span class="left-2 absolute text-sm text-gray-300">相册（50）</span>
                    <span
                        class="absolute text-sm text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300 right-2"
                    >查看全部></span>
                </div>
                <div class="flex justify-around select-none">
                    <div class="w-20 h-20 overflow-hidden bg-blue-300">
                        <img
                            class="object-cover w-full h-full drag"
                            src="/src/assets/pic/233957.jpg"
                            alt
                        />
                    </div>
                    <div class="w-20 h-20 overflow-hidden bg-blue-300">
                        <img
                            class="object-cover w-full h-full drag"
                            src="/src/assets/pic/450824.jpg"
                            alt
                        />
                    </div>
                    <div class="w-20 h-20 overflow-hidden bg-blue-300">
                        <img
                            class="object-cover w-full h-full drag"
                            src="/src/assets/pic/914657.jpg"
                            alt
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>