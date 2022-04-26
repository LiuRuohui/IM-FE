<script setup>
import mobile from "../../composables/mobile";
import { reactive, ref, onMounted, defineAsyncComponent } from "vue";
import msgChat from "./msgChat.vue";
import { Chum } from "../../composables/api";
//加载异步组件
const addFriends = defineAsyncComponent(() => import("./addFriends.vue"));

let chums = Chum.data();
const notebooks = reactive({
  id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  message: [],
});
const turn = mobile();

const height = ref("0px");
const noteContainer = ref(null);

let time = ref("");
let t = new Date();
time = getTime(t);
let isShow = ref("true");

const typeComponentMap = {
  1: msgChat,
  2: addFriends,
};

onMounted(() => {
  height.value = noteContainer.value.offsetHeight + "px";
});

function getTime(time) {
  let transferTime =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
  console.log(transferTime);
  return transferTime;
}

function addFriend() {
  isShow.value = !isShow.value;
  console.log("跳转到添加好友界面");
}
</script>

<template>
  <div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
    <span
      class="absolute right-3 md:hidden"
      @click="turn.switch"
      :class="turn.value ? 'bottom-12' : 'bottom-3'"
    >
      <img class="h-10 w-10" :src="turn.img" alt="turn" />
    </span>
    <div
      class="w-full lg:w-96 h-full flex flex-col overflow-hidden select-none border-r"
      :class="turn.value ? 'hidden' : ''"
    >
      <div
        class="w-full h-16 flex justify-center items-center my-2 border-b border-gray-50"
      >
        <div class="w-5/6 relative">
          <input
            class="box-border rounded-full h-9 pl-14 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
            type="text"
            placeholder="请输入搜索的内容"
          />
          <img
            class="box-content w-5 h-5 absolute top-2 left-6 border-gray-300 drag"
            src="/src/assets/img/search.svg"
          />
        </div>
      </div>
      <div class="w-5/6 flex mx-auto">
        <div class="opacity-60 mt-1 flex-1">
          列表排序:
          <select class="outline-none border-none font-bold text-center">
            <option value>新添加优先</option>
            <option value>后添加优先</option>
          </select>
        </div>
        <div class="opacity-60 hover:cursor-pointer" @click="addFriend">
          添加好友
          <div class="inline-block item-center">
            <img class="h-9 inline-block" src="/src/assets/img/plus.svg" />
          </div>
        </div>
      </div>
      <div class="w-full h-full flex-grow bg-gray-50" ref="noteContainer">
        <div
          class="w-full h-full overflow-y-auto no-scrollbar"
          :style="{ height: height }"
        >
          <div class="flex flex-col my-4 mx-8">
            <div
              class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow hover:cursor-pointer md:px-2 my-2 bg-white"
              v-for="notes in notebooks.id"
            >
              <div
                class="mx-4 w-10 h-10 md:w-12 md:h-12 rounded-full my-4 m-auto relative box-border group-hover:border-2 border-blue-500"
              >
                <div
                  class="absolute top-0.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-600 border-4 border-slate-100"
                ></div>
                <img
                  class="rounded-full"
                  src="/src/assets/avatar/squidWard.jpg"
                  alt="章鱼哥"
                />
              </div>
              <div
                class="flex flex-col flex-grow h-full justify-center pl-2 pr-3"
              >
                <div class="flex h-1/2 pt-6">
                  <div
                    class="font-bold text-base opacity-70 group-hover:opacity-90 flex items-center"
                  >
                    楚中天
                  </div>
                </div>
                <div
                  class="inline-block truncate opacity-40 text-sm group-hover:opacity-70 h-1/2 pt-1"
                >
                  前端工程师
                </div>
              </div>
              <div class="flex flex-grow flex-row-reverse pr-4">
                <img
                  src="/src/assets/img/delete.svg"
                  alt=""
                  class="w-8 h-8 opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex-grow h-full max-h-screen lg:block"
      :class="turn.value ? '' : 'hidden'"
    >
      <!--切换组件部分更流畅-->
      <Transition name="fade" mode="out-in">
        <keep-alive>
          <component
            @go="addFriend"
            :is="typeComponentMap[isShow ? 1 : 2]"
          ></component>
        </keep-alive>
      </Transition>
    </div>
  </div>
</template>
<style>
.frame {
  height: calc(100% - 5.5rem);
}
</style>
