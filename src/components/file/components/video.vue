<script setup>
import VamVideo from "vue-vam-video";
import { filePreview } from "../../../composables/data/file";
import { reactive } from "vue";
const videoOption = reactive({
  properties: {
    src: filePreview.Url,
  },
  videoStyle: {
    width: "100%",
  },
  controlsConfig: {
    fullScreenTit: "全屏",
    EscfullScreenTit: "退出全屏",
    speedTit: "倍速",
    playTit: "播放",
    pauseTit: "暂停",
    fullScreen: true,
    speed: true,
    listen: true,
  },
});
</script>

<template>
  <div class="w-full m-8 border-2 border-red-100">
    <vam-video
      :properties="videoOption.properties"
      :videoStyle="videoOption.videoStyle"
      :controlsConfig="videoOption.controlsConfig"
      @play="playVideo"
      @canplay="canplayVideo"
      @pause="pauseVideo"
    >
    </vam-video>
  </div>
</template>
