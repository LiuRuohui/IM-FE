<script setup>
import { filePreview } from "../../../composables/data/file";
function download() {
  console.log("Downloading");
}
</script>

<template>
  <div class="w-full justify-center flex">
    <a :href="filePreview.Url">
      <button @click="download" class="btn top-1/2 relative">点击下载</button>
    </a>
  </div>
</template>
