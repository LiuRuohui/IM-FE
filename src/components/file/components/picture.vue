<script setup>
import { filePreview } from "../../../composables/data/file";
import VueEasyLightbox from "vue-easy-lightbox";
import {ref, reactive} from "vue"

const img = reactive({
  imgs:"",
  visiable: false,
})

function show(){
  console.log(img)
  img.imgs = filePreview.Url
  img.visiable = true
  console.log("123",img)
}

function handleHide(){
  img.visiable = false
}
</script>

<template>
  <div class="w-full m-8 border-2 border-red-100" @click="show">
    <vue-easy-lightbox
      :imgs="img.imgs"
      :visable="img.visiable"
      @hide="handleHide"
      escDisabled
      moveDisabled
    ></vue-easy-lightbox>
    <!--<iframe :src="filePreview.Url" frameborder="0" class="w-full h-full"></iframe> -->
  </div>
</template>
