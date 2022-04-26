<script setup>
import { filePreview } from "../../../composables/data/file";
</script>

<template>
  <div class="w-full flex justify-center">
    <audio :src="filePreview.Url" controls class="relative top-1/2"></audio>
  </div>
</template>
