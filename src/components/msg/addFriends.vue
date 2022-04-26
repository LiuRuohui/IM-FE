<script setup>
import { ref, reactive, onMounted } from "vue";
const friendContainer = ref(null);
const height = ref("0px");
const friends = reactive({
  id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
});

onMounted(() => {
  height.value = friendContainer.value.offsetHeight + "px";
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      class="w-full h-20 flex justify-center items-center my-2 border-b border-gray-50"
    >
      <div class="w-5/6 relative">
        <input
          class="box-border rounded-full h-9 pl-14 pr-4 py-3 w-full outline-none bg-gray-100 text-sm select-none"
          type="text"
          placeholder="请输入想要添加的好友"
        />
        <img
          class="box-content w-5 h-5 absolute top-2 left-6 border-gray-300 drag"
          src="/src/assets/img/search.svg"
        />
      </div>
    </div>
    <div class="w-full flex flex-grow bg-slate-50" ref="friendContainer">
      <div
        class="w-full h-full overflow-y-auto no-scrollbar"
        :style="{ height: height }"
      >
        <div class="flex flex-col my-4 mx-8">
          <div
            class="group flex flex-row items-center w-full h-24 shadow-sm hover:shadow md:px-2 my-2 bg-white"
            v-for="notes in friends.id"
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
              class="flex flex-col h-full justify-center pl-2 pr-3"
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
            <div class="flex flex-grow flex-row-reverse ">
                <img src="/src/assets/img/plus.svg" alt="" class="w-10 h-10 mr-4 hover:cursor-pointer opacity-60">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
