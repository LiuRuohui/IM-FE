<script setup>
import { filePreview } from "../../../composables/data/file";
</script>

<template>
  <div class="w-full justify-center flex">
    <a :href="filePreview.Url">
      <button class="btn top-1/2 relative">点击下载</button>
    </a>
  </div>
</template>
