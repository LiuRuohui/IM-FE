<script setup>
import { onMounted } from 'vue';
import { session } from './composables/session';
import { info } from "/src/composables/data";
onMounted(() => {

  info.getInfo();
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  -webkit-tap-highlight-color: transparent;
}
.drag {
  -webkit-user-drag: none;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
