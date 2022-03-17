<script setup>

</script>

<template>
  <div>
    <router-link to="/login">home</router-link>
    <router-link to="/information">about</router-link>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style>
.page {
  height: 100vh;
  background-color: hsla(190, 100%, 95%, 0.5);
}
</style>
