<script setup>
import { useRoute } from "vue-router";
import router from "../router/router";
const route = useRoute();

function apply() {
  router.push({
    path: "/public/apply",
  });
}
</script>

<template>
  <div class="w-full h-screen flex">
    <div
      class="w-14 md:w-20 h-screen bg-gray-800 flex flex-col items-center select-none"
    >
      <div class="w-full">
        <div
          class="bg-clip-border w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mt-8 mb-8 m-auto relative box-border hover:border-2 border-blue-500 hover:cursor-pointer"
          @click="apply"
        >
          <div
            class="absolute top-1 left-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-600 border-2 border-gray-800"
          ></div>
          <img
            class="drag"
            src="/src/assets/avatar/squidWard.jpg"
            alt="章鱼哥"
          />
        </div>
      </div>
      <div class="flex-grow flex flex-col w-full">
        <div class="m-auto w-full">
          <div>
            <div
              class="w-8 h-8 mt-10 mb-10 ml-auto mr-auto opacity-40 hover:opacity-100"
              :class="route.name == 'msg' ? 'opacity-100' : 'opacity-40'"
            >
              <router-link to="/public/msg">
                <img class="drag" src="/src/assets/img/msg.svg" alt />
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="w-8 h-8 mt-10 mb-10 ml-auto mr-auto opacity-40 hover:opacity-100"
              :class="route.name == 'chum' ? 'opacity-100' : 'opacity-40'"
            >
              <router-link to="/public/chum">
                <img class="drag" src="/src/assets/img/group.svg" alt />
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="w-8 h-8 mt-10 mb-10 ml-auto mr-auto opacity-40 hover:opacity-100"
              :class="route.name == 'file' ? 'opacity-100' : 'opacity-40'"
            >
              <router-link to="/public/file">
                <img class="drag" src="/src/assets/img/file.svg" alt />
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="w-8 h-8 mt-10 mb-10 ml-auto mr-auto opacity-40 hover:opacity-100"
              :class="route.name == 'note' ? 'opacity-100' : 'opacity-40'"
            >
              <router-link to="/public/note">
                <img class="drag" src="/src/assets/img/note.svg" alt />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div
          class="mt-8 mb-8 w-8 h-8 m-auto hover:opacity-100"
          :class="route.name == 'setting' ? 'opacity-100' : 'opacity-40'"
        >
          <router-link to="/public/setting">
            <img class="drag" src="/src/assets/img/setting.svg" alt />
          </router-link>
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
