<script setup>
	import { ref, onMounted, defineAsyncComponent } from "vue";
	import mobile from "../../composables/mobile";
	import searchGroup from "./searchGroup.vue";
	import { Group } from "../../composables/api";
	import { groupPreview } from "../../composables/data/group";
	import { now } from "../../composables/data/now";

	//加载异步组件
	const createGroup = defineAsyncComponent(() => import("./createGroup.vue"));
	const groupChat = defineAsyncComponent(() => import("./groupChat.vue"));

	let groups = Group.data();

	const turn = mobile();

	const height = ref("0px");
	const noteContainer = ref(null);

	let time = ref("");
	let t = new Date();
	time = getTime(t);
	let isShow = ref(1);
	let showChat = ref(0);
	let msg = ref("创建群组");

	const typeComponentMap = {
		1: searchGroup,
		2: createGroup,
	};

	const chatMap = {
		1: groupChat,
	};

	onMounted(() => {
		height.value = noteContainer.value.offsetHeight + "px";
	});

	function getTime(time) {
		let transferTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		console.log(transferTime);
		return transferTime;
	}

	function createGroups() {
		showChat.value = 0;
		if (msg.value == "创建群组") {
			isShow.value = 2;
			msg.value = "搜索群组";
		} else if (msg.value == "搜索群组") {
			isShow.value = 1;
			msg.value = "创建群组";
		}
	}

	function turnToChat(group) {
		showChat.value = 1;
		isShow.value = 0;
		groupPreview.name = group.name;
		groupPreview.groupId = group.groupId;
		groupPreview.joinTime = group.joinTime;
		groupPreview.ownerId = group.ownerId;
		groupPreview.intro = group.intro;
		// console.log("99999", group);
		now.group.id = group.groupId;
		console.log("id更改为:", now.group.id);
		now.group.name = group.name;
		now.group.joinTime = group.joinTime;
		now.group.ownerId = group.ownerId;
		now.group.intro = group.intro;
	}

	function deleteGroup() {
		console.log("deleteGroup");
	}
	function name(params) {
		console.log(params);
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
			class="w-full lg:w-96 h-full flex flex-col overflow-hidden select-none border-r"
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
				<div class="opacity-60 hover:cursor-pointer" @click="createGroups">
					{{ msg }}
					<div class="inline-block item-center">
						<img class="h-9 inline-block" src="/src/assets/img/plus.svg" />
					</div>
				</div>
			</div>
			<div class="w-full h-full flex-grow bg-gray-50" ref="noteContainer">
				<div class="w-full h-full overflow-y-auto no-scrollbar" :style="{ height: height }">
					<div class="flex flex-col my-4 mx-8">
						<div
							class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer md:px-2 my-2 bg-white"
							@click="turnToChat(group)"
							v-for="group in groups"
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
										{{ group.name }}
									</div>
								</div>
								<div
									class="inline-block truncate opacity-40 text-sm group-hover:opacity-70 h-1/2 pt-1"
								>
									{{ group.intro }}
								</div>
							</div>
							<div class="flex flex-grow flex-row-reverse pr-4">
								<img
									src="/src/assets/img/delete.svg"
									@click="deleteGroup"
									alt=""
									class="w-8 h-8 opacity-60"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex-grow h-full max-h-screen lg:block" :class="turn.value ? '' : 'hidden'">
			<!--切换组件部分更流畅-->
			<Transition name="fade" mode="out-in">
				<keep-alive>
					<component @go="createGroups" :is="typeComponentMap[isShow]"></component>
				</keep-alive>
			</Transition>
			<Transition name="fade" mode="out-in">
				<keep-alive>
					<component @go="turnToChat" :is="chatMap[showChat]"></component>
				</keep-alive>
			</Transition>
		</div>
	</div>
</template>
<style>
	.frame {
		height: calc(100% - 5.5rem);
	}
</style>
