<script setup>
	import { ref } from "vue";

	const account = ref("");
	const emit = defineEmits(["notice"]);

	//用户名要求，四到十位英文数字混合
	var accountRegexp = /^[a-zA-Z0-9_]{4,10}$/;
	var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

	function nextStep() {
		if (!accountRegexp.test(account.value)) {
			console.log("账号或邮箱格式不符合要求!");
		}
		console.log(account.value);
	}
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
						v-model="account"
						autocomplete="name"
						required
						class="inputFrame"
						placeholder="请输入邮箱或者账号"
					/>
				</div>
			</div>
			<div>
				<button class="btn select-none" @click="nextStep">下一步</button>
			</div>
			<p
				class="items-center justify-center mt-10 text-center text-md text-gray-500 select-none"
			>
				<span>已有账号？</span>
				<a
					class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
					@click="emit('notice', '')"
					>立即登录</a
				>
			</p>
		</div>
	</div>
</template>

<style></style>
