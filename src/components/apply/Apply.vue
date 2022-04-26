<script setup>
import { reactive, ref, onMounted } from "vue";

const height = ref("0px");
const applyContainer = ref(null);

const applys = reactive({
  id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  message: [],
});

onMounted(() => {
  height.value = applyContainer.value.offsetHeight + "px";
});
</script>

<template>
  <div class="flex-grow h-full flex flex-wrap overflow-y-auto relative">
    <div
      class="w-full md:w-96 h-full flex flex-col overflow-hidden select-none border-r"
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
        <div class="opacity-60 mb-1.5 flex-1 text-sm">
          分类:
          <select class="outline-none border-none font-bold text-center">
            <option value>好友申请</option>
            <option value>群组申请</option>
          </select>
        </div>
      </div>
      <div class="w-full h-full flex-grow bg-gray-50" ref="applyContainer">
        <div
          class="w-full h-full overflow-y-auto no-scrollbar"
          :style="{ height: height }"
        >
          <div class="flex flex-col my-4 mx-8">
            <div
              class="group flex flex-col w-full h-28 shadow-sm hover:shadow hover:cursor-pointer md:px-2 my-2 bg-white"
              v-for="apply in applys.id"
            >
              <div class="flex h-16">
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
                <div class="flex flex-col flex-grow h-16 pl-2 pr-3">
                  <div class="flex h-full flex-row">
                    <div
                      class="font-extrabold text-base opacity-70 group-hover:opacity-90 flex items-center"
                    >
                      楚中天
                    </div>
                    <div
                      class="font-light text-sm opacity-70 group-hover:opacity-90 flex items-center flex-grow flex-row-reverse"
                    >
                      3小时之前
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-grow m-2">
                <div class="flex flex-row w-full">
                  <div
                    class="flex flex-grow flex-wrap text-sm font-medium truncate py-1.5 pl-3"
                  >
                    Lorem ipsum dolor sit amet...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
