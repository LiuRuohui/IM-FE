<script setup>
	import mobile from "../../composables/mobile";
	import { reactive, ref, onMounted } from "vue";

	const notebooks = reactive({
		id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		message: [],
	});
	const turn = mobile();

	const height = ref("0px");
	const chatHeight = ref("0px");
	const noteContainer = ref(null);
	const chatContainer = ref(null);
	const message = ref("");
	const message_array = reactive([]);
	const message1 = ref("");
	const message_array1 = reactive([]);

	let time = ref("");
	let t = new Date();
	time = getTime(t);

	onMounted(() => {
		height.value = noteContainer.value.offsetHeight + "px";
		chatHeight.value = chatContainer.value.offsetHeight + "px";
	});

	function getTime(time) {
		let transferTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		console.log(transferTime);
		return transferTime;
	}

	function sendMsg() {
		t = new Date();
		time = getTime(t);
		if (message == null || message.value == "") {
			alert("消息不能为空！");
			return;
		}
		message_array.push(message.value);
		message.value = "";
	}

	function sendMsg1() {
		t = new Date();
		time = getTime(t);
		if (message1 == null || message1.value == "") {
			alert("消息不能为空！");
			return;
		}
		message_array1.push(message1.value);
		message1.value = "";
	}
</script>

<template>
	<div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
		<span
			class="absolute right-3 md:hidden"
			@click="turn.switch"
			:class="turn.value ? 'bottom-12' : 'bottom-3'"
		>
			<img class="h-10 w-10" :src="turn.img" alt="turn" />
		</span>
		<div
			class="w-full md:w-96 h-full flex flex-col overflow-hidden select-none border-r"
			:class="turn.value ? 'hidden' : ''"
		>
			<div class="w-full h-16 flex justify-center items-center my-2 border-b border-gray-50">
				<div class="w-5/6 relative">
					<input
						class="box-border rounded-full h-9 pl-14 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
						type="text"
						placeholder="请输入搜索的内容"
					/>
					<img
						class="box-content w-5 h-5 absolute top-2 left-6 border-gray-300 drag"
						src="/src/assets/img/search.svg"
					/>
				</div>
			</div>
			<div class="w-5/6 flex mx-auto">
				<div class="opacity-60 mt-1 flex-1">
					列表排序:
					<select class="outline-none border-none font-bold text-center">
						<option value>新添加优先</option>
						<option value>后添加优先</option>
					</select>
				</div>
				<div class="opacity-60">
					创建会话
					<div class="inline-block item-center">
						<img class="h-9 inline-block" src="/src/assets/img/加号.svg" />
					</div>
				</div>
			</div>
			<div class="w-full h-full flex-grow bg-gray-50" ref="noteContainer">
				<div class="w-full h-full overflow-y-auto no-scrollbar" :style="{ height: height }">
					<div class="flex flex-col my-4 mx-8">
						<div
							class="group flex items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer md:px-2 my-2 bg-white"
							v-for="notes in notebooks.id"
						>
							<div
								class="mx-4 w-10 h-10 md:w-12 md:h-12 rounded-full my-4 m-auto relative box-border group-hover:border-2 border-blue-500"
							>
								<div
									class="absolute top-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-600 border-4 border-slate-100"
								></div>
								<img
									class="rounded-full"
									src="/src/assets/avatar/squidWard.jpg"
									alt="章鱼哥"
								/>
							</div>
							<div class="flex flex-col flex-grow h-full justify-center pl-2 pr-3">
								<div class="flex h-1/2 pt-6">
									<div
										class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center"
									>
										楚中天
									</div>
								</div>
								<div
									class="inline-block truncate opacity-40 text-sm group-hover:opacity-70 h-1/2 pt-1"
								>
									前端工程师
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="h-screen flex-grow flex-col md:block select-none"
			:class="turn.value ? '' : 'hidden'"
		>
			<div class="flex flex-col">
				<div
					class="w-full h-16 box-content overflow-hidden mx-auto flex flex-row border-1 shadow"
				>
					<div
						class="flex mx-4 w-8 h-12 md:w-12 md:h-12 rounded-full my-3 m-auto relative box-border"
					>
						<div
							class="absolute top-0.5 w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-600 border-2 border-slate-100"
						></div>
						<img
							class="rounded-full"
							src="/src/assets/avatar/squidWard.jpg"
							alt="章鱼哥"
						/>
					</div>
					<div class="flex flex-col justify-center mr-4">
						<div class="flex h-1/2 pt-4">
							<div class="font-bold text-sm opacity-70 flex items-center">林凌</div>
						</div>
						<div class="truncate opacity-40 text-xs h-1/2 pt-1">在线</div>
					</div>
					<div class="flex-grow flex flex-row-reverse py-4 pr-4">
						<div class="hover:cursor-pointer md:w-12">
							<img
								class="h-10 opacity-60 hover:opacity-100"
								src="/src/assets/img/更多.svg"
								alt="更多"
							/>
						</div>
						<div class="hover:cursor-pointer md:w-12">
							<img
								class="h-10 opacity-60 hover:opacity-100"
								src="/src/assets/img/视频.svg"
								alt="视频"
							/>
						</div>
					</div>
				</div>
				<div class="w-full bg-slate-100" ref="chatContainer">
					<div
						class="w-full frame flex flex-col overflow-y-auto"
						:style="{ height: height }"
					>
						<div class="w-2/5 flex flex-col">
							<div
								v-for="items in message_array"
								class="ml-2 h-8 word-wrap mt-4 mb-6 rounded-full px-3 pt-1 text-left shadow-md hover:cursor-pointer opacity-90 bg-blue-500 text-white"
							>
								{{ items }}
								<div
									class="w-full h-4 mt-2 pr-1 flex-grow text-xs text-black opacity-40"
								>
									{{ time }}
								</div>
							</div>
						</div>
						<div class="w-auto h-auto flex flex-col absolute right-0">
							<div
								v-for="items in message_array1"
								class="mr-2 h-8 mt-3 mb-6 rounded-full px-3 pt-1 text-right shadow-md hover:cursor-pointer opacity-90 bg-blue-500 text-white"
							>
								{{ items }}
								<div
									class="w-full h-4 mt-2 pr-1 flex-grow text-xs text-black opacity-40 text-right"
								>
									{{ time }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-full h-8 justify-center items-center flex pt-2 bg-slate-100">
					<div class="w-full relative flex">
						<input
							class="w-full h-10 rounded-full box-border pl-16 pr-4 py-3 outline-none text-sm select-none border border-gray-100 focus:border-gray-200"
							type="text"
							placeholder="请输入想和对方说的话"
							@keyup.enter="sendMsg"
							v-model="message"
						/>
						<img
							class="absolute w-6 h-6 md:left-7 drag bottom-1.5 opacity-60"
							src="/src/assets/img/链接.svg"
						/>
						<img
							class="md:right-12 buttom-1 my-2.5 w-6 h-6 absolute opacity-60 hover:opacity-100 hover:cursor-pointer"
							src="/src/assets/img/微笑.svg"
							alt="表情"
						/>
						<img
							class="md:right-4 buttom-1 my-2.5 w-6 h-6 absolute opacity-80 hover:opacity-100 hover:cursor-pointer"
							src="/src/assets/img/发送.svg"
							alt="发送"
							@click="sendMsg"
						/>
					</div>
				</div>
				<!--<div class="w-full justify-center items-center flex">
                <div class="w-full relative h-8 flex shadow-sm">
                     <input class="w-full h-8 rounded-full box-border relative pl-16 pr-4 py-3 outline-none bg-gray-100 text-sm select-none" type="text" placeholder="请输入想和对方说的话"  @keyup.enter="sendMsg1" v-model="message1">
                      <img class=" absolute w-6 h-6 md:left-7 drag bottom-1 opacity-60" src="/src/assets/img/链接.svg"/>
                      <img class="md:right-12 buttom-1 mt-1 w-6 h-6 absolute opacity-60 hover:opacity-100 hover:cursor-pointer" src="/src/assets/img/微笑.svg" alt="表情">
                      <img class="md:right-4 buttom-1 mt-1 w-6 h-6 absolute opacity-80 hover:opacity-100 hover:cursor-pointer" src="/src/assets/img/发送.svg" alt="发送" @click="sendMsg1">
                </div>
                </div>-->
			</div>
		</div>
	</div>
</template>
<style>
	.frame {
		height: calc(100% - 5.5rem);
	}
</style>
