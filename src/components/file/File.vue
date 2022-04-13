<script setup>
	import { reactive, ref, onMounted } from "vue";
	import mobile from "../../composables/mobile";
	const height = ref("0px");
	const fileContainer = ref(null);

	const files = reactive({
		id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		message: [],
	});
	const turn = mobile();

	onMounted(() => {
		height.value = fileContainer.value.offsetHeight + "px";
	});
</script>

<template>
	<div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
		<span class="absolute bottom-3 right-3 lg:hidden z-50" @click="turn.switch">
			<img class="h-10 w-10" :src="turn.img" alt="down" />
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
				<div class="opacity-60 my-1.5 flex-1 text-sm">
					列表排序:
					<select class="outline-none border-none font-bold text-center">
						<option value>最新文件优先</option>
						<option value>最后文件优先</option>
					</select>
				</div>
			</div>
			<div class="w-full flex-grow bg-gray-50" ref="fileContainer">
				<div class="w-full overflow-y-auto no-scrollbar" :style="{ height: height }">
					<div class="flex flex-col my-4 mx-8">
						<div
							class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer mb-3 bg-white md:px-2"
							v-for="notes in files.id"
						>
							<div class="h-full flex items-center">
								<div class="h-16 w-16 bg-blue-300">
									<img
										src="/src/assets/img/压缩文件.svg"
										alt
										class="py-2 h-full w-auto drag mx-2 inline-block"
									/>
								</div>
							</div>
							<div class="flex flex-col flex-grow h-full justify-center pl-2 pr-3">
								<div class="flex h-1/2 pt-2">
									<div class="w-full flex flex-row">
										<div
											class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center"
										>
											<div class="font-bold text-base">Sourcecode.zip</div>
										</div>
										<div
											class="flex flex-row-reverse opacity-30 group-hover:opacity-60"
										>
											<img src="/src/assets/img/更多.svg" alt="更多" />
										</div>
									</div>
								</div>
								<div class="inline-block truncate opacity-70 text-sm h-1/2">
									<div class="flex flex-row">
										<div class="flex text-sm opacity-50 group-hover:opacity-90">
											1.5M
										</div>
										<div
											class="flex text-sm flex-grow flex-row-reverse opacity-50 group-hover:opacity-90"
										>
											2022-06-12
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="flex-grow h-full max-h-screen lg:block"
			:class="turn.value ? '' : 'hidden'"
		></div>
	</div>
</template>

<style></style>
