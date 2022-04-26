<script setup>
import { ref, onMounted, defineAsyncComponent, computed } from "vue";
import mobile from "../../composables/mobile";
import Upload from "./components/upload.vue";

import { File } from "../../composables/api";
import { filePreview } from "../../composables/data/file";
import { dateFormat, fileSize, determineImg } from "../../composables/tool";
import { Dialog } from "../../composables/modelDialog";

//加载异步组件
const Preview = defineAsyncComponent(() => import("./components/preview.vue"));

let isShow = ref("true");
let msg = ref("浏览文件");

const turn = mobile();

const typeComponentMap = {
  1: Upload,
  2: Preview,
};

// 初始化定义容器高度
const height = ref("0px");
//获取md容器
const fileContainer = ref(null);
//排序事件触发
const sort = ref("up");
//绑定搜索框值
const search = ref("");

onMounted(() => {
  //初始化挂载保证窗口问题，勿动
  height.value = fileContainer.value.offsetHeight + "px";
});

function upload() {
  if (File.data().length === 0) {
    isShow.value = "false";
    Dialog.errorToast("需要上传文件才可浏览");
  } else {
    isShow.value = !isShow.value;
    if (msg.value == "浏览文件") {
      msg.value = "上传文件";
    } else {
      msg.value = "浏览文件";
    }
  }
}

function deleteFile(fileId) {
  File.del(fileId);
  console.log(msg.value, isShow.value);
  if (File.data().length == 0) {
    isShow.value = false;
    msg.value = "浏览文件";
  }
}

function preview(file) {
  isShow.value = false;
  msg.value = "上传文件";
  filePreview.id = file.ID;
  filePreview.Name = file.Name;
  filePreview.Type = file.Type;
  filePreview.Time = dateFormat(file.CreateTime);
  filePreview.imgSrc = determineImg(file.Type, file.Name);
  File.getContent(file.ID).then((res) => {
    filePreview.Url = res.URL;
  });
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
            v-model="search"
          />
          <img
            class="box-content w-5 h-5 absolute top-2 left-3 pr-1 border-r border-gray-300 drag"
            src="/src/assets/img/search.svg"
            alt
          />
        </div>
      </div>
      <div class="flex-grow flex flex-col">
        <!-- 排序效果 -->
        <div class="w-5/6 flex mx-auto h-10 pb-2">
          <div class="opacity-60 my-1.5 flex-1">
            列表排序:
            <select
              class="outline-none border-none font-bold text-center"
              v-model="sort"
            >
              <option :value="'up'">最新文件优先</option>
              <option :value="'down'">最后文件优先</option>
            </select>
          </div>
          <button class="opacity-60 pr-2 pt-2" @click="upload">
            {{ msg }}
          </button>
        </div>
        <div class="w-full flex-grow bg-gray-50" ref="fileContainer">
          <div
            class="w-full overflow-y-auto no-scrollbar"
            :style="{ height: height }"
          >
            <div class="flex flex-col my-4 mx-8">
              <div
                class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer mb-3 bg-white md:px-2"
                v-for="file in File.data()"
                :key="file.ID"
                @click="preview(file)"
              >
                <div class="h-full flex items-center">
                  <div class="h-16 w-16">
                    <img
                      :src="determineImg(file.Name)"
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
                        <div class="font-bold text-base text-clip">
                          {{ file.Name }}
                        </div>
                      </div>
                      <div
                        class="flex flex-grow flex-row-reverse opacity-30 group-hover:opacity-60"
                      >
                        <img
                          src="/src/assets/img/delete.svg"
                          alt="删除"
                          class="h-8 mt-2"
                          @click.stop="deleteFile(file.ID)"
                        />
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
      <div class="flex flex-col h-full">
        <!--切换组件部分更流畅-->
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

<style></style>
