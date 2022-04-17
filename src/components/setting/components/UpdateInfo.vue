<script setup>
	import { Info } from "/src/composables/data/info";
	import { onMounted } from "vue";

	onMounted(() => {
		Info.getInfos();
		if (Info.data.Sex == false) {
			document.getElementById("male").checked = true;
			document.getElementById("female").checked = false;
		} else {
			document.getElementById("male").checked = false;
			document.getElementById("female").checked = true;
		}
	});
</script>
<template>
	<div class="w-4/5 ml-auto mr-auto select-none info overflow-y-auto no-scrollbar">
		<div class="mt-6 w-full">
			<p
				class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
			>
				基本信息
			</p>
			<p class="mt-3 mb-1 text-sm">昵称：</p>
			<input
				class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
				type="text"
				v-model="Info.data.Name"
				placeholder="请输入昵称"
			/>
			<div class="flex w-full mt-3">
				<div class="w-1/2">
					<p class="text-sm">性别：</p>
					<div class="w-full flex mt-1">
						<div class="w-1/2 text-sm">
							男
							<input
								type="radio"
								name="sex"
								checked
								id="male"
								v-model="Info.data.Sex"
								value="0"
							/>
						</div>

						<div class="w-1/2 text-sm">
							女
							<input
								type="radio"
								name="sex"
								checked
								id="female"
								v-model="Info.data.Sex"
								value="1"
							/>
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
					v-model="Info.data.Signature"
					placeholder="请输入个性签名"
				/>
			</div>
		</div>
		<div class="mt-6 w-full">
			<p
				class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
			>
				联系信息：
			</p>
			<p class="mt-3 mb-1 text-sm">联系电话：</p>
			<input
				class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
				type="text"
				v-model="Info.data.Phone"
				placeholder="请输入联系电话"
			/>
			<p class="mt-3 mb-1 text-sm">电子邮箱：</p>
			<input
				class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
				type="text"
				v-model="Info.data.Mail"
				placeholder="请输入电子邮箱"
			/>
			<p class="mt-3 mb-1 text-sm">个人网站：</p>
			<input
				class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
				type="text"
				v-model="Info.data.Site"
				placeholder="请输入个人网站"
			/>
		</div>
		<div class="mt-6 w-full">
			<p
				class="w-full font-sans text-lg antialiased font-semibold tracking-wider text-gray-700"
			>
				社交信息：
			</p>
			<div class="w-full flex mt-3">
				<div class="w-6 h-6 rounded-full">
					<img src="/src/assets/img/github.svg" alt="github" />
				</div>
				<div class="flex-grow pl-3 pr-3">
					<input
						class="w-full bg-inherit border-b border-gray-100 outline-none text-sm placeholder-gray-300"
						type="text"
						v-model="Info.data.Github"
						placeholder="请输入github地址"
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
						v-model="Info.data.Weibo"
						placeholder="请输入微博地址"
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
						v-model="Info.data.Qq"
						placeholder="请输入QQ号码"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.info {
		height: calc(100% - 10rem);
	}
</style>
