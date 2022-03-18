<script setup>

const emit = defineEmits(['notice'])

</script>

<template>
    <div class="max-w-md w-full mx-auto space-y-8">
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900 select-none">欢迎回来</h2>
        </div>
        <div class="flex items-center justify-center space-x-2"></div>
        <div class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm">
                <div class="py-2">
                    <label class="label select-none" for="account">账号:</label>
                    <input
                        id="account"
                        name="account"
                        type="account"
                        autocomplete="name"
                        required
                        class="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        placeholder="请输入账号"
                    />
                </div>
                <div class="py-2">
                    <label class="label select-none" for="passwd">密码:</label>
                    <input
                        id="passwd"
                        name="passwd"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                        placeholder="请输入密码"
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
                    <label
                        for="remember_me"
                        class="ml-2 block text-sm text-gray-900 select-none"
                    >记住我</label>
                </div>
                <div class="text-sm">
                    <a
                        class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                        @click="emit('notice', 'forgetPasswd')"
                    >忘记密码？</a>
                </div>
            </div>
            <div>
                <button class="btn select-none">登录</button>
            </div>
            <p
                class="items-center justify-center mt-10 text-center text-md text-gray-500 select-none"
            >
                <span>还没有账号？</span>
                <a
                    class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    @click="emit('notice', 'register')"
                >立即注册</a>
            </p>
        </div>
    </div>
</template>

<style></style>