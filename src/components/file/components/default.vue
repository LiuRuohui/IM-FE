<script setup>
import { filePreview } from "../../../composables/data/file";
function upload() {
  let link = document.createElement("a");
  //设置下载的文件名
  link.download = filePreview.Name;
  link.style.display = "none";
  //设置下载路径
  link.href = filePreview.Url;
  console.log(link.download);
  console.log(link.href);
  //触发点击
  document.body.appendChild(link);
  link.click();
  //移除节点
  document.body.removeChild(link);
}
</script>

<template>
  <div class="w-full justify-center flex">
    <div>
      <button class="btn top-1/2 relative" @click="upload">点击下载</button>
    </div>
  </div>
</template>
