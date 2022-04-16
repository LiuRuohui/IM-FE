<script setup>
import Office from './office.vue';
import Audio from './audio.vue';
import Default from './default.vue';
import Picture from './picture.vue';
import Video from './video.vue';
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-24 box-content overflow-hidden mx-auto flex flex-row border-1 shadow"
    >
      <div
        class="flex mx-8 sm:w-20 sm:h-20 rounded-full my-4 m-auto relative box-border"
      >
        <div><img src="/src/assets/img/pdf.svg" alt="" class="h-16" /></div>
      </div>
      <div class="flex justify-center">
        <input
          type="text"
          placeholder="SourceCode.zip"
          class="appearance-none outline-none hover:cursor-pointer"
        />
      </div>
      <div class="flex-grow flex flex-row-reverse py-6 pr-6">
        <div class="hover:cursor-pointer sm:w-12">
          <img
            class="h-12 opacity-60 hover:opacity-100"
            src="/src/assets/img/更多.svg"
            alt="更多"
          />
        </div>
        <div class="pr-8">
          <div class="pt-3 opacity-60">2022-06-12</div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-grow">
      <!--文件浏览部分 分不同组件实现不同功能-->
      <Office></Office>
      <!--<Audio></Audio>
      <Default></Default>
      <Picture></Picture>
      <Video></Video> -->
    </div>
  </div>
</template>
