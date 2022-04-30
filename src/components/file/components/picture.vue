<script setup>
	import { ref, reactive } from "vue";
	import { filePreview } from "../../../composables/data/file";
	import VueEasyLightbox from "vue-easy-lightbox";

	const img = reactive({
		imgs: "",
		visible: false,
	});

	function show() {
		img.imgs = filePreview.Url;
		img.visible = true;
	}

	function handleHide() {
		img.visible = false;
		console.log(img.visible);
	}
</script>

<template>
	<div class="w-full h-full flex justify-center items-center">
		<vue-easy-lightbox
			:imgs="img.imgs"
			:visible="img.visible"
			@hide="handleHide"
		></vue-easy-lightbox>
		<div class="img-box rounded-md overflow-hidden cursor-pointer shadow-2xl" @click="show">
			<img class="drag" :src="filePreview.Url" alt="点击查看" />
		</div>
	</div>
</template>

<style scoped>
	.img-box {
		max-width: 800px;
	}
</style>
