
<script setup>
const emit = defineEmits(['notice'])
</script>

<template>
    <div class="max-w-md w-full mx-auto space-y-8">
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900 select-none">找回密码</h2>
        </div>
        <div class="flex items-center justify-center space-x-2"></div>
        <div class="mt-8 space-y-6">
            <div class="rounded-md">
                <div class="py-6">
                    <label class="label select-none" for="account">账号:</label>
                    <input
                        id="account"
                        name="account"
                        type="account"
                        autocomplete="name"
                        required
                        class="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                        placeholder="请输入邮箱或者账号"
                    />
                </div>
            </div>
            <div>
                <button class="btn select-none">下一步</button>
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