<script setup>
	import { reactive, ref, onMounted, computed } from "vue";
	import { groupPreview } from "../../composables/data/group";
	import { Group } from "../../composables/api";
	import { message as encode, Msg, socket } from "../../composables/websocket/ws";
	import { now } from "../../composables/data/now";

	const height = ref("0px");
	const chatContainer = ref(null);
	const message = ref("");
	const message_array1 = reactive([]);

	let time = ref("");
	let t = new Date();
	time = getTime(t);

	onMounted(() => {
		height.value = chatContainer.value.offsetHeight + "px";
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
		let mm = new Msg("", now.group.id, "", 1, message.value);
		let buffer = encode(mm);
		socket.send(buffer);

		message.value = "";
	}
	function name(params) {
		console.log("群组的消息消息", params);
	}
	const messages = computed(() => {
		let mm = Group.message();
		console.log("当前id", now.group.id);
		let tmp = mm.value.get(now.group.id);
		console.log(tmp);
		if (typeof tmp == "undefined") {
			return [];
		}
		tmp.sort(function (a, b) {
			return a.SendTime - b.SendTime;
		});
		return tmp;
	});
</script>

<template>
	<div class="flex flex-col h-full overflow-y-auto no-scrollbar">
		<div class="w-full h-16 box-content overflow-hidden mx-auto flex flex-row shadow">
			<div class="flex mx-4 sm:w-12 sm:h-12 rounded-full my-3 m-auto relative box-border">
				<div
					class="absolute top-0.5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600 border-2 border-slate-100"
				></div>
				<img
					class="rounded-full sm:h-10 sm:w-10"
					src="/src/assets/avatar/squidWard.jpg"
					alt="章鱼哥"
				/>
			</div>
			<div class="flex flex-col justify-center mr-4">
				<div class="flex h-1/2 pt-4">
					<div class="font-bold text-sm opacity-70 flex items-center">
						{{ groupPreview.name }}
					</div>
				</div>
				<div class="truncate opacity-40 text-xs h-1/2 pt-1">{{ groupPreview.intro }}</div>
			</div>
			<div class="flex-grow flex flex-row-reverse py-4 pr-4">
				<div class="hover:cursor-pointer sm:w-12">
					<img
						class="h-10 opacity-60 hover:opacity-100"
						src="/src/assets/img/more.svg"
						alt="更多"
					/>
				</div>
				<div class="hover:cursor-pointer md:w-12">
					<img
						class="h-10 opacity-60 hover:opacity-100"
						src="/src/assets/img/video.svg"
						alt="视频"
					/>
				</div>
			</div>
		</div>
		<div class="w-full bg-slate-100 flex flex-grow" ref="chatContainer">
			<div class="w-full overflow-y-auto no-scrollbar" :style="{ height: height }">
				<div class="w-2/5 flex flex-col">
					<div
						v-for="items in messages"
						class="ml-2 h-8 word-wrap mt-4 mb-6 rounded-full px-3 pt-1 text-left shadow-md hover:cursor-pointer opacity-90 bg-blue-500 text-white"
					>
						<!-- {{ name(Group.message().value.get(info.data.ID)) }} -->
						{{ items.Body }}
						<div class="w-full h-4 mt-2 pr-1 flex-grow text-xs text-black opacity-40">
							{{ time }}
						</div>
					</div>
				</div>
				<div class="w-2/5 flex flex-col relative float-right">
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
		<div class="w-full h-8 justify-center items-center flex bg-slate-100">
			<div class="w-full relative flex flex-row">
				<input
					class="w-full h-10 rounded-full box-border pl-16 pr-4 py-3 outline-none text-sm select-none border border-gray-100 focus:border-gray-200"
					type="text"
					placeholder="请输入想和对方说的话"
					@keyup.enter="sendMsg"
					v-model="message"
				/>
				<img
					class="absolute w-6 h-6 sm:left-7 drag bottom-1.5 opacity-60"
					src="/src/assets/img/link.svg"
				/>
				<img
					class="sm:right-12 buttom-1 my-2.5 w-6 h-6 absolute opacity-60 hover:opacity-100 hover:cursor-pointer"
					src="/src/assets/img/smile.svg"
					alt="表情"
				/>
				<img
					class="sm:right-4 buttom-1 my-2.5 w-6 h-6 absolute opacity-80 hover:opacity-100 hover:cursor-pointer"
					src="/src/assets/img/send.svg"
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
</template>

<style></style>
