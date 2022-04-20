<script setup>
	import { File } from "../../../composables/api";
	function upload() {
		let s = document.getElementById("file");
		let formData = new FormData();
		formData.append("file", s.files[0]);
		//判断 若文件为空则判定为误触直接返回
		if (s.files[0] == undefined) {
			console.log("上传的文件为空，请重试！");
			return;
		}
		/*
  var reader = new FileReader(); //新建一个FileReader
  reader.readAsText(s.files[0], "UTF-8"); //读取文件
  reader.onload = function (evt) {
    //读取完文件之后会回来这里
    var fileString = evt.target.result; // 读取文件内容
    console.log(fileString);
  };
  */
		//提交文件
		File.upload(formData);
	}
</script>

<template>
	<div
		class="w-full flex h-full bg-white select-none items-center justify-center rounded-r-xl rounded-l-xl shadow-lg"
	>
		<div class="flex flex-col">
			<div class="text-center font-medium my-2">请选择文件上传</div>
			<div>
				<input
					type="file"
					id="file"
					name="file"
					class="block w-full text-sm text-slate-500 file:mr-8 file:py-2 file:px-10 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:cursor-pointer"
				/>
			</div>
			<div>
				<button class="btn mt-4" @click="upload">确认上传</button>
			</div>
		</div>
	</div>
</template>
