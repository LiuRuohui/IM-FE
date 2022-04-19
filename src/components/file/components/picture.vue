<script setup>
import {filePreview} from "../../../composables/data/file"
</script>

<template>
  <div class="w-full m-8 border-2 border-red-100">
    <iframe :src="filePreview.Url" frameborder="0" class="w-full h-full"></iframe>
  </div>
</template>