<script setup>
import { reactive, ref, onMounted } from "vue";
import mobile from "../../composables/mobile";
import Upload from "./components/upload.vue";
import Preview from "./components/preview.vue";

import { File } from "/src/composables/api";
import { dateFormat, fileSize } from "../../composables/tool";

const isShow = ref("true");
const msg = ref("浏览文件");

const turn = mobile();

const typeComponentMap = {
  1: Upload,
  2: Preview,
};

function upload() {
  isShow.value = !isShow.value;
  if (msg.value == "浏览文件") {
    msg.value = "上传文件";
  } else {
    msg.value = "浏览文件";
  }
}
</script>

<template>
  <div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
    <span class="absolute bottom-3 right-3 lg:hidden z-50" @click="turn.switch">
      <img class="h-10 w-10" :src="turn.img" alt="down" />
    </span>
    <div
      class="w-full lg:w-96 h-full flex flex-col overflow-hidden select-none border-r border-gray-200"
      :class="turn.value ? 'hidden' : ''"
    >
      <!-- 搜索框 -->
      <div
        class="w-full h-16 flex justify-center items-center mt-2 mb-2 border-b border-gray-100"
      >
        <div class="w-5/6 relative opacity-70">
          <input
            class="box-border rounded-full h-9 pl-10 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
            type="text"
            placeholder="输入搜索的内容"
          />
          <img
            class="box-content w-5 h-5 absolute top-2 left-3 pr-1 border-r border-gray-300 drag"
            src="/src/assets/img/search.svg"
            alt
          />
        </div>
      </div>
      <div class="flex-grow">
        <!-- 排序效果 -->
        <div class="w-5/6 flex mx-auto h-10 pb-2">
          <div class="opacity-60 my-1.5 flex-1">
            列表排序:
            <select class="outline-none border-none font-bold text-center">
              <option value>最新文件优先</option>
              <option value>最后文件优先</option>
            </select>
          </div>
          <button class="opacity-60 pr-2" @click="upload">
            {{ msg }}
          </button>
        </div>
        <div class="w-full flex-grow bg-gray-50 file-list">
          <div class="w-full overflow-y-auto no-scrollbar h-full">
            <div class="flex flex-col my-4 mx-8">
              <div
                class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer mb-3 bg-white md:px-2"
                v-for="file in File.data()"
                :key="file.ID"
              >
                <div class="h-full flex items-center">
                  <div class="h-16 w-16 bg-blue-300">
                    <img
                      src="/src/assets/img/压缩文件.svg"
                      alt
                      class="py-2 h-full w-auto drag mx-2 inline-block"
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col flex-grow h-full justify-center pl-2 pr-3"
                >
                  <div class="flex h-1/2 pt-2">
                    <div class="w-full flex flex-row">
                      <div
                        class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center"
                      >
                        <div class="font-bold text-base">
                          {{ file.Name }}
                        </div>
                      </div>
                      <div
                        class="flex flex-grow flex-row-reverse opacity-30 group-hover:opacity-60"
                      >
                        <img src="/src/assets/img/更多.svg" alt="更多" />
                      </div>
                    </div>
                  </div>
                  <div class="inline-block truncate opacity-70 text-sm h-1/2">
                    <div class="flex flex-row">
                      <div
                        class="flex text-sm opacity-50 group-hover:opacity-90"
                      >
                        {{ fileSize(file.Size) }}
                      </div>
                      <div
                        class="flex text-sm flex-grow flex-row-reverse opacity-50 group-hover:opacity-90"
                      >
                        {{ dateFormat(file.CreateTime) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex-grow h-full max-h-screen lg:block select-none"
      :class="turn.value ? '' : 'hidden'"
    >
      <!-- 这部分需要进行更改 -->
      <div class="flex flex-col h-full">
        <!--upload组件部分-->
        <Transition name="fade" mode="out-in">
          <keep-alive>
            <component
              @go="upload"
              :is="typeComponentMap[isShow ? 1 : 2]"
            ></component>
          </keep-alive>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-list {
  height: calc(100% - 6.5rem);
}
</style>
