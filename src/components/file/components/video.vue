<script setup>
	import { onMounted, ref } from "vue";
	import { filePreview } from "../../../composables/data/file";
	import Player from "xgplayer/dist/simple_player";

	const mse = ref(null);
	onMounted(() => {
		let player = new Player({
			el: mse.value,
			url: filePreview.Url,
			width: 800,
			height: 500,
		});
	});
</script>

<template>
	<div class="w-full flex justify-center items-center">
		<div class="video-container">
			<div ref="mse"></div>
		</div>
	</div>
</template>

<style scoped>
	.video-container {
		width: 800px;
	}
</style>
