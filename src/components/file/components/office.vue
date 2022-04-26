<script setup>
import { filePreview } from "../../../composables/data/file";
</script>

<template>
  <div class="w-full">
    <iframe
      :src="
        'https://view.officeapps.live.com/op/view.aspx?src=' + filePreview.Url
      "
      frameborder="0"
      class="w-full h-full select-none"
    ></iframe>
  </div>
</template>
