<script setup>
import { filePreview } from "../../../composables/data/file";
import { defineAsyncComponent } from "vue"

import { debounce, determineVue, determineImg } from "../../../composables/tool";
import { File } from "../../../composables/api";

//加载异步组件
const Office = defineAsyncComponent(() => import("./office.vue"));
const Txt = defineAsyncComponent(() => import("./txt.vue"));
const Audio = defineAsyncComponent(() => import("./audio.vue"));
const Default = defineAsyncComponent(() => import("./default.vue"));
const Picture = defineAsyncComponent(() => import("./picture.vue"));
const Video = defineAsyncComponent(() => import("./video.vue"));

const fileTypeMap = {
  1: Office,
  2: Txt,
  3: Audio,
  4: Default,
  5: Picture,
  6: Video,
};

const reminder = debounce(() => {
  File.updateName(filePreview.id, filePreview.Name);
}, 2000);
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-24 box-content overflow-hidden mx-auto flex flex-row border-1 shadow"
    >
      <div
        class="flex mx-8 sm:w-20 sm:h-20 rounded-full my-4 m-auto box-border"
      >
        <div><img :src="determineImg(filePreview.Name)" alt="" class="h-16" /></div>
      </div>
      <div class="flex">
        <input
          type="text"
          v-model="filePreview.Name"
          v-on:input="reminder"
          class="appearance-none hover:cursor-pointer w-full truncate"
        />
      </div>
      <div class="flex-grow flex flex-row-reverse py-6 pr-6">
        <div class="hover:cursor-pointer sm:w-12">
          <img
            class="h-12 opacity-60 hover:opacity-100"
            src="/src/assets/img/more.svg"
            alt="更多"
          />
        </div>
        <div class="pr-8">
          <div class="pt-3 opacity-60">{{ filePreview.Time }}</div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-grow">
      <!--文件浏览部分 分不同组件实现不同功能 使用平滑切换-->
      <Transition name="fade" mode="out-in">
        <keep-alive>
          <component
            :is="fileTypeMap[determineVue(filePreview.Name)]"
          ></component>
        </keep-alive>
      </Transition>
    </div>
  </div>
</template>
